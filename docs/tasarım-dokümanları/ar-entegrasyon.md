# AR Entegrasyon Notları

Bu doküman, Dünya Kaşifi mobil uygulamasında kullanılacak Artırılmış Gerçeklik (AR) teknolojilerinin teknik entegrasyonuna dair detayları içerir.

## AR Teknoloji Seçimi

Dünya Kaşifi, çapraz platform desteği sunmak için aşağıdaki AR teknolojilerini kullanacaktır:

### Temel AR Framework'leri

- **Unity AR Foundation**: Temel AR altyapısı olarak, ARCore ve ARKit gibi platformları tek bir arayüz altında birleştiren Unity AR Foundation kullanılacaktır.
  
- **Platform Özgü SDK'lar**:
  - **Google ARCore** (Android cihazlar için)
  - **Apple ARKit** (iOS cihazlar için)

### Desteklenen AR Özellikleri

- **Düzlem Algılama (Plane Detection)**: Düz yüzeylerin tespiti ve bunlar üzerine içerik yerleştirme
- **Işık Tahmini (Light Estimation)**: Gerçek ortam ışığının algılanması ve sanal nesnelerin buna göre aydınlatılması
- **Görüntü Takibi (Image Tracking)**: Belirli görsellerin (ör. harita, bayrak) tanınması ve bunların üzerine AR içeriği yerleştirilmesi
- **Yüz Takibi (Face Tracking)**: Avatar özelleştirme için AR filtrelerinin kullanılması
- **Konum Tabanlı AR (Location-based AR)**: GPS verilerini kullanarak gerçek dünya konumlarına bağlı içerik sunma

## AR İçerik Geliştirme

### 3D Model Gereksinimleri

- **Dosya Formatları**: FBX veya glTF 2.0
- **Poligon Limitleri**: 
  - Yapılar: 10.000-50.000 poligon
  - Karakterler: 5.000-15.000 poligon
  - Ekipman ve eşyalar: 1.000-5.000 poligon
- **Texture Çözünürlükleri**: 
  - Diffuse/Albedo: 2048x2048 (maksimum)
  - Normal Maps: 1024x1024
  - Specular/Roughness: 1024x1024

### Animasyon Standartları

- **Animasyon Formatı**: Unity Mechanim uyumlu
- **İskelet Yapısı**: Humanoid karakter animasyonları için standart iskelet
- **FPS**: 30 FPS hedef kare hızı (performans optimizasyonu için)

### Shader ve Materyal Özellikleri

- **Performans Optimizasyonu**: Mobil cihazlarda optimize performans için Standard (Mobile) shader kullanımı
- **Özel Shaderlar**: 
  - "Dünya Haritası Shader": Keşfedilen bölgeleri vurgulama 
  - "Holografik Ekipman Shader": AR ekipmanları için özel görsel efektler

## AR Etkileşim Tasarımı

### Dünya Haritası Etkileşimi

1. **AR Harita Açma**: 
   - Düz bir yüzey tespiti (masa, zemin vb.)
   - Harita boyutu kullanıcı tarafından ayarlanabilir (pinch-to-zoom)
   - Harita üzerinde 3D yapılar ve coğrafi özellikler görünür

2. **Ülke Seçimi**:
   - Harita üzerinde ülke sınırları belirgin
   - Ülke üzerine dokunulduğunda bilgi balonu ve seçenekler açılır
   - Seçilen ülkenin 3D temsili yakınlaştırılır

3. **AR Yapı İnceleme**:
   - İncelenecek yapı/anıt haritadan seçilir
   - Yapı 3D model olarak AR ortamında belirir
   - Yapı etrafında dönme, yakınlaştırma ve uzaklaştırma hareketleri

### Dil Öğrenme Aktiviteleri

1. **AR Kelime Kartları**:
   - Gerçek ortamda beliren sanal kelime kartları
   - Her kart üzerinde kelime, telaffuz ve görsel
   - Kartlar arasında geçiş için el hareketleri

2. **AR Diyalog Simülasyonu**:
   - Sanal karakterlerle diyalog kurma
   - Konuşma balonlarında çeviriler
   - Mikrofon kullanarak telaffuz pratiği

### Matematik ve Bilim Aktiviteleri

