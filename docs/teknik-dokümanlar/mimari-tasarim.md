# Uygulama Mimarisi ve Modül Şeması

Bu doküman, Dünya Kaşifi AR mobil uygulamasının mimari tasarımını ve modül yapısını detaylandırır.

## Genel Mimari Bakış

Dünya Kaşifi, Unity oyun motoru üzerine inşa edilmiş, AR Foundation framework'ünü kullanarak iOS ve Android platformlarında çalışabilen cross-platform bir uygulamadır. Uygulama mimarisi, modüler ve katmanlı bir yapıda tasarlanmıştır.

### Mimari Katmanlar

```
┌─────────────────────────────────────────────────────┐
│                 Kullanıcı Arayüzü                   │
│   (UI Prefablar, Canvas'lar, Etkileşim Elemanları)  │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                Oyun ve Öğrenme Modülleri            │
│   (Dil Modülü, Kültür Modülü, AR Etkileşimleri)     │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│             Kaynak ve Veri Yönetim Katmanı          │
│    (İçerik Yükleme, Kullanıcı Verisi, İlerleme)     │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                   AR Altyapısı                      │
│      (AR Foundation, ARCore, ARKit, Vuforia)        │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│               Platform Bağımlı Katman               │
│          (iOS ve Android Spesifik Kodlar)           │
└─────────────────────────────────────────────────────┘
```

## Ana Modüller

### 1. AR Altyapı Modülü

AR Altyapı Modülü, uygulamanın artırılmış gerçeklik özelliklerini yönetir ve platform bağımsız bir AR deneyimi sunar.

#### Alt Bileşenler

- **AR Foundation Manager**: Unity AR Foundation'ın genel yapılandırması ve yönetimi
- **Plane Detection Controller**: Düz yüzeylerin tespiti ve AR içeriğin yerleştirilmesi
- **Image Tracking Manager**: QR kod veya belirli görsellerin takibi
- **AR Session Manager**: AR oturumunu başlatma, durdurma ve yönetme
- **Light Estimation**: Gerçek dünya ışığına göre AR içeriğin aydınlatılması

#### Sorumluluklar

- Farklı AR platformlarını (ARCore/ARKit) birleştirme
- Düz yüzeyleri algılama ve klasifiye etme
- AR kamera kontrolü ve takibi
- Gerçek dünya ölçeklendirme ve yerleştirme

### 2. Dünya Haritası Modülü

Dünya Haritası Modülü, uygulamanın ana etkileşim noktası olan AR dünya haritasını yönetir.

#### Alt Bileşenler

- **Map Generator**: 3D dünya haritasının oluşturulması ve yönetimi
- **Country Selector**: Ülke seçimi ve detay gösterimi
- **Location Manager**: GPS verileri ve sanal konum takibi
- **Map Interaction Controller**: Harita üzerindeki dokunma, yakınlaştırma ve döndürme etkileşimleri

#### Sorumluluklar

- Dünya haritasının AR ortamında görselleştirilmesi
- Ülke sınırları ve seçilebilir bölgelerin tanımlanması
- Coğrafi bilgilerin görselleştirilmesi
- Harita üzerinde etkileşimli noktaların yönetimi

### 3. Dil Öğrenme Modülü

Dil Öğrenme Modülü, farklı dillerdeki temel ifadeleri öğretmek için gereken AR deneyimlerini yönetir.

#### Alt Bileşenler

- **Language Database**: Desteklenen diller ve ifadeler veritabanı
- **Pronunciation Analyzer**: Telaffuz doğruluğunu değerlendiren ses tanıma sistemi
- **AR Language Cards**: Artırılmış gerçeklik dil kartları yöneticisi
- **Practice Session Manager**: Dil pratiği oturumlarını yöneten bileşen

#### Sorumluluklar

- Dil verilerinin yüklenmesi ve yönetimi
- Ses tanıma ve telaffuz değerlendirmesi
- AR dil kartlarının fiziksel ortamda yerleştirilmesi
- Öğrenme ilerleme takibi ve adaptif zorluk ayarı

### 4. Kültürel Keşif Modülü

Kültürel Keşif Modülü, farklı ülke ve kültürlere ait bilgileri ve 3D modelleri yönetir.

#### Alt Bileşenler

