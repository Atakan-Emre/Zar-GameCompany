# Sunucu, API ve Veritabanı Altyapısı

Bu doküman, Macera Haritası AR mobil uygulamasının sunucu altyapısı, API mimarisi ve veritabanı yapısını tanımlar.

## Genel Altyapı Mimarisi

Macera Haritası AR uygulaması, istemci tarafında yoğun işlem yapan "client-heavy" bir mimari kullanır. Ancak içerik güncellemeleri, kullanıcı ilerleme senkronizasyonu ve çok oyunculu özellikler için bulut tabanlı bir altyapı da gereklidir.

```
┌─────────────────┐     ┌─────────────────────────────────┐
│                 │     │                                 │
│   Mobil Cihaz   │ ◄─► │      Content Delivery Network   │
│  (iOS/Android)  │     │            (CDN)                │
│                 │     │                                 │
└────────┬────────┘     └─────────────────┬───────────────┘
         │                                │
         │                                │
┌────────▼────────┐     ┌─────────────────▼───────────────┐
│                 │     │                                 │
│   API Gateway   │ ◄─► │      Backend Servisleri         │
│                 │     │                                 │
└────────┬────────┘     └─────────────────┬───────────────┘
         │                                │
         │                                │
┌────────▼────────┐     ┌─────────────────▼───────────────┐
│                 │     │                                 │
│  Yetkilendirme  │     │        Veritabanları           │
│    Servisi      │     │                                 │
│                 │     │                                 │
└─────────────────┘     └─────────────────────────────────┘
```

## Sunucu Altyapısı

### Bulut Sağlayıcısı

Uygulama, ölçeklenebilirlik ve global erişim için **AWS (Amazon Web Services)** bulut altyapısını kullanır.

### Temel Bileşenler

1. **EC2 İnstansları**
   - Uygulama Sunucuları: t3.medium (2 vCPU, 4GB RAM)
   - Veritabanı Sunucuları: r5.large (2 vCPU, 16GB RAM)
   - Yönetim Sunucusu: t3.small (2 vCPU, 2GB RAM)

2. **Containerization**
   - Docker konteynerları içinde çalışan mikroservisler
   - Amazon ECS (Elastic Container Service) ile yönetim
   - Container Orchestration için Kubernetes

3. **Load Balancing**
   - AWS Elastic Load Balancer
   - Trafik dağıtımı ve otomatik ölçeklendirme
   - Bölgesel yük dengeleme

4. **CDN (Content Delivery Network)**
   - Amazon CloudFront
   - Statik içerikler (3D modeller, görseller, ses dosyaları)
   - Global dağıtım noktaları ile düşük gecikme süresi

### Sunucu Bölgeleri

Düşük gecikme süresi sağlamak için çoklu bölge dağıtımı:

| Bölge | AWS Lokasyonu | Öncelikli Ülkeler |
|-------|---------------|-------------------|
| Avrupa | eu-central-1 (Frankfurt) | Türkiye, Almanya, Fransa, İtalya |
| Kuzey Amerika | us-east-1 (Virginia) | ABD, Kanada |
| Asya | ap-northeast-1 (Tokyo) | Japonya, Güney Kore |
| Avustralya | ap-southeast-2 (Sydney) | Avustralya, Yeni Zelanda |

## API Mimarisi

Macera Haritası AR uygulaması, RESTful ve WebSocket API'leri birlikte kullanır.

### API Gateway

- **Amazon API Gateway** kullanımı
- HTTPS protokolü üzerinden güvenli iletişim
- JWT (JSON Web Token) tabanlı yetkilendirme
- Rate limiting ve throttling politikaları

### RESTful API Endpoints

#### Kullanıcı Yönetimi

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/auth/register` | POST | Yeni kullanıcı kaydı |
| `/auth/login` | POST | Kullanıcı girişi |
| `/auth/refresh` | POST | Access token yenileme |
| `/users/profile` | GET | Kullanıcı profili bilgileri |
| `/users/profile` | PUT | Kullanıcı profili güncelleme |
| `/users/avatar` | PUT | Avatar özelleştirme |

#### İçerik Yönetimi

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/content/countries` | GET | Ülke listesi ve temel bilgiler |
| `/content/countries/{id}` | GET | Belirli ülke detayları |
| `/content/models/{id}` | GET | 3D model meta verileri |
| `/content/updates` | GET | İçerik güncellemeleri kontrolü |
| `/content/languages/{lang}` | GET | Dil paketi bilgileri |