1. **Gökyüzü Matematik Oyunu**:
   - Gökyüzünde beliren matematik problemleri
   - Problemi çözmek için doğru sayıya dokunma
   - Artan zorluk seviyesi ve puan sistemi

2. **AR Bilimsel Modeller**:
   - Güneş sistemi, atomlar, hayvan anatomisi gibi bilimsel modeller
   - Modellerin parçalarını ayırma ve inceleme imkanı
   - Sesli açıklamalar ve etkileşimli etiketler

## Teknik Optimizasyon

### Performans Hedefleri

- **FPS**: Stabil 30 FPS
- **Bellek Kullanımı**: 500MB RAM altında
- **Isınma Yönetimi**: Uzun süreli AR kullanımında aşırı ısınmayı önlemek için optimizasyon

### Cihaz Özelliklerine Göre Ölçeklendirme

- **Yüksek Performanslı Cihazlar**: Tam çözünürlükte textureler, kompleks gölgelendirme
- **Orta Segment Cihazlar**: Düşürülmüş texture çözünürlükleri, basitleştirilmiş shaderlar
- **Düşük Performanslı Cihazlar**: Minimum görsel efektler, simplify edilmiş 3D modeller

### Pil Optimizasyonu

- **AR Kullanımı Sırasında**: Her 30 dakikada otomatik mola öneri sistemi
- **Arka Plan İşlemleri**: AR kullanımda olmadığında minimum arka plan işlemi
- **Güç Tasarruf Modu**: Düşük pil durumunda AR özelliklerini sınırlandırma seçeneği

## Güvenlik ve Gizlilik

### Kamera İzinleri

- Uygulamanın ilk açılışında net açıklamalı kamera izin talebi
- Kamera verisinin yerel cihazda işlenmesi, sunucuya gönderilmemesi
- Ebeveyn onayı seçeneği

### Konum Verileri

- Hassas GPS verisi yerine genel konum bilgisi kullanımı
- Konum bilgisinin kaydedilmemesi veya paylaşılmaması
- Anonim kullanım istatistikleri için opt-in seçeneği

### Çevresel Güvenlik

- AR kullanımı öncesi güvenlik talimatları
- Yürürken AR kullanımını engelleyen uyarı sistemi
- AR kullanımı için minimum boş alan gerekliliği kontrolü

## AR Özelliklerinin Geliştirilmesi için Yol Haritası

### Faz 1: Temel AR Deneyimi (İlk Sürüm)
- Düzlem tespiti ve dünya haritası yerleştirme
- 10 ana ülke ve 5 ünlü yapının 3D modeli
- Basit AR dil kartları ve matematik oyunu

### Faz 2: Genişletilmiş İçerik (İkinci Sürüm)
- 50+ ülke ve 30+ ünlü yapı
- Geliştirilmiş dil öğrenme modülü
- AR karakterlerle etkileşim

### Faz 3: Sosyal ve İleri AR Özellikleri (Üçüncü Sürüm)
- Çok oyunculu AR deneyimleri
- Çevre tarama ve gerçek zamanlı 3D haritalama
- Kullanıcı tarafından oluşturulan AR içeriği paylaşımı

## AR Test Süreci

### Test Cihazları
- iPhone 8 ve üzeri (iOS)
- Samsung Galaxy S9 ve üzeri (Android)
- iPad 6. nesil ve üzeri (iOS Tablet)
- Samsung Tab S6 ve üzeri (Android Tablet)

### Test Senaryoları
1. Farklı ışık koşullarında düzlem tespiti
2. Çeşitli yüzeylerde AR içeriği yerleştirme
3. Uzun süreli AR kullanımında performans ve pil ömrü
4. Farklı hareket senaryolarında takip stabilitesi

### Kullanıcı Testi
- 6-12 yaş çocuklar ile kullanılabilirlik testleri
- Ebeveyn gözetiminde AR güvenlik testleri
- Öğrenme etkinliği ölçümleri

---

Bu AR entegrasyon kılavuzu, Dünya Kaşifi uygulamasının geliştirme sürecinde teknik ekibe yol gösterici olarak hazırlanmıştır. Teknolojik gelişmeler ve uygulama gereksinimleri doğrultusunda güncellenecektir. 