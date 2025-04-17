# Kullanıcı Hikayesi Örnekleri

Bu doküman, Dünya Kaşifi AR mobil uygulaması için kullanıcı hikayelerini içerir. Bu hikayeler, farklı kullanıcı personaları için uygulamanın temel kullanım senaryolarını tanımlar.

## Kullanıcı Personaları

### 1. Meraklı Kaşif (8-10 yaş)
**İsim:** Ahmet  
**Yaş:** 9  
**İlgi Alanları:** Farklı ülkeler, haritalar, yeni diller öğrenmek  
**Teknoloji Becerisi:** Orta (tablet ve akıllı telefonu temel düzeyde kullanabiliyor)  
**Beklentileri:** Eğlenceli bir şekilde dünya hakkında yeni bilgiler öğrenmek

### 2. Genç Bilim İnsanı (10-12 yaş)
**İsim:** Zeynep  
**Yaş:** 11  
**İlgi Alanları:** Bilim, matematik, yapılar ve mimari  
**Teknoloji Becerisi:** Yüksek (teknolojiye meraklı ve hızlı öğreniyor)  
**Beklentileri:** Öğrendiği bilgileri derinleştirmek ve STEAM konularında kendini geliştirmek

### 3. İlgili Ebeveyn
**İsim:** Ayşe  
**Yaş:** 38  
**İlgi Alanları:** Çocuğunun eğitimi, güvenli dijital içerik  
**Teknoloji Becerisi:** Orta (günlük ihtiyaçlar için teknoloji kullanımı)  
**Beklentileri:** Çocuğunun güvenli bir ortamda eğitici içeriklerle vakit geçirmesi ve gelişimini takip edebilmek

### 4. Eğitimci
**İsim:** Mehmet  
**Yaş:** 32  
**İlgi Alanları:** Yenilikçi eğitim metodları, teknoloji destekli öğrenme  
**Teknoloji Becerisi:** Yüksek (eğitim teknolojilerine hakim)  
**Beklentileri:** Sınıf ortamında kullanılabilecek, müfredata uygun eğitici içerikler

## Kullanıcı Hikayeleri

### Meraklı Kaşif (Ahmet) İçin Kullanıcı Hikayeleri

#### Hikaye 1: Dünya Haritasını Keşfetme
**Hikaye:** Bir kaşif olarak, AR dünya haritasını masanın üzerinde görüntüleyebilmek istiyorum ki farklı ülkeleri ve kıtaları görebileyim.  

**Kabul Kriterleri:**
- Düz bir yüzey üzerinde AR harita görüntülenebilmeli
- Haritayı döndürmek, yakınlaştırmak ve uzaklaştırmak mümkün olmalı
- Ülke sınırları ve kıtalar net bir şekilde görülebilmeli
- Harita üzerinde etkileşimli noktalar belirgin şekilde işaretlenmeli

**Teknik Notlar:**
- AR Foundation'da düzlem algılama kullanılacak
- Harita modeli düşük poligon sayısına optimize edilecek
- Etkileşimli noktalar için parıltı efekti eklenecek

#### Hikaye 2: Ülke Ziyareti ve Bilgi Toplama
**Hikaye:** Bir kaşif olarak, haritadaki bir ülkeyi seçip o ülke hakkında bilgi edinebilmek istiyorum ki yeni yerler hakkında öğrenebileyim.

**Kabul Kriterleri:**
- Haritada bir ülkeye dokunulduğunda bilgi kartı açılmalı
- Ülkenin bayrağı, başkenti, nüfusu gibi temel bilgiler gösterilmeli
- "Ziyaret Et" düğmesi görünür olmalı
- Ziyaret edilen ülkeler kaşif pasaportuna eklenmeli

**Teknik Notlar:**
- Ülke verileri JSON formatında saklanacak
- Ülke seçiminde haptic feedback kullanılacak
- Ziyaret edilen ülkeler PlayerPrefs'te saklanacak

#### Hikaye 3: Yeni Dil Öğrenme
**Hikaye:** Bir kaşif olarak, ziyaret ettiğim ülkenin dilinden temel kelimeler öğrenmek istiyorum ki farklı dillere aşina olabileyim.

**Kabul Kriterleri:**
- Her ülke için en az 10 temel kelime/ifade sunulmalı
- Kelimelerin yazılı, sesli ve görsel karşılıkları olmalı
- Kelime kartları AR ortamında 3D olarak görüntülenmeli
- Öğrenilen kelimeleri test eden mini oyunlar olmalı

**Teknik Notlar:**
- Ses dosyaları düşük boyutta optimize edilecek
- AR kartlar için Image Tracking kullanılacak
- Dil verileri için ayrı localization sistemi kurulacak

