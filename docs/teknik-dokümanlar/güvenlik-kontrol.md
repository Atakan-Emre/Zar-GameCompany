# Ebeveyn Kontrolü ve Güvenlik Özellikleri

Bu doküman, Macera Haritası AR mobil uygulamasında kullanılan ebeveyn kontrolü mekanizmalarını, göz sağlığı koruma özelliklerini ve doğru kullanım pozisyonu önerileri sistemlerini detaylandırır.

## 1. Ebeveyn Kontrolü Sistemi

Macera Haritası AR uygulaması, çocuk kullanıcılar için güvenli bir deneyim sağlamak ve ebeveynlerin çocuklarının uygulama kullanımını kontrol edebilmelerini sağlamak amacıyla kapsamlı bir ebeveyn kontrol sistemine sahiptir.

### Hesap Yönetimi

#### Ebeveyn ve Çocuk Hesapları

- **Ebeveyn Hesabı**: Ana hesap, tüm ayarları ve izinleri yönetir
- **Çocuk Hesabı**: Ebeveyn hesabına bağlı, kısıtlı yetkilere sahip alt hesap
- **Doğrulama Süreci**: Ebeveyn hesabı oluşturma sırasında e-posta veya SMS doğrulaması
- **COPPA Uyumluluğu**: 13 yaş altı kullanıcılar için ebeveyn onayı zorunluluğu

#### Çoklu Kullanıcı Desteği

- Bir ebeveyn hesabına bağlı birden fazla çocuk profili oluşturabilme
- Her çocuk için ayrı ilerleme, istatistik ve özelleştirilmiş kısıtlamalar
- Profiller arası kolay geçiş ve yönetim

### Zaman Kontrolü

#### Oturum Süresi Limitleri

| Özellik | Açıklama |
|---------|----------|
| Günlük Süre Limiti | Ebeveyn tarafından belirlenebilen günlük toplam kullanım süresi (30 dk - 3 saat arası) |
| Oturum Başına Limit | Tek seferde kesintisiz kullanılabilecek maksimum süre (10 dk - 60 dk arası) |
| Otomatik Mola | Belirlenen süre sonunda zorunlu mola uygulaması (5-15 dk) |
| Esnek Zaman Dilimleri | Hafta içi/hafta sonu için farklı zaman limitleri belirleme |

#### Zaman Çizelgesi

- **Kullanım Saatleri**: Belirlenen saat aralıklarında (örn. 10:00-12:00 ve 15:00-17:00) uygulama kullanımını sınırlama
- **Yatma Zamanı Modu**: Belirlenen saatten sonra (örn. 20:00) uygulamaya erişimi engelleme
- **Özel Gün İstisnaları**: Tatil, doğum günü gibi özel günlerde farklı zaman ayarları tanımlayabilme

### İçerik Kontrolü

#### İçerik Filtreleme

- **Yaş Gruplarına Göre Filtreleme**: 6-8, 9-10, 11-12 yaş grupları için uygun içerik filtreleri
- **Zorluk Seviyesi Ayarı**: Eğitim içeriğinin zorluk seviyesini çocuğun yaşına ve kapasitesine göre ayarlama
- **Dil Kontrolü**: Uygunsuz dil kullanımını önleme ve filtreleme

#### Sosyal Etkileşim Kontrolü

- **Arkadaş Listesi Onayı**: Ebeveyn onayı olmadan arkadaş ekleyememe
- **Mesajlaşma Kısıtlamaları**: Önceden tanımlanmış mesajlar dışında iletişimi sınırlama veya tamamen kapatma
- **Çevrimiçi Görünürlük**: Çocuğun çevrimiçi durumunun kimlere görüneceğini belirleme

### İzleme ve Raporlama

#### Aktivite Raporları

- **Günlük/Haftalık Kullanım Özeti**: Toplam kullanım süresi, ziyaret edilen ülkeler, tamamlanan aktiviteler
- **Öğrenme İlerlemesi**: Öğrenilen kelimeler, tamamlanan eğitim modülleri, başarı oranları
- **Davranış Analizi**: Çocuğun ilgi alanları, öğrenme stili ve zorlandığı konular hakkında içgörüler

#### Bildirim Sistemi

- **Anlık Bildirimler**: Çocuğun ebeveyn tarafından belirlenen sınırları aşması durumunda bildirim
- **İlerleme Bildirimleri**: Önemli başarılar ve ilerleme durumları hakkında bilgilendirme
- **Günlük Özet**: Günün sonunda kullanım özeti ve önemli aktiviteler

### Ebeveyn Kontrol Paneli

#### Web ve Mobil Erişim

- Ebeveyn kontrol ayarlarına hem web tarayıcı hem de mobil uygulama üzerinden erişim
- Uzaktan ayarlama ve izleme imkanı
- Çoklu cihaz desteği ve senkronizasyon

#### Kullanım Kolaylığı

- **Basit Arayüz**: Teknik bilgi gerektirmeyen kullanıcı dostu kontrol paneli
- **Hızlı Eylemler**: Sık kullanılan ayarlar için tek dokunuşla erişim
- **Yardım ve Rehberlik**: Ebeveyn kontrolü kullanımı hakkında kapsamlı rehberlik içeriği

