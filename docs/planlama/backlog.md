# Ürün ve Sprint Backlog

Bu belge, Macera Haritası AR mobil uygulaması için ürün backlog'u ve sprint planlamasını içerir.

## Ürün Backlog

Aşağıdaki ürün backlog öğeleri, önem sırasına göre listelenmiştir.

### Temel Özellikler (Minimum Viable Product - MVP)

| ID | Özellik | Açıklama | Öncelik | Durum | Tahmini Efor |
|----|---------|----------|---------|-------|--------------|
| F001 | AR Dünya Haritası | Düz yüzeylerde görüntülenebilen interaktif 3D dünya haritası | Çok Yüksek | Planlandı | 8 SP |
| F002 | Kaşif Karakteri Oluşturma | Kullanıcının kendi avatar karakterini oluşturabilmesi | Yüksek | Planlandı | 5 SP |
| F003 | Ülke Keşif Sistemi | En az 10 temel ülke için keşif mekanizması | Çok Yüksek | Planlandı | 13 SP |
| F004 | Temel Dil Öğrenme | Her ülke için temel kelimelerin öğretilmesi | Yüksek | Planlandı | 8 SP |
| F005 | Rozet ve İlerleme Sistemi | Kullanıcı ilerlemesini takip eden rozet sistemi | Orta | Planlandı | 5 SP |
| F006 | Basit AR Etkileşimler | Harita ve objelerle etkileşim mekanizmaları | Yüksek | Planlandı | 8 SP |
| F007 | Kaşif Pasaportu | Ziyaret edilen ülkelerin kaydedildiği dijital pasaport | Orta | Planlandı | 5 SP |
| F008 | Ebeveyn Kontrolü - Temel | Oturum süresi sınırlaması ve içerik kontrolü | Yüksek | Planlandı | 8 SP |
| F009 | Göz Sağlığı Koruması | Mola hatırlatıcıları ve göz sağlığı önerileri | Yüksek | Planlandı | 5 SP |
| F010 | Öğrenme Quiz'leri | Öğrenilen bilgileri pekiştirmek için mini testler | Orta | Planlandı | 5 SP |

### Genişletilmiş Özellikler (İkinci Sürüm)

| ID | Özellik | Açıklama | Öncelik | Durum | Tahmini Efor |
|----|---------|----------|---------|-------|--------------|
| F011 | 3D Kültürel Yapılar | Ünlü yapıların AR modelleri (30+ yapı) | Orta | Planlandı | 13 SP |
| F012 | Ekipman Sistemi | Kaşif ekipmanları (pusula, dürbün vb.) | Düşük | Planlandı | 8 SP |
| F013 | Gelişmiş Dil Modülü | Telaffuz kontrolü ve diyalog pratiği | Orta | Planlandı | 13 SP |
| F014 | Kültürel Mini Oyunlar | Her ülkeye özgü mini oyunlar | Orta | Planlandı | 13 SP |
| F015 | Çok Oyunculu Modu | Arkadaşlarla birlikte keşif yapabilme | Düşük | Planlandı | 21 SP |
| F016 | Matematik AR Oyunları | STEM eğitimi için matematik aktiviteleri | Düşük | Planlandı | 8 SP |
| F017 | Ebeveyn İlerleme Raporları | Çocuğun öğrenme durumu hakkında raporlar | Orta | Planlandı | 8 SP |
| F018 | Sezon ve Temalar | Mevsimsel temalar ve özel içerikler | Düşük | Planlandı | 5 SP |
| F019 | İçerik Mağazası | Yeni ülke paketleri ve ekipman satın alma | Düşük | Planlandı | 13 SP |
| F020 | Cloud Senkronizasyon | Cihazlar arası ilerleme senkronizasyonu | Orta | Planlandı | 8 SP |

### Teknik Borç ve Altyapı

