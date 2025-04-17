/**
 * Doc Viewer - Markdown dosyalarını dinamik olarak yükleyip görüntüleyen script
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Döküman yükleyici başlatılıyor...');
    
    // Doküman görüntüleyiciyi başlat
    setTimeout(() => {
        initDocumentViewer();
    }, 500);
    
    // Hata izleme
    window.addEventListener('error', function(e) {
        console.error('Global hata yakalandı:', e.error?.message);
        console.error('Dosya:', e.filename);
        console.error('Satır:', e.lineno);
        console.error('Sütun:', e.colno);
    });
});

/**
 * Gerekli kütüphaneleri yükle
 */
function loadDependencies() {
    return new Promise((resolve) => {
        // Kütüphaneler yüklenmiş varsayalım
        setTimeout(() => {
            resolve({
                marked: true,
                hljs: true
            });
        }, 300);
    });
}

// Doküman kategorileri ve dosya yolları
const documentCategories = {
    "tasarim": {
        "title": "Tasarım Dokümanları",
        "icon": "palette",
        "color": "#9C27B0", // Mor
        "documents": [
            { "title": "Oyun Tasarımı", "path": "docs/tasarım-dokümanları/oyun-tasarimi.md" },
            { "title": "AR Entegrasyon Notları", "path": "docs/tasarım-dokümanları/ar-entegrasyon.md" },
            { "title": "KPI ve STEAM Yaklaşımı", "path": "docs/tasarım-dokümanları/kpi-smart-steam.md" },
            { "title": "RAAS İlkeleri", "path": "docs/tasarım-dokümanları/raas-ilkeleri.md" }
        ]
    },
    "teknik": {
        "title": "Teknik Dokümanlar",
        "icon": "code",
        "color": "#673AB7", // Koyu Mor
        "documents": [
            { "title": "Mimari Tasarım", "path": "docs/teknik-dokümanlar/mimari-tasarim.md" },
            { "title": "Altyapı ve API", "path": "docs/teknik-dokümanlar/altyapı.md" },
            { "title": "Güvenlik ve Kontrol", "path": "docs/teknik-dokümanlar/güvenlik-kontrol.md" }
        ]
    },
    "planlama": {
        "title": "Planlama Dokümanları",
        "icon": "tasks",
        "color": "#7E57C2", // Orta Mor
        "documents": [
            { "title": "Backlog ve Sprint Planı", "path": "docs/planlama/backlog.md" },
            { "title": "Kullanıcı Hikayeleri", "path": "docs/planlama/user-story-örnekleri.md" },
            { "title": "Sprint Planı", "path": "docs/planlama/sprint-plan.md" }
        ]
    },
    "kurumsal": {
        "title": "Kurumsal Bilgiler",
        "icon": "building",
        "color": "#5E35B1", // Menekşe
        "documents": [
            { "title": "Şirket Profili", "path": "docs/kurumsal/şirket-profili.md" },
            { "title": "İletişim Bilgileri", "path": "docs/kurumsal/iletişim-bilgileri.md" },
            { "title": "Kurumsal Kimlik", "path": "docs/kurumsal/kurumsal-kimlik.md" }
        ],
        "logo": "docs/kurumsal/logo.png"
    }
};

// Anlık görüntülenen kategori key'ini saklamak için global değişken
let currentCategoryKey = '';

/**
 * Doküman görüntüleyiciyi başlatan fonksiyon
 */
function initDocumentViewer() {
    console.log('Doküman görüntüleyici başlatılıyor...');
    
    // Bağımlılıkları yükle
    loadDependencies()
        .then(() => {
            // Marked.js seçeneklerini ayarla
            if (window.marked) {
                marked.setOptions({
                    breaks: true,
                    gfm: true,
                    headerIds: true,
                    sanitize: false
                });
            }
            
            // Doküman kartlarını oluştur
            createDocumentCards();
            
            // Modal kapatma düğmesine tıklama işlevi ekle
            const closeButtons = document.querySelectorAll('.modal-close');
            closeButtons.forEach(button => {
                button.addEventListener('click', closeModal);
            });
            
            // Modal dışına tıklama ile kapatma
            const modalOverlay = document.querySelector('.modal-overlay');
            if (modalOverlay) {
                modalOverlay.addEventListener('click', (e) => {
                    if (e.target === modalOverlay) {
                        closeModal();
                    }
                });
            }
            
            // Modal header'a geri butonu ekleme
            updateModalHeader();
            
            console.log("Doküman görüntüleyici başarıyla başlatıldı");
        })
        .catch(error => {
            console.error("Doküman görüntüleyici başlatılamadı:", error);
        });
}

/**
 * Modal header'ını güncelleyerek geri butonunu ekler
 */