#### Hikaye 4: Rozet Kazanma
**Hikaye:** Bir kaşif olarak, keşiflerim ve öğrendiklerim için rozetler kazanmak istiyorum ki ilerlememi görebileyim ve motive olabileyim.

**Kabul Kriterleri:**
- Farklı başarılar için rozet sistemi olmalı (5 ülke ziyareti, 20 kelime öğrenme vb.)
- Yeni rozet kazanıldığında kutlama animasyonu gösterilmeli
- Tüm rozetler bir koleksiyon ekranında görüntülenebilmeli
- Rozetlerin kilidi açıldıkça yeni özellikler sunulmalı

**Teknik Notlar:**
- Achievement sistemi GameCenter/Google Play ile entegre edilecek
- Rozet görsellerinde vector grafikleri kullanılacak
- Rozet ilerlemesi realtime olarak güncellenecek

### Genç Bilim İnsanı (Zeynep) İçin Kullanıcı Hikayeleri

#### Hikaye 5: 3D Kültürel Yapıları İnceleme
**Hikaye:** Bir bilim insanı olarak, ünlü mimari yapıların 3D modellerini AR ile incelemek istiyorum ki nasıl inşa edildiklerini anlayabileyim.

**Kabul Kriterleri:**
- Her ülkenin en az bir ünlü yapısının detaylı 3D modeli olmalı
- Yapılar etrafında 360 derece dönülebilmeli ve yakınlaştırılabilmeli
- Yapının bölümleri hakkında etkileşimli bilgi noktaları olmalı
- Yapının tarihçesi ve mimari özellikleri hakkında sesli anlatım olmalı

**Teknik Notlar:**
- 3D modellerde LOD (Level of Detail) sistemi kullanılacak
- Büyük modeller kısım kısım yüklenecek
- İşaretçi noktaları için raycast kullanılacak

#### Hikaye 6: AR Matematik Oyunu
**Hikaye:** Bir bilim insanı olarak, AR ortamında matematik problemlerini çözmek istiyorum ki eğlenceli bir şekilde matematik becerilerimi geliştirebileyim.

**Kabul Kriterleri:**
- Gökyüzünde beliren matematik problemleri olmalı
- Zorluk seviyesi yaş grubuna uygun olmalı (toplama, çıkarma, basit çarpma)
- Doğru cevabı seçmek için AR nesnelerine dokunulabilmeli
- Skor ve süre sistemi olmalı

**Teknik Notlar:**
- Matematik problemleri dinamik olarak oluşturulacak
- Hareketli nesneleri takip için AR Raycast kullanılacak
- Zorluk seviyesi kullanıcı performansına göre ayarlanacak

#### Hikaye 7: Dünya Haritası Üzerinde Bilimsel Keşifler
**Hikaye:** Bir bilim insanı olarak, dünya haritası üzerinde bilimsel keşiflerin ve icatların yerlerini görmek istiyorum ki bilim tarihini öğrenebileyim.

**Kabul Kriterleri:**
- Harita üzerinde önemli bilimsel keşif/icat noktaları işaretlenmeli
- Her keşif noktasına tıklanınca bilimsel bilgi ve görsel sunulmalı
- Bilimsel keşifler kronolojik sırayla da görüntülenebilmeli
- Her keşif için mini bir etkileşimli deney/simülasyon olmalı

**Teknik Notlar:**
- Kronolojik görünüm için zaman çizelgesi UI bileşeni oluşturulacak
- Bilimsel deney simülasyonları için basit fizik motoru kullanılacak
- Keşif noktaları kategorilere ayrılacak (fizik, kimya, biyoloji vb.)

#### Hikaye 8: Bilimsel Başarı Sistemi
**Hikaye:** Bir bilim insanı olarak, çözdüğüm problemler ve öğrendiğim bilimsel bilgiler için özel başarılar kazanmak istiyorum ki bilimsel becerilerimi takip edebileyim.

**Kabul Kriterleri:**
- Farklı bilim dallarında başarı kategorileri olmalı
- Başarılar için seviye sistemi olmalı (bronz, gümüş, altın)
- Bilimsel başarı tablosu görsel olarak çekici olmalı
- Arkadaşlarla başarı karşılaştırması yapılabilmeli

**Teknik Notlar:**
- Başarı sistemi için özel bir veritabanı sınıfı oluşturulacak
- Bulut tabanlı liderlik tablosu implementasyonu yapılacak
- Arkadaş sistemi için GameCenter/Google Play entegrasyonu yapılacak

### İlgili Ebeveyn (Ayşe) İçin Kullanıcı Hikayeleri

#### Hikaye 9: Ebeveyn Kontrol Paneli
**Hikaye:** Bir ebeveyn olarak, çocuğumun uygulama kullanımını ve içerik erişimini kontrol edebilmek istiyorum ki güvenli bir deneyim sağlayabileyim.