## 2. Göz Sağlığı Koruma Özellikleri

AR teknolojisi kullanımı sırasında göz sağlığını korumak için Macera Haritası uygulaması çeşitli önlemler içerir.

### Mola Hatırlatıcıları

#### 20-20-20 Kuralı

- Her 20 dakikada bir, 20 saniye boyunca, 20 feet (yaklaşık 6 metre) uzağa bakma hatırlatması
- Çocuk dostu animasyonlar ve sesli yönlendirmelerle mola vermeye teşvik
- Mola sırasında göz egzersizleri önerileri

#### Zorunlu Molalar

- Aralıksız 40 dakikalık kullanım sonrası 10 dakikalık zorunlu mola
- Mola sırasında fiziksel aktivite önerileri
- Mola atlama imkanının ebeveyn kontrolüne bağlı olması

### Ekran ve Görüntü Optimizasyonu

#### Mavi Işık Filtresi

- Gece saatlerinde otomatik olarak devreye giren mavi ışık filtresi
- Gün içerisinde ebeveyn tarafından ayarlanabilir mavi ışık koruma seviyesi
- Cihazın sistem ayarlarıyla entegrasyon (mümkün olan durumlarda)

#### Parlaklık ve Kontrast Ayarları

- Ortam ışığına göre otomatik parlaklık ayarı
- Göz yorgunluğunu azaltan kontrast ayarları
- AR görüntüleme için optimize edilmiş renk şemaları

#### Titreşim ve Hareket Optimizasyonu

- Ekran titreşimini minimuma indiren yüksek yenileme hızı
- Hızlı hareket eden nesnelerin göz yorgunluğunu azaltacak şekilde optimizasyonu
- Fotosensitif epilepsi riski için uyarı ve koruma mekanizmaları

### Göz Takibi ve Mesafe Kontrolü

#### Mesafe Uyarıları

- Cihazın göze çok yakın tutulması durumunda sesli ve görsel uyarılar
- İdeal cihaz-göz mesafesi: 30-40 cm arası
- Mesafe uyarılarının göz önünde olmayan, nazik hatırlatmalar şeklinde tasarlanması

#### Duruş Algılama

- Cihazın konumuna göre duruş bozukluğu algılama
- Uzun süre aynı pozisyonda kalma durumunda hareket etme hatırlatması
- Uygun olmayan bakış açılarını düzeltme önerileri

### Özelleştirilmiş Erişilebilirlik

#### Görme Zorluğu Desteği

- Metin boyutu ve kontrastı ayarlama seçenekleri
- Renk körlüğü için alternatif renk şemaları
- Sesli anlatım desteği ve ekran okuyucu uyumluluğu

#### Kullanıcı Tercihleri

- Göz yorgunluğu seviyesine göre AR efektlerinin yoğunluğunu ayarlama
- Animasyon hızı ve geçiş efektleri kişiselleştirme
- Görsel karmaşıklığı azaltma seçenekleri

## 3. Doğru Kullanım Pozisyonu ve Çevresel Güvenlik

AR teknolojilerinin fiziksel konfor ve güvenlik içinde kullanılabilmesi için Macera Haritası uygulaması, kullanım pozisyonu ve çevresel güvenlikle ilgili çeşitli özellikler içerir.

### Fiziksel Ortam Değerlendirmesi

#### Başlangıç Güvenlik Kontrolü

- Uygulama başlangıcında çevresel güvenlik kontrolü
- Minimum gerekli boş alan önerileri (2m x 2m ideal)
- Potansiyel engeller ve tehlikeler hakkında uyarılar

#### AR Kullanım Alanı Analizi

- Kamera ile çevrenin taranması ve uygunluk değerlendirmesi
- Işık koşullarının AR deneyimi için yeterli olup olmadığının kontrolü
- Alan sınırlarını tanımlama ve görsel işaretlemeler

### Duruş ve Pozisyon Rehberliği

#### Doğru Duruş Önerileri

- **Oturarak Kullanım**: Sırt desteği olan sandalyede, dizler 90 derece açıda
- **Ayakta Kullanım**: Dengeli pozisyon, omuzlar gevşek, boyun eğilmemiş
- **Koltukta Kullanım**: Kolların desteklenmesi, ekranın göz hizasında tutulması

#### Animasyonlu Rehberlik

- Doğru pozisyonu gösteren animasyonlu karakterler
- Yanlış duruşun potansiyel sağlık etkilerine dair çocuk dostu bilgilendirme
- Düzeltici hareketler için adım adım görselli rehberlik

#### Dinamik Pozisyon İzleme

- Cihazın gyroscope ve accelerometer sensörleri ile kullanıcı pozisyonunu tespit
- Uzun süre aynı pozisyonda kalma durumunda hareket etme hatırlatması
- Baş/boyun açısının sağlıksız pozisyonlarda kalması durumunda uyarı

### Hareket ve Mobilite