| ID | Özellik | Açıklama | Öncelik | Durum | Tahmini Efor |
|----|---------|----------|---------|-------|--------------|
| T001 | Performans Optimizasyonu | 3D modellerin ve AR işlemlerinin optimizasyonu | Yüksek | Planlandı | 8 SP |
| T002 | Çevrimdışı Mod | İnternet bağlantısı olmadan çalışabilme | Orta | Planlandı | 8 SP |
| T003 | Analytics Sistemi | Kullanım verilerinin toplanması ve analizi | Orta | Planlandı | 5 SP |
| T004 | Otomatik Test Sistemi | Unit ve entegrasyon testleri | Yüksek | Planlandı | 8 SP |
| T005 | CI/CD Pipeline | Sürekli entegrasyon ve dağıtım sistemi | Orta | Planlandı | 5 SP |
| T006 | Lokalizasyon Altyapısı | Çoklu dil desteği altyapısı | Yüksek | Planlandı | 5 SP |
| T007 | Veritabanı Optimizasyonu | Veritabanı sorgu ve yapısının iyileştirilmesi | Orta | Planlandı | 5 SP |
| T008 | API Gateway Yapılandırması | Backend API'lerin optimize edilmesi | Orta | Planlandı | 5 SP |
| T009 | Güvenlik Taraması | Kod ve altyapı güvenlik kontrolü | Yüksek | Planlandı | 5 SP |
| T010 | Dokümantasyon | Kod ve API dokümantasyonu | Orta | Planlandı | 3 SP |

## Sprint Planlaması

Her sprint 2 hafta (10 iş günü) olarak planlanmıştır. Toplam takım kapasitesi: Sprint başına 40 Story Point (SP).

### Sprint 1: Temel AR Altyapısı ve Harita

**Sprint Hedefi:** AR temel altyapısını kurmak ve dünya haritası sistemini oluşturmak

| ID | Görev | Atanan | Durum | SP |
|----|-------|--------|-------|------|
| F001 | AR Dünya Haritası | Atakan | Planlandı | 8 |
| T001 | Performans Optimizasyonu | Atakan | Planlandı | 8 |
| T006 | Lokalizasyon Altyapısı | Atakan | Planlandı | 5 |
| T004 | Otomatik Test Sistemi (Başlangıç) | Atakan | Planlandı | 5 |
| - | Sprint Planlama | Züleyha | Planlandı | 3 |
| - | Kullanıcı Hikayeleri Detaylandırma | Züleyha | Planlandı | 5 |
| - | AR Harita Konsept Tasarımı | Züleyha | Planlandı | 5 |

**Toplam SP:** 39

### Sprint 2: Karakter Sistemi ve Ülke Keşfi

**Sprint Hedefi:** Kullanıcı karakterini oluşturmak ve temel ülke keşif sistemini geliştirmek

| ID | Görev | Atanan | Durum | SP |
|----|-------|--------|-------|------|
| F002 | Kaşif Karakteri Oluşturma | Atakan | Planlandı | 5 |
| F003 | Ülke Keşif Sistemi (5 ülke) | Atakan | Planlandı | 8 |
| F006 | Basit AR Etkileşimler | Atakan | Planlandı | 8 |
| - | Sprint Retrospektifi | Züleyha | Planlandı | 2 |
| - | Karakter Tasarımları | Züleyha | Planlandı | 5 |
| - | Ülke İçerik Araştırması | Züleyha | Planlandı | 5 |
| - | Kullanıcı Testi Planlaması | Züleyha | Planlandı | 3 |
| T010 | Temel Dokümantasyon | Atakan | Planlandı | 3 |

**Toplam SP:** 39

### Sprint 3: Dil Öğrenme ve İlerleme Sistemi

**Sprint Hedefi:** Dil öğrenme modülünü ve ilerleme takip sistemini geliştirmek