**Kabul Kriterleri:**
- Ebeveyn hesabı ve çocuk hesabı ayrımı olmalı
- Günlük kullanım süresi sınırlaması ayarlanabilmeli
- İçerik filtresi ve zorluk seviyesi ayarlanabilmeli
- PIN korumalı ebeveyn kontrol paneli olmalı

**Teknik Notlar:**
- Şifreli ebeveyn profili ayarları oluşturulacak
- RemoteConfig kullanılarak uzaktan ayar değişikliği yapılabilecek
- Zaman kontrolü için background service implementasyonu yapılacak

#### Hikaye 10: İlerleme Raporları
**Hikaye:** Bir ebeveyn olarak, çocuğumun uygulamadaki ilerlemesini ve öğrenme durumunu görebilmek istiyorum ki eğitim sürecini takip edebileyim.

**Kabul Kriterleri:**
- Haftalık ilerleme raporu oluşturulmalı
- Öğrenilen kelimeler, ziyaret edilen ülkeler ve çözülen problemler listelenebilmeli
- Öğrenme analitikleri ve grafikler sunulmalı
- Rapor e-posta ile de alınabilmeli

**Teknik Notlar:**
- Analytics sistemi için özel event tracking implementasyonu yapılacak
- PDF rapor oluşturma özelliği eklenecek
- E-posta gönderimi için SMTP servisi entegre edilecek

#### Hikaye 11: Göz Sağlığı ve Kullanım Önerileri
**Hikaye:** Bir ebeveyn olarak, çocuğumun göz sağlığını korumak için uygulama ayarlarını düzenleyebilmek istiyorum ki sağlıklı bir kullanım sağlanabilsin.

**Kabul Kriterleri:**
- Mola hatırlatıcılarının sıklığı ayarlanabilmeli
- Gece modu ve mavi ışık filtresi seçenekleri olmalı
- Maksimum günlük AR kullanım süresi belirlenebilmeli
- Önerilen kullanım pozisyonu hatırlatmaları açılıp kapatılabilmeli

**Teknik Notlar:**
- Cihazın gece modu API'larına entegrasyon yapılacak
- Kullanım süresi izleme için session tracking eklenecek
- Pozisyon kontrolü için cihaz sensörleri kullanılacak

#### Hikaye 12: Birlikte Öğrenme Modu
**Hikaye:** Bir ebeveyn olarak, çocuğumla birlikte uygulamayı kullanabilmek istiyorum ki öğrenme sürecine dahil olabileyim ve rehberlik edebileyim.

**Kabul Kriterleri:**
- Ebeveyn-çocuk birlikte oynama modu olmalı
- Ekran paylaşımı veya çift kullanıcı modu desteklenmeli
- Ebeveynin soruları yanıtlamasına ve açıklamalar eklemesine olanak tanınmalı
- Birlikte geçirilen süre ve aktiviteler kaydedilmeli

**Teknik Notlar:**
- İkinci kullanıcı girişi için UI düzenlemesi yapılacak
- Ebeveyn yönlendirmeleri için overlay sistem tasarlanacak
- Aktivite kaydı için özel bir log sistemi geliştirilecek

### Eğitimci (Mehmet) İçin Kullanıcı Hikayeleri

#### Hikaye 13: Sınıf Grubu Oluşturma
**Hikaye:** Bir eğitimci olarak, sınıfımdaki öğrenciler için grup oluşturmak istiyorum ki toplu olarak ilerlemeyi takip edebileyim ve toplu aktiviteler düzenleyebileyim.

**Kabul Kriterleri:**
- Öğrenci grupları oluşturulabilmeli ve yönetilebilmeli
- Tüm sınıfın ilerleme durumu tek bir panelden görülebilmeli
- Grup için ortak görevler ve hedefler belirlenebilmeli
- Sınıf başarı tablosu oluşturulabilmeli

**Teknik Notlar:**
- Bulut tabanlı grup yönetimi sistemi kurulacak
- Rol bazlı yetkilendirme sistemi implementasyonu yapılacak
- Bulk işlemler için batch processing eklenecek

#### Hikaye 14: Müfredat Entegrasyonu
**Hikaye:** Bir eğitimci olarak, uygulamayı müfredata entegre edebilmek istiyorum ki derslerimle uyumlu içerikler sunabileyim.

**Kabul Kriterleri:**
- Farklı yaş grupları için müfredat filtresi olmalı
- Sosyal bilgiler, coğrafya, dil ve matematik konularıyla eşleşen içerik etiketleri olmalı
- Özel ders planları oluşturulabilmeli
- Müfredat ile uyumlu öğrenme hedefleri belirlenebilmeli

**Teknik Notlar:**
- İçerik tagging sistemi geliştirilecek
- Dinamik müfredat filtresi için arama algoritması optimize edilecek
- Öğrenme hedefleri için özel bir veritabanı şeması oluşturulacak