#### İlerleme ve Senkronizasyon

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/progress` | GET | Kullanıcı ilerleme bilgileri |
| `/progress` | POST | İlerleme bilgisi güncelleme |
| `/progress/sync` | POST | Çoklu ilerleme senkronizasyonu |
| `/badges` | GET | Kazanılan rozetler listesi |
| `/achievements` | GET | Başarılar listesi |

#### Ebeveyn Portal API

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/parent/children` | GET | Ebeveyn hesabına bağlı çocuk hesapları |
| `/parent/reports/{childId}` | GET | Çocuk ilerleme raporu |
| `/parent/settings/{childId}` | PUT | Ebeveyn kontrolü ayarları |
| `/parent/timeLimits/{childId}` | PUT | Oyun süresi limitleri |

### WebSocket API

Gerçek zamanlı özellikler için WebSocket bağlantıları:

- `wss://api.maceraharitasi.com/realtime`

#### WebSocket Olayları

| Olay | Yön | Açıklama |
|------|-----|----------|
| `connect` | İstemci → Sunucu | WebSocket bağlantısı kurma |
| `friendActivity` | Sunucu → İstemci | Arkadaş aktivite bildirimleri |
| `joinSession` | İstemci → Sunucu | Çok oyunculu oturuma katılma |
| `leaveSession` | İstemci → Sunucu | Oturumdan ayrılma |
| `userLocation` | İstemci → Sunucu | Sanal dünya konumu güncelleme |
| `chatMessage` | İki yönlü | Oturum içi mesajlaşma |

### API Versiyonlama

API versiyonlama stratejisi:

- URL tabanlı versiyonlama: `/v1/users/profile`
- Her majör sürüm en az 12 ay desteklenir
- Geriye dönük uyumluluk için her yeni versiyonda geçiş dönemi

## Veritabanı Mimarisi

Macera Haritası uygulaması, çeşitli veri türleri için farklı veritabanı teknolojileri kullanır.

### Ana Veritabanları

#### 1. İlişkisel Veritabanı (PostgreSQL)

Tutarlılık gerektiren yapılandırılmış veriler için:

- Kullanıcı profilleri
- Hesap bilgileri
- Ödeme kayıtları
- İlişkisel veri gerektiren içerikler

**Örnek Şema**:

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    account_status VARCHAR(20) DEFAULT 'active',
    parent_id UUID REFERENCES users(user_id)
);

CREATE TABLE user_profiles (
    profile_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    display_name VARCHAR(50),
    avatar_type VARCHAR(50),
    xp_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    last_synced TIMESTAMP
);
```

#### 2. NoSQL Belge Veritabanı (MongoDB)

Esnek şemalı ve hızlı okuma/yazma gerektiren veriler için:

- Kullanıcı ilerleme kayıtları
- Oyun içi davranış verileri
- Kullanıcı tercih ve ayarları
- Dinamik içerik

**Örnek Belge**:

```json
{
  "_id": "user_progress_5f8a726b1c9d440000d1b3e5",
  "userId": "5f8a726b1c9d440000d1b3e5",
  "gameProgress": {
    "visitedCountries": ["turkey", "france", "italy"],
    "completedActivities": [
      {"id": "fr_lang_basics", "completedAt": "2023-03-15T14:22:31Z"},
      {"id": "tr_cultural_quiz", "completedAt": "2023-03-16T09:11:05Z"}
    ],
    "collectibles": ["eiffel_tower", "colosseum", "blue_mosque"],
    "currentLevel": 8,
    "xpPoints": 2450
  },
  "learnedContent": {
    "languages": {
      "french": ["bonjour", "merci", "au revoir"],
      "italian": ["ciao", "grazie", "arrivederci"]
    }
  },
  "lastSyncedAt": "2023-03-17T18:45:22Z"
}
```

#### 3. Cache ve Session Store (Redis)

Yüksek performanslı geçici veri depolama:

- Oturum bilgileri
- API önbelleği
- Gerçek zamanlı veri
- Sıralama tabloları

**Örnek Veri Yapısı**:

```
# Oturum bilgisi
SET session:4a3b5c6d {
  "userId": "5f8a726b1c9d440000d1b3e5",
  "role": "child",
  "permissions": ["basic_access", "multi_player"],
  "expiry": 1679084722
}