function updateModalHeader() {
    const modalHeader = document.querySelector('.modal-header');
    if (modalHeader) {
        // Mevcut içeriği koru ama geri butonu ekle
        const currentTitle = modalHeader.querySelector('h2').textContent;
        modalHeader.innerHTML = `
            <button class="modal-back" title="Geri Dön"><i class="fas fa-arrow-left"></i></button>
            <h2>${currentTitle}</h2>
            <button class="modal-close" title="Kapat">&times;</button>
        `;
        
        // Geri butonuna olay dinleyici ekle
        const backButton = modalHeader.querySelector('.modal-back');
        if (backButton) {
            backButton.addEventListener('click', goBackToCategory);
            // Başlangıçta geri butonu gizli olsun
            backButton.style.display = 'none';
        }
        
        // Kapatma butonuna olay dinleyici ekle
        const closeButton = modalHeader.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
    }
}

/**
 * Kategori sayfasına geri dönüş işlemi
 */
function goBackToCategory() {
    if (currentCategoryKey) {
        showDocumentsModal(currentCategoryKey);
    }
}

/**
 * Doküman kategorileri için kartlar oluşturur
 */
function createDocumentCards() {
    const docsSection = document.querySelector('#docs .docs-list');
    if (!docsSection) {
        console.error('Dokümanlar bölümü bulunamadı! (#docs .docs-list)');
        return;
    }
    
    // Mevcut içeriği temizle
    docsSection.innerHTML = '';
    
    const container = document.createElement('div');
    container.className = 'doc-cards-container';
    
    // Her kategori için bir kart oluştur
    Object.keys(documentCategories).forEach(categoryKey => {
        const category = documentCategories[categoryKey];
        
        const card = document.createElement('div');
        card.className = 'doc-category-card';
        card.setAttribute('data-category', categoryKey);
        card.style.borderTopColor = category.color;
        
        card.innerHTML = `
            <div class="card-icon" style="color: ${category.color}">
                <i class="fas fa-${category.icon}"></i>
            </div>
            <h3>${category.title}</h3>
            <p>${category.documents.length} doküman</p>
            <div class="card-footer">
                <button class="view-docs-btn" style="background-color: ${category.color}">
                    Görüntüle <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        card.querySelector('.view-docs-btn').addEventListener('click', () => {
            showDocumentsModal(categoryKey);
        });
        
        container.appendChild(card);
    });
    
    // Konteyneri sayfaya ekle
    docsSection.appendChild(container);
}

/**
 * Belirli bir kategori için doküman listesini içeren bir modal gösterir
 */
function showDocumentsModal(categoryKey) {
    const category = documentCategories[categoryKey];
    
    if (!category) {
        console.error("Kategori bulunamadı:", categoryKey);
        return;
    }
    
    // Mevcut kategoriyi kaydet
    currentCategoryKey = categoryKey;
    
    const modalContent = document.querySelector('.modal-content');
    const modalHeader = document.querySelector('.modal-header h2');
    const backButton = document.querySelector('.modal-back');
    
    if (!modalContent || !modalHeader) {
        console.error("Modal elementleri bulunamadı");
        return;
    }
    
    // Geri butonunu gizle (kategorideyken geri butonu gösterme)
    if (backButton) {
        backButton.style.display = 'none';
    }
    
    // Modal başlığını güncelle
    modalHeader.textContent = category.title;
    
    // Doküman listesini oluştur
    let docListHTML = '';

    // Eğer kategoride logo varsa onu göster (özellikle kurumsal kategori için)
    if (category.logo) {
        docListHTML += `
            <div class="category-logo-container">
                <img src="${category.logo}" alt="${category.title} Logo" class="category-logo">
            </div>
        `;
    }
    
    docListHTML += `<div class="document-category-header" style="color: ${category.color}">
        <i class="fas fa-${category.icon}"></i> 
        <h3>${category.title}</h3>
    </div>
    <div class="documents-list">`;
    
    category.documents.forEach(doc => {
        // Dosya adını al (sadece gösterim için)
        const fileName = doc.path.split('/').pop();
        
        docListHTML += `
            <div class="document-item" data-path="${doc.path}">
                <div class="doc-icon" style="background-color: ${category.color}">
                    <i class="fas fa-file-alt" style="color: white;"></i>
                </div>
                <div class="doc-info">
                    <h4>${doc.title}</h4>
                    <span class="file-path">${fileName}</span>
                </div>
                <div class="doc-action">
                    <button class="btn-view-doc" aria-label="Görüntüle" title="Dökümanı Görüntüle" style="background-color: ${category.color}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    docListHTML += '</div>';
    
    // Modal içeriğini güncelle
    modalContent.innerHTML = docListHTML;
    
    // Doküman görüntüleme butonlarına tıklama işlevleri ekle
    document.querySelectorAll('.document-item').forEach(item => {
        const docPath = item.getAttribute('data-path');
        const docTitle = item.querySelector('h4').textContent;
        
        // Tüm kart alanı tıklanabilir hale getiriliyor
        item.addEventListener('click', function(e) {
            // Eğer buton tıklandıysa zaten kart tıklama olayı çalışacak
            // Çift tetiklemeyi önlemek için butonun kendisini kontrol ediyoruz
            if (!e.target.closest('.btn-view-doc')) {
                loadMarkdownFile(docPath, docTitle, category.logo);
            }
        });
        
        // Buton için ayrı olay dinleyici
        const viewButton = item.querySelector('.btn-view-doc');
        viewButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Event'in üst elemanlara yayılımını durdur
            loadMarkdownFile(docPath, docTitle, category.logo);
        });
    });
    
    // Modalı göster
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.add('active');
    }
}

