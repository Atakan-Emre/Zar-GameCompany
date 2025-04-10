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
        "icon": "calendar",
        "color": "#7E57C2", // Orta Mor
        "documents": [
            { "title": "Backlog ve Sprint Planı", "path": "planning/backlog.md" },
            { "title": "Kullanıcı Hikayeleri", "path": "planning/user-story-örnekleri.md" }
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
        ]
    }
};

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
            
            console.log("Doküman görüntüleyici başarıyla başlatıldı");
        })
        .catch(error => {
            console.error("Doküman görüntüleyici başlatılamadı:", error);
        });
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
    
    const modalContent = document.querySelector('.modal-content');
    const modalHeader = document.querySelector('.modal-header h2');
    
    if (!modalContent || !modalHeader) {
        console.error("Modal elementleri bulunamadı");
        return;
    }
    
    // Modal başlığını güncelle
    modalHeader.textContent = category.title;
    
    // Doküman listesini oluştur
    let docListHTML = `<div class="document-category-header" style="color: ${category.color}">
        <i class="fas fa-${category.icon}"></i> 
        <h3>${category.title}</h3>
    </div>`;
    
    docListHTML += '<div class="documents-list">';
    
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
        item.addEventListener('click', (e) => {
            // Eğer buton tıklandıysa zaten kart tıklama olayı çalışacak
            // Çift tetiklemeyi önlemek için butonun kendisini kontrol ediyoruz
            if (!e.target.closest('.btn-view-doc')) {
                loadMarkdownFile(docPath, docTitle);
            }
        });
        
        // Buton için ayrı olay dinleyici
        const viewButton = item.querySelector('.btn-view-doc');
        viewButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Event'in üst elemanlara yayılımını durdur
            loadMarkdownFile(docPath, docTitle);
        });
    });
    
    // Modalı göster
    document.querySelector('.modal-overlay').classList.add('active');
}

/**
 * Modal penceresini kapatır
 */
function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('active');
}

/**
 * Markdown dosyasını yükleyen ve görüntüleyen fonksiyon
 */
function loadMarkdownFile(filePath, title) {
    const modalContent = document.querySelector('.modal-content');
    
    if (!modalContent) {
        console.error("Modal içerik elementi bulunamadı");
        return;
    }
    
    // Yükleniyor mesajı göster
    modalContent.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <div class="loading-text">Doküman yükleniyor...</div>
        </div>
    `;
    
    // Modal başlığını güncelle
    const modalHeader = document.querySelector('.modal-header h2');
    if (modalHeader) {
        modalHeader.textContent = title;
    }
    
    // Modalı göster
    document.querySelector('.modal-overlay').classList.add('active');
    
    // GitHub raw URL oluştur
    const repoOwner = 'Atakan-Emre';
    const repoName = 'Zar-GameCompany';
    const branch = 'main';
    const githubRawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${filePath}`;
    
    // Markdown dosyasını getir
    fetch(githubRawUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Marked.js ile markdown'ı HTML'e dönüştür
            const html = marked.parse(markdown);
            
            // Modal içeriğini güncelle
            modalContent.innerHTML = `<div class="markdown-content">${html}</div>`;
            
            // İçeriğin tamamını görüntülemek için modalı kaydır
            modalContent.scrollTop = 0;
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenemedi:', error);
            modalContent.innerHTML = `
                <div class="not-found">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Doküman Bulunamadı</h3>
                    <p>İstenen dosya yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
        });
}

// Global hata yakalama
window.onerror = function(message, source, lineno, colno, error) {
    console.error('JS Hatası:', error);
    return true;
};