#### Hikaye 15: Ödev ve Aktivite Ataması
**Hikaye:** Bir eğitimci olarak, öğrencilerime ödev ve aktiviteler atayabilmek istiyorum ki sınıf dışında da öğrenme sürecini destekleyebileyim.

**Kabul Kriterleri:**
- Belirli ülkeleri ziyaret etme, kelimeler öğrenme gibi ödevler atanabilmeli
- Ödev teslim tarihi ve hedefleri belirlenebilmeli
- Öğrencilerin ödev tamamlama durumu izlenebilmeli
- Tamamlanan ödevler için otomatik değerlendirme yapılabilmeli

**Teknik Notlar:**
- Görev atama sistemi için push notification altyapısı kurulacak
- Teslim kontrolü için zaman damgası sistemi entegre edilecek
- Otomatik değerlendirme için skorlama algoritması geliştirilecek

#### Hikaye 16: Öğrenme Analitikleri Raporları
**Hikaye:** Bir eğitimci olarak, öğrencilerimin öğrenme verilerini detaylı raporlar halinde görebilmek istiyorum ki öğretim stratejilerimi buna göre planlayabileyim.

**Kabul Kriterleri:**
- Öğrenci bazında ve sınıf bazında analitik raporlar oluşturulabilmeli
- Öğrenme süreleri, başarı oranları ve zorluk alanları görülebilmeli
- Veriler görsel grafiklerle sunulmalı
- Raporlar PDF olarak dışa aktarılabilmeli

**Teknik Notlar:**
- İstatistiksel analiz için özel bir kütüphane entegre edilecek
- Veri görselleştirme için chart API kullanılacak
- Rapor oluşturma işlemleri asenkron olarak arkaplanda yapılacak

## Ortak Kullanıcı Hikayeleri

#### Hikaye 17: Uygulama Tanıtımı ve Onboarding
**Hikaye:** Bir kullanıcı olarak, uygulamayı ilk açtığımda temel özellikleri ve nasıl kullanacağımı öğrenmek istiyorum ki hızlıca ve verimli bir şekilde kullanmaya başlayabileyim.

**Kabul Kriterleri:**
- Adım adım interaktif bir tanıtım turu olmalı
- Her kullanıcı tipine (çocuk, ebeveyn, eğitimci) özel açıklamalar sunulmalı
- AR deneyiminin güvenli kullanımı için yönlendirmeler olmalı
- Tanıtım istenmediğinde atlanabilmeli ama daha sonra tekrar erişilebilmeli

**Teknik Notlar:**
- Onboarding için step-by-step UI sistemi geliştirilecek
- Kullanıcı tercihleri local storage'da saklanacak
- AR güvenlik tavsiyeleri için özel pop-up sistemi tasarlanacak

#### Hikaye 18: Çevrimdışı Kullanım
**Hikaye:** Bir kullanıcı olarak, internet bağlantım olmadığında da uygulamanın temel özelliklerini kullanabilmek istiyorum ki her yerde öğrenmeye devam edebileyim.

**Kabul Kriterleri:**
- Daha önce indirilen ülke içerikleri çevrimdışı kullanılabilmeli
- AR harita temel özellikleriyle çalışabilmeli
- Öğrenme aktiviteleri ve ilerleme kaydı yapılabilmeli
- İnternet bağlantısı sağlandığında veriler otomatik senkronize edilmeli

**Teknik Notlar:**
- Çevrimdışı veri saklama için SQLite implementasyonu yapılacak
- Asset bundle'lar önceden indirilebilir olacak
- Senkronizasyon için conflict resolution stratejisi belirlenecek

#### Hikaye 19: Karanlık Mod Desteği
**Hikaye:** Bir kullanıcı olarak, uygulamayı karanlık modda kullanabilmek istiyorum ki göz yorgunluğunu azaltabileyim ve gece kullanımda daha rahat edebileyim.

**Kabul Kriterleri:**
- Uygulama genelinde karanlık mod arayüzü desteklenmeli
- Kullanıcı ayarlarından tema seçimi yapılabilmeli (açık, koyu, sistem varsayılanı)
- Karanlık modda tüm metinlerin okunabilirliği korunmalı
- Tema geçişi sırasında kullanıcı deneyimi kesintisiz olmalı

**Teknik Notlar:**
- Tema yönetimi için context/tabanlı tema sağlayıcısı kullanılacak
- UI bileşenleri temaya göre otomatik güncellenecek
- Gece modu destekli görseller optimize edilecek

---

Bu kullanıcı hikayeleri, Dünya Kaşifi AR uygulamasının geliştirme sürecinde yol gösterici olarak kullanılacaktır. Geliştirme ilerledikçe ve kullanıcı geri bildirimleri alındıkça bu hikayeler güncellenebilir ve genişletilebilir.