# Küresel sıralama tablosu (sıralı set)
ZADD leaderboard:global 2450 "user:5f8a726b1c9d440000d1b3e5"
ZADD leaderboard:global 3560 "user:6e2c837a2d9e550000f2c4f6"
```

#### 4. Arama Motoru (Elasticsearch)

Arama ve filtreleme işlemleri için:

- İçerik arama
- Tam metin araması
- Coğrafi konum tabanlı aramalar

### Veritabanı Kopyalama ve Yedekleme

- **Çoğaltma**: Primary-Secondary çoğaltma ile yüksek erişilebilirlik
- **Yedekleme**: Günlük otomatik yedeklemeler
- **Felaket Kurtarma**: Çapraz bölge yedekler ve otomatik kurtarma prosedürleri

## Güvenlik Altyapısı

### Kimlik Doğrulama ve Yetkilendirme

- **Auth Service**: Özel kimlik doğrulama servisi
- **JWT**: Stateless yetkilendirme için JSON Web Token
- **OAuth 2.0**: Google, Apple ve Facebook ile sosyal giriş
- **COPPA Uyumlu**: 13 yaş altı kullanıcılar için ebeveyn onayı

### Veri Güvenliği

- **Şifreleme**:
  - Transport Layer Security (TLS 1.3)
  - Veritabanında hassas verilerin AES-256 ile şifrelenmesi
  - End-to-end şifreleme ile kullanıcı iletişimi

- **API Güvenliği**:
  - Rate limiting (IP ve kullanıcı başına)
  - DDoS koruması (AWS Shield)
  - Input validasyonu ve sanitizasyonu
  - OWASP Top 10 güvenlik açıklarına karşı koruma

### Uyumluluk

- **GDPR**: Avrupa Birliği Genel Veri Koruma Yönetmeliği uyumu
- **KVKK**: Türkiye Kişisel Verilerin Korunması Kanunu uyumu
- **COPPA**: Çocukların Çevrimiçi Gizlilik Korunması Yasası uyumu

## Analitik ve İzleme

### Telemetri

- **Application Insights**: Uygulama performansı izleme
- **Custom Events**: Kullanıcı davranışı ve etkileşim takibi
- **Error Tracking**: Hata ve çökme raporlama

### İş Zekası

- **Veri Ambarı**: Amazon Redshift kullanımı
- **ETL İşlemi**: Günlük veri aktarım ve dönüşüm işlemleri
- **Raporlama**: Power BI ile yönetim panoları ve raporlar

## İçerik Dağıtım Sistemi

### Dinamik İçerik Yönetimi

- **CMS**: Headless CMS ile içerik yönetimi
- **Versiyonlama**: İçerik versiyonlama ve rollback yeteneği
- **Ülke Paketleri**: Modüler ülke içerik paketleri
- **Dil Paketleri**: Dinamik dil paketi indirme

### İçerik Dağıtım Stratejisi

- **Temel Paket**: Uygulama indirme ile gelen minimum içerik (~100MB)
- **Talep Üzerine İndirme**: Kullanıcı tercihleri ve aktivite durumuna göre içerik yükleme
- **Ön Belleğe Alma**: Kullanım örüntülerine göre akıllı içerik ön belleğe alma
- **Delta Güncellemeler**: Yalnızca değişen içerik parçalarını güncelleme

## Ölçeklenebilirlik ve Yüksek Erişilebilirlik

### Otomatik Ölçeklendirme

- **Horizontal Scaling**: Trafik artışına göre sunucu sayısını otomatik artırma
- **Load Balancing**: Çoklu sunucu arasında yük dengeleme
- **Auto Scaling Groups**: AWS Auto Scaling ile otomatik kaynak yönetimi

### Erişilebilirlik Hedefleri

- **SLA**: %99.9 erişilebilirlik (ayda maksimum 43 dakika kesinti)
- **Çoklu AZ**: Birden fazla AWS Availability Zone kullanımı
- **Felaket Kurtarma**: RPO (Recovery Point Objective) < 1 saat, RTO (Recovery Time Objective) < 4 saat

## DevOps ve CI/CD

### Geliştirme İş Akışı

- **Git Flow**: Feature branching ve release management stratejisi
- **Pull Request Süreci**: Code review ve otomatik test süreçleri
- **Sürüm Yönetimi**: Semantic versioning (MAJOR.MINOR.PATCH)

### CI/CD Pipeline

- **GitHub Actions**: Sürekli entegrasyon için
- **AWS CodePipeline**: Sürekli dağıtım için
- **Otomatik Test**: Birim testleri, entegrasyon testleri, UI testleri
- **Canary Deployments**: Kademeli sürüm yayınlama

---

Bu altyapı dokümanı, Macera Haritası AR uygulamasının sunucu, API ve veritabanı bileşenlerini tanımlar. Uygulama geliştirme süreci ilerledikçe güncellemeler yapılabilir. 