/**
 * Modal penceresini kapatır
 */
function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('active');
}

/**
 * Markdown dosyasını yükleyip görüntüler
 */
function loadMarkdownFile(filePath, title, logoPath = null) {
    const modalContent = document.querySelector('.modal-content');
    const modalHeader = document.querySelector('.modal-header h2');
    const backButton = document.querySelector('.modal-back');
    
    if (!modalContent || !modalHeader) {
        console.error("Modal elementleri bulunamadı");
        return;
    }
    
    // Geri butonunu göster
    if (backButton) {
        backButton.style.display = 'block';
    }
    
    // Modal başlığını güncelle
    modalHeader.textContent = title;
    
    // Yükleniyor mesajı göster
    modalContent.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <div class="loading-text">Doküman yükleniyor...</div>
        </div>
    `;
    
    // Dosya yoluna göre dosyayı yükle
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Marked.js ile markdown'ı HTML'e dönüştür
            const html = marked.parse(markdown);
            
            // HTML içerisindeki görsel yollarını düzelt (özellikle logo)
            let fixedHtml = html.replace(/img src="(\.\/)?logo\.png"/g, 'img src="docs/kurumsal/logo.png"');
            
            // Logo varsa ekle
            let logoHTML = '';
            if (logoPath) {
                logoHTML = `
                    <div class="markdown-logo-container">
                        <img src="${logoPath}" alt="Logo" class="markdown-logo animate-logo">
                    </div>
                `;
            }
            
            // Modal içeriğini güncelle ve geri butonunu ekle
            modalContent.innerHTML = `
                ${logoHTML}
                <div class="markdown-content">${fixedHtml}</div>
                <div class="back-to-category">
                    <button class="btn-back" title="Kategori listesine dön">
                        <i class="fas fa-arrow-left"></i> Kategori Listesine Dön
                    </button>
                </div>
            `;
            
            // İçerik içindeki geri butonuna da tıklama olayı ekle
            const contentBackBtn = modalContent.querySelector('.btn-back');
            if (contentBackBtn) {
                contentBackBtn.addEventListener('click', goBackToCategory);
            }
            
            // İçeriğin tamamını görüntülemek için modalı kaydır
            modalContent.scrollTop = 0;
            
            // Kod blokları için syntax highlighting
            if (window.hljs) {
                document.querySelectorAll('.markdown-content pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            }
            
            // Doküman içindeki resimleri duyarlı hale getir
            document.querySelectorAll('.markdown-content img').forEach(img => {
                img.classList.add('responsive-image');
                
                // Logo referanslarını düzelt
                if (img.src.includes('logo.png')) {
                    img.classList.add('doc-logo-image');
                    
                    // Logo yükleme hatası için olay dinleyicisi
                    img.onerror = function() {
                        console.log('Logo yükleme hatası, yol düzeltiliyor...');
                        this.src = 'docs/kurumsal/logo.png';
                    };
                    
                    // Logo için tıklama efekti
                    img.addEventListener('click', function() {
                        this.classList.toggle('logo-rotate');
                    });
                } else {
                    img.addEventListener('click', function() {
                        openImageViewer(this.src);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenemedi:', error);
            modalContent.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Doküman Yüklenemedi</h3>
                    <p>İstenen dosya yüklenirken bir hata oluştu: ${error.message}</p>
                    <p>Lütfen sistem yöneticisine başvurun.</p>
                    <button class="btn-back" title="Kategori listesine dön">
                        <i class="fas fa-arrow-left"></i> Kategori Listesine Dön
                    </button>
                </div>
            `;
            
            // Hata durumunda geri butonuna olay dinleyici ekle
            const errorBackBtn = modalContent.querySelector('.btn-back');
            if (errorBackBtn) {
                errorBackBtn.addEventListener('click', goBackToCategory);
            }
        });
}

// Global hata yakalama
window.onerror = function(message, source, lineno, colno, error) {
    console.error('JS Hatası:', error);
    return true;
};