- **Culture Database**: Ülkelere ait kültürel bilgiler veritabanı
- **3D Model Manager**: Kültürel yapı ve nesnelerin 3D modellerini yöneten bileşen
- **Cultural Quiz Generator**: Kültürel bilgileri test eden quiz oluşturucu
- **Story Narrator**: Kültürel hikayeleri anlatan bileşen

#### Sorumluluklar

- Kültürel içeriklerin yüklenmesi ve görselleştirilmesi
- 3D kültürel modellerin AR ortamında gösterimi
- Kültürel bilgilerin interaktif sunumu
- Ülkelere özel mini-oyunların yönetimi

### 5. Kullanıcı İlerleme Modülü

Kullanıcı İlerleme Modülü, oyuncunun oyun içi ilerlemesini, rozetlerini ve başarılarını takip eder.

#### Alt Bileşenler

- **Progress Tracker**: Kullanıcının oyun içi ilerlemesini takip eden bileşen
- **Badge System**: Rozet ve ödül sistemini yöneten bileşen
- **Passport Manager**: Kaşif Pasaportunu ve ülke damgalarını yöneten bileşen
- **Achievement Manager**: Başarı sistemi yöneticisi

#### Sorumluluklar

- Kullanıcı ilerlemesinin kayıt ve takibi
- Rozet ve ödüllerin verilmesi ve gösterimi
- Pasaport damgaları ve koleksiyon elemanlarının yönetimi
- Bulut senkronizasyonu ve veri yedekleme

### 6. Ebeveyn Kontrol Modülü

Ebeveyn Kontrol Modülü, ebeveynlerin çocuklarının uygulama kullanımını ve eğitim ilerlemesini takip etmelerini sağlar.

#### Alt Bileşenler

- **Parental Controls**: Uygulama kullanım sınırlamaları ve filtreleri
- **Progress Reports**: Ebeveynler için ilerleme raporları oluşturucu
- **Usage Analytics**: Kullanım istatistikleri analizi
- **Content Filter**: İçerik filtreleme ve yaş uygunluğu kontrolü

#### Sorumluluklar

- Oyun süresi sınırlaması ve kontrolü
- Öğrenme performansı raporlaması
- Güvenli içerik filtreleme
- Ebeveyn onaylı etkileşimler

### 7. Oyun Motoru Entegrasyon Modülü

Oyun Motoru Entegrasyon Modülü, Unity oyun motoru ile diğer modüller arasındaki iletişimi yönetir.

#### Alt Bileşenler

- **Scene Manager**: Oyun sahnelerini yükleme ve yönetme
- **Resource Loader**: Oyun içi kaynakların asenkron yüklenmesi
- **Performance Optimizer**: Performans optimizasyonu yöneticisi
- **Input System Manager**: Platform bağımsız girdi sistemi yönetimi

#### Sorumluluklar

- Sahne yükleme ve geçişleri
- Asenkron kaynak yönetimi
- Performans optimizasyonu
- Çapraz platform girdi yönetimi

### 8. UI/UX Modülü

UI/UX Modülü, kullanıcı arayüzü elemanlarını ve kullanıcı deneyimini yönetir.

#### Alt Bileşenler

- **UI Manager**: Kullanıcı arayüzü elemanlarını yöneten bileşen
- **Menu System**: Ana menü ve alt menüleri yöneten sistem
- **Notification System**: Bildirim ve uyarıları yöneten sistem
- **Onboarding Manager**: İlk kullanım deneyimini yöneten bileşen

#### Sorumluluklar

- Kullanıcı arayüzü elemanlarının gösterimi ve yönetimi
- Menü ve panellerin kullanıcı etkileşimleri
- Bildirimlerin gösterimi ve zamanlama yönetimi
- Kullanıcı yönlendirme ve eğitim akışları

## Veri Akışı ve İletişim

Modüller arası iletişim, event-driven mimari kullanılarak gerçekleştirilir. Bu, modüllerin birbirine sıkı bağımlılıklarını azaltır ve sistemin esnekliğini artırır.

```
┌──────────────┐    Event     ┌──────────────┐
│   Modül A    ├─────Bus──────►   Modül B    │
└──────┬───────┘              └──────┬───────┘
       │                             │
       │          ┌──────────────┐   │
       └──────────►  Event Bus   ◄───┘
                  └──────┬───────┘
                         │
                  ┌──────▼───────┐
                  │   Modül C    │
                  └──────────────┘
```