#### Hareket Alanı Sınırları

- AR etkileşimleri için güvenli hareket alanı tanımlama
- Sınıra yaklaşıldığında görsel ve işitsel uyarılar
- Sınır dışına çıkma durumunda AR deneyimini duraklatma

#### Engel Algılama

- Gerçek zamanlı engel tespiti (mümkün olan cihazlarda)
- Kullanıcının çevresindeki hareketli nesnelere karşı uyarılar
- Güvenli oyun alanını korumak için yönlendirmeler

#### Hareket Kontrolü

- Ani hareketleri gerektirmeyen etkileşim tasarımı
- Dengeli ve kontrollü fiziksel aktiviteler
- Yaş grubuna uygun motor beceri gereksinimleri

### Çevresel Faktörler

#### Işık Koşulları

- İdeal ışık koşulları hakkında bilgilendirme (doğal, orta parlaklıkta ışık)
- Çok parlak veya çok karanlık ortamlarda performans optimizasyonu
- Güneş ışığı altında veya düşük ışık koşullarında artan riskler hakkında uyarılar

#### Ortam Sesi

- Uygulama başlangıcında ses seviyesi kontrolü ve öneriler
- Çevresel seslerin duyulabilmesi için maksimum ses seviyesi sınırlaması
- Kulaklık kullanımı için özel güvenlik önerileri ve zaman sınırları

### Özel Durumlar ve Uyarılar

#### Hareket Hastalığı Önlemleri

- Hareket hastalığı belirtileri görüldüğünde oyunu duraklatma önerisi
- Yavaş geçişler ve minimalist AR efektleri ile hareket hastalığı riskini azaltma
- Hassasiyet düzeyini belirlemek için başlangıç testi ve kişiselleştirilmiş ayarlar

#### Fiziksel Rahatsızlık Bildirimi

- Kullanıcıdan fiziksel rahatsızlık geri bildirimi alabilme (baş ağrısı, göz yorgunluğu vb.)
- Bildirilen rahatsızlıklara göre otomatik ayarlama önerileri
- Ciddi rahatsızlıklar için tıbbi yardım önerileri ve uygulama kullanımını durdurma

#### Düşme ve Çarpma Önlemleri

- Denge kaybı, sendeleme durumlarında algılama (cihaz verilerine göre)
- Hızlı hareket gerektiren içeriği sınırlama veya uyarılarla destekleme
- Fiziksel güvenliği artıran öneriler (oturarak oynama, açık alanda oynama vb.)

## Kullanıcı Eğitimi ve Bilinçlendirme

### Eğitici İçerikler

#### Başlangıç Eğitimi

- AR teknolojilerinin güvenli kullanımı hakkında yaşa uygun eğitim
- Animasyonlu rehberlik ile doğru kullanım alışkanlıkları oluşturma
- Eğitim modüllerini tamamlayanlar için ödül ve rozetler

#### Düzenli Hatırlatmalar

- Oyun sırasında düzenli olarak doğru kullanım ipuçları gösterme
- Her oturum başlangıcında kısa güvenlik hatırlatmaları
- Riskleri ve önlemleri içeren eğlenceli infografikler

### Ebeveyn Bilgilendirmesi

#### Kapsamlı Rehberlik

- Ebeveynler için AR teknolojisinin çocuklar üzerindeki etkileri hakkında bilimsel bilgiler
- Yaş gruplarına göre önerilen kullanım süreleri ve kısıtlamalar
- Göz sağlığı ve fiziksel sağlık konusunda dikkat edilmesi gerekenler

#### AR Kullanımı İzleme

- Çocuğun AR kullanım alışkanlıkları hakkında detaylı raporlar
- Potansiyel aşırı kullanım belirtileri olduğunda uyarılar
- Sağlıklı dijital alışkanlıklar geliştirme önerileri

## Uygulama İçi Güvenlik Protokolleri

### Acil Durum Kontrolü

#### Hızlı Çıkış Mekanizması

- Herhangi bir anda uygulamadan hızlıca çıkabilme seçeneği
- Belirli bir hareket veya komut ile AR modundan anında çıkma
- Beklenmedik durumlarda otomatik duraklatma

#### Otomatik Güvenlik Kontrolleri

- Uygulama kullanımı sırasında düzenli aralıklarla güvenlik kontrolleri
- Cihaz ısınması, pil seviyesi, alan değişikliği gibi durumlarda uyarılar
- Güvenli olmayan durumlarda özellik kısıtlaması

### Veri Toplama ve Gizlilik

- Pozisyon ve duruş verilerinin cihazda işlenmesi, sunucuya gönderilmemesi
- Sağlık ve güvenlik amacıyla toplanan verilerin anonim hale getirilmesi
- Ebeveyn onayı olmadan hiçbir verinin toplanmaması

---

Bu doküman, Macera Haritası AR uygulamasının ebeveyn kontrolü, göz sağlığı koruma ve doğru kullanım pozisyonu önerme özelliklerini detaylandırır. Uygulama geliştikçe ve yeni araştırmalar ışığında bu özellikler güncellenecektir. 