| ID | Görev | Atanan | Durum | SP |
|----|-------|--------|-------|------|
| F004 | Temel Dil Öğrenme | Atakan | Planlandı | 8 |
| F005 | Rozet ve İlerleme Sistemi | Atakan | Planlandı | 5 |
| F007 | Kaşif Pasaportu | Atakan | Planlandı | 5 |
| F010 | Öğrenme Quiz'leri | Atakan | Planlandı | 5 |
| - | Dil İçeriği Hazırlama | Züleyha | Planlandı | 5 |
| - | Rozet Tasarımları | Züleyha | Planlandı | 3 |
| - | Pasaport UI Tasarımı | Züleyha | Planlandı | 3 |
| - | Quiz Sorularını Hazırlama | Züleyha | Planlandı | 5 |

**Toplam SP:** 39

### Sprint 4: Güvenlik Özellikleri ve Tamamlama

**Sprint Hedefi:** Ebeveyn kontrolü, göz sağlığı özelliklerini eklemek ve MVP'yi tamamlamak

| ID | Görev | Atanan | Durum | SP |
|----|-------|--------|-------|------|
| F008 | Ebeveyn Kontrolü - Temel | Atakan | Planlandı | 8 |
| F009 | Göz Sağlığı Koruması | Atakan | Planlandı | 5 |
| F003 | Ülke Keşif Sistemi (5 ülke daha) | Atakan | Planlandı | 5 |
| T003 | Analytics Sistemi | Atakan | Planlandı | 5 |
| - | Ebeveyn Kontrol Paneli UI | Züleyha | Planlandı | 5 |
| - | Göz Sağlığı Animasyonları | Züleyha | Planlandı | 3 |
| - | Kullanıcı Testleri | Züleyha | Planlandı | 5 |
| - | MVP Değerlendirmesi | Züleyha | Planlandı | 3 |

**Toplam SP:** 39

### Ürün Yol Haritası (Özet)

1. **MVP Sürümü** (Sprint 1-4)
   - Temel AR harita ve ülke keşif sistemi
   - Karakter oluşturma ve ilerleme mekanizmaları
   - Temel dil öğrenme ve bilgi testi
   - Ebeveyn kontrolü ve göz sağlığı özellikleri

2. **İkinci Sürüm** (Sprint 5-8)
   - 3D kültürel yapılar ve genişletilmiş içerik
   - Gelişmiş dil öğrenme ve telaffuz kontrolü
   - Kültürel mini oyunlar
   - Ebeveyn raporlama ve cloud senkronizasyon

3. **Üçüncü Sürüm** (Sprint 9-12)
   - Çok oyunculu mod
   - İçerik mağazası
   - Mevsimsel temalar ve özel etkinlikler
   - STEAM eğitim özellikleri

## Daily Scrum Toplantıları

Daily Scrum toplantıları her gün saat 10:00'da yapılır. Toplantı süresi maksimum 15 dakikadır. Her takım üyesi aşağıdaki soruları yanıtlar:

1. Dün ne yaptım?
2. Bugün ne yapacağım?
3. Karşılaştığım engeller var mı?

## Sprint Review ve Retrospektif

Her sprintin son gününde:

- **Sprint Review** (1 saat): Tamamlanan işlerin demo'su ve paydaşlardan geri bildirim alınması
- **Sprint Retrospektif** (1 saat): Takımın sprint sürecini değerlendirmesi ve iyileştirme alanları belirlemesi

## Tanımlar

- **Story Point (SP)**: Görevin karmaşıklığını, iş yükünü ve belirsizliğini yansıtan göreceli ölçü
- **Öncelik**: Çok Yüksek, Yüksek, Orta, Düşük olarak sınıflandırılır
- **Durum**: Planlandı, Devam Ediyor, Tamamlandı, Ertelendi

---

Bu backlog ve sprint planlaması, projenin ilerleyişine göre güncellenecektir. Sprint planlama toplantılarında detaylar netleştirilecek ve görevler atanacaktır. 