### Temel Event Türleri

- **AREvents**: AR altyapısıyla ilgili olaylar (düzlem tespiti, görüntü algılama vb.)
- **GameplayEvents**: Oyun akışıyla ilgili olaylar (seviye tamamlama, rozet kazanma vb.)
- **UIEvents**: Kullanıcı arayüzü etkileşimleriyle ilgili olaylar
- **DataEvents**: Veri yükleme, kaydetme ve senkronizasyon olayları

## Veri Modelleri

### Kullanıcı Veri Modeli

```json
{
  "userId": "unique_id",
  "displayName": "KaşifAhmet",
  "avatar": {
    "characterType": "explorer_1",
    "customizations": {
      "hairColor": "brown",
      "skinTone": "medium",
      "outfit": "explorer_outfit_3"
    }
  },
  "progress": {
    "level": 5,
    "xp": 1250,
    "visitedCountries": ["turkey", "italy", "france"],
    "learnedWords": {
      "french": ["bonjour", "merci", "au revoir"],
      "italian": ["ciao", "grazie"]
    }
  },
  "equipment": {
    "active": ["magic_compass", "explorer_hat"],
    "inventory": ["binoculars", "map_2", "translator_device"]
  },
  "badges": ["world_traveler_bronze", "language_starter", "culture_explorer"]
}
```

### Ülke Veri Modeli

```json
{
  "countryId": "turkey",
  "name": {
    "en": "Turkey",
    "tr": "Türkiye",
    "native": "Türkiye"
  },
  "continent": "europe_asia",
  "capital": "ankara",
  "languages": ["turkish"],
  "culturalPoints": [
    {
      "id": "hagia_sophia",
      "name": "Hagia Sophia",
      "type": "historical_building",
      "modelPath": "models/countries/turkey/hagia_sophia",
      "description": "A historical monument in Istanbul..."
    }
  ],
  "miniGames": [
    {
      "id": "turkish_dishes",
      "type": "matching_game",
      "difficulty": 2
    }
  ],
  "basicPhrases": [
    {
      "original": "Merhaba",
      "translation": "Hello",
      "audioPath": "audio/tr/merhaba.mp3"
    }
  ]
}
```

## Performans Optimizasyonu

### Kaynak Yönetimi

- **İçerik Havuzlama (Pooling)**: Sık kullanılan nesnelerin yeniden kullanımı
- **Asenkron Yükleme**: Büyük kaynakların arka planda asenkron yüklenmesi
- **LOD Sistemleri**: 3D modellerin mesafeye göre detay seviyesi değişimi

### AR Optimizasyonu

- **Point Cloud Filtreleme**: AR nokta bulutlarının optimizasyonu
- **Ölçeklenebilir AR Deneyimleri**: Cihaz kapasitesine göre AR detay seviyesi ayarı
- **İşlem Paylaşımı**: AR işlemlerinin çerçeveler arasında dağıtılması

## Güvenlik ve Veri Gizliliği

- **Yerel Veri Depolama**: Hassas kullanıcı verilerinin cihazda güvenli depolanması
- **Anonim Analitik**: Kişisel tanımlayıcılar olmadan kullanım verilerinin toplanması
- **Ebeveyn Onayı**: COPPA uyumlu ebeveyn onay süreci
- **Veri Minimizasyonu**: Sadece gerekli minimum verinin toplanması ve depolanması

## Genişletilebilirlik ve Gelecek Geliştirmeler

- **Eklenti Mimarisi**: Yeni ülke paketleri ve içeriklerin modüler eklenmesi
- **Özelleştirilebilir Tema Sistemi**: Arayüzün özelleştirilmesine izin veren tema sistemi
- **API Entegrasyonu**: Üçüncü parti eğitim içerik sağlayıcılarla entegrasyon
- **Çevrimdışı Mod**: İnternet bağlantısı olmadan çalışabilme yeteneği

---

Bu doküman, Dünya Kaşifi AR uygulamasının mimari tasarımını ve modül yapısını tanımlar. Uygulama geliştirme sürecinde değişiklikler olabilir ve mimari, yeni gereksinimlere göre güncellenebilir. 