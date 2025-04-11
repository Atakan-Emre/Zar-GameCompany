/**
 * Doc Viewer - Markdown dosyalarını dinamik olarak yükleyip görüntüleyen script
 */

document.addEventListener('DOMContentLoaded', function() {
    // Marked.js kütüphanesini dinamik olarak yükle
    loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', function() {
        // Highlight.js kütüphanesini yükle
        loadScript('https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/lib/highlight.min.js', function() {
            // Highlight.js stil dosyasını yükle
            loadCSS('https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css');
            
            // Doküman listesini yükle ve görüntüle
            initializeDocViewer();
        });
    });
});

/**
 * JS dosyasını dinamik olarak yükleyen fonksiyon
 */
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

/**
 * CSS dosyasını dinamik olarak yükleyen fonksiyon
 */
function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

/**
 * Doküman görüntüleyici ana işlevselliği
 */
function initializeDocViewer() {
    // Döküman kategorileri ve linkleri
    const docCategories = [
        {
            name: 'Kurumsal',
            icon: 'fas fa-building',
            description: 'Şirket profili, kurumsal kimlik ve iletişim bilgileri.',
            documents: [
                { name: 'Şirket Profili', path: 'docs/kurumsal/şirket-profili.md' },
                { name: 'Kurumsal Kimlik', path: 'docs/kurumsal/kurumsal-kimlik.md' },
                { name: 'İletişim Bilgileri', path: 'docs/kurumsal/iletişim-bilgileri.md' }
            ]
        },
        {
            name: 'Tasarım Dokümanları',
            icon: 'fas fa-paint-brush',
            description: 'Oyun tasarımı, AR entegrasyonu, RAAS ilkeleri ve KPI hedefleri.',
            documents: [
                { name: 'Oyun Tasarımı', path: 'docs/tasarım-dokümanları/oyun-tasarimi.md' },
                { name: 'AR Entegrasyon Notları', path: 'docs/tasarım-dokümanları/ar-entegrasyon.md' },
                { name: 'RAAS İlkeleri', path: 'docs/tasarım-dokümanları/raas-ilkeleri.md' },
                { name: 'KPI ve SMART Hedefleri', path: 'docs/tasarım-dokümanları/kpi-smart-steam.md' }
            ]
        },
        {
            name: 'Teknik Dokümanlar',
            icon: 'fas fa-code',
            description: 'Mimari tasarım, altyapı ve güvenlik kontrolleri.',
            documents: [
                { name: 'Mimari Tasarım', path: 'docs/teknik-dokümanlar/mimari-tasarim.md' },
                { name: 'Altyapı', path: 'docs/teknik-dokümanlar/altyapı.md' },
                { name: 'Güvenlik Kontrolü', path: 'docs/teknik-dokümanlar/güvenlik-kontrol.md' }
            ]
        }
    ];

    // MD dosyalarını görüntüleyecek modal oluşturma
    createMarkdownModal();
    
    // Dinamik döküman listesi oluşturma
    renderDocumentList(docCategories);
    
    // Markdown görüntüleme konfigürasyonu
    configureMarked();
}

/**
 * Markdown görüntüleme için konfigürasyon
 */
function configureMarked() {
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            highlight: function(code, language) {
                if (typeof hljs !== 'undefined') {
                    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                    return hljs.highlight(validLanguage, code).value;
                }
                return code;
            },
            pedantic: false,
            gfm: true,
            breaks: true,
            sanitize: false,
            smartypants: false,
            xhtml: false
        });
    }
}

/**
 * Modal oluştur
 */
function createMarkdownModal() {
    const modalHTML = `
        <div id="markdown-modal" class="md-modal">
            <div class="md-modal-content">
                <div class="md-modal-header">
                    <h2 id="md-modal-title">Döküman Başlığı</h2>
                    <span class="md-close">&times;</span>
                </div>
                <div class="md-modal-body">
                    <div id="md-content"></div>
                </div>
                <div class="md-modal-footer">
                    <button class="md-print-btn"><i class="fas fa-print"></i> Yazdır</button>
                    <button class="md-download-btn"><i class="fas fa-download"></i> İndir</button>
                </div>
            </div>
        </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Modal kapatma işleyicisi
    document.querySelector('.md-close').addEventListener('click', function() {
        document.getElementById('markdown-modal').style.display = 'none';
    });
    
    // Kapat tuşu (Esc) için olay dinleyici
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.getElementById('markdown-modal').style.display = 'none';
        }
    });
    
    // Yazdırma butonu işlevselliği
    document.querySelector('.md-print-btn').addEventListener('click', function() {
        const content = document.getElementById('md-content').innerHTML;
        const title = document.getElementById('md-modal-title').textContent;
        printMarkdown(title, content);
    });
    
    // İndirme butonu işlevselliği
    document.querySelector('.md-download-btn').addEventListener('click', function() {
        const title = document.getElementById('md-modal-title').textContent;
        const path = document.getElementById('md-content').getAttribute('data-path');
        downloadMarkdown(path, title);
    });
    
    // Modal dışına tıklandığında kapat
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('markdown-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/**
 * Doküman listesini oluştur
 */
function renderDocumentList(categories) {
    const docContainer = document.querySelector('#docs .docs-list');
    if (!docContainer) return;
    
    // Mevcut içeriği temizle
    docContainer.innerHTML = '';
    
    // Her kategori için kartlar oluştur
    categories.forEach(category => {
        const categoryCard = document.createElement('li');
        categoryCard.className = 'doc-card doc-category';
        
        categoryCard.innerHTML = `
            <div class="doc-icon"><i class="${category.icon}"></i></div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="doc-list-toggle"><i class="fas fa-chevron-down"></i></div>
        `;
        
        // Alt dokümanlar için liste oluştur
        const docList = document.createElement('ul');
        docList.className = 'doc-sublist';
        
        category.documents.forEach(doc => {
            const docItem = document.createElement('li');
            docItem.className = 'doc-item';
            docItem.innerHTML = `<i class="fas fa-file-alt"></i> ${doc.name}`;
            
            // Doküman tıklama olayı
            docItem.addEventListener('click', function() {
                loadMarkdownFile(doc.path, doc.name);
            });
            
            docList.appendChild(docItem);
        });
        
        // Listeyi kategori kartına ekle
        categoryCard.appendChild(docList);
        
        // Kategori toggle işlevselliği
        categoryCard.querySelector('.doc-list-toggle').addEventListener('click', function() {
            this.classList.toggle('active');
            const sublist = categoryCard.querySelector('.doc-sublist');
            if (sublist.style.maxHeight) {
                sublist.style.maxHeight = null;
                this.querySelector('i').className = 'fas fa-chevron-down';
            } else {
                sublist.style.maxHeight = sublist.scrollHeight + "px";
                this.querySelector('i').className = 'fas fa-chevron-up';
            }
        });
        
        // Kartı ana listeye ekle
        docContainer.appendChild(categoryCard);
    });
    
    // Son Güncellenen Dokümanlar bölümü
    updateRecentDocsList();
}

/**
 * Markdown dosyasını yükle ve görüntüle
 */
function loadMarkdownFile(filePath, fileName) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Dosya yüklenemedi: ' + response.statusText);
            }
            return response.text();
        })
        .then(markdown => {
            const modal = document.getElementById('markdown-modal');
            document.getElementById('md-modal-title').textContent = fileName;
            
            const mdContent = document.getElementById('md-content');
            mdContent.innerHTML = marked(markdown);
            mdContent.setAttribute('data-path', filePath);
            
            // Kod blokları için syntax highlighting uygula
            document.querySelectorAll('#md-content pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
            
            // Modalı göster
            modal.style.display = 'block';
            
            // Görüntülenen dosyayı locale kaydet
            saveToRecentDocs(filePath, fileName);
        })
        .catch(error => {
            console.error('Dosya yükleme hatası:', error);
            alert('Dosya yüklenirken bir hata oluştu: ' + error.message);
        });
}

/**
 * Son görüntülenen dokümanları localStorage'a kaydet
 */
function saveToRecentDocs(path, name) {
    let recentDocs = JSON.parse(localStorage.getItem('recentDocs') || '[]');
    
    // Eğer dokuman zaten listede varsa, onu kaldır
    recentDocs = recentDocs.filter(doc => doc.path !== path);
    
    // Yeni dokümanı başa ekle
    recentDocs.unshift({
        path: path,
        name: name,
        date: new Date().toISOString()
    });
    
    // Sadece son 5 dokümanı tut
    recentDocs = recentDocs.slice(0, 5);
    
    // localStorage'a kaydet
    localStorage.setItem('recentDocs', JSON.stringify(recentDocs));
    
    // Son güncellemeleri güncelle
    updateRecentDocsList();
}

/**
 * Son görüntülenen dokümanlar listesini güncelle
 */
function updateRecentDocsList() {
    const recentList = document.querySelector('.recent-docs');
    if (!recentList) return;
    
    // localStorage'dan son dokümanları al
    const recentDocs = JSON.parse(localStorage.getItem('recentDocs') || '[]');
    
    if (recentDocs.length === 0) {
        recentList.innerHTML = '<li class="no-docs">Henüz görüntülenen doküman yok.</li>';
        return;
    }
    
    // Listeyi temizle
    recentList.innerHTML = '';
    
    // Son dokümanları ekle
    recentDocs.forEach(doc => {
        const li = document.createElement('li');
        
        // Tarih formatını oluştur
        const date = new Date(doc.date);
        const now = new Date();
        let dateText;
        
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            dateText = 'Bugün';
        } else if (diffDays === 1) {
            dateText = 'Dün';
        } else {
            dateText = `${diffDays} gün önce`;
        }
        
        li.innerHTML = `
            <i class="fas fa-file-alt"></i> 
            <a href="javascript:void(0);">${doc.name}</a> 
            <span class="update-date">${dateText}</span>
        `;
        
        // Doküman tıklama olayı
        li.querySelector('a').addEventListener('click', function() {
            loadMarkdownFile(doc.path, doc.name);
        });
        
        recentList.appendChild(li);
    });
}

/**
 * Markdown içeriğini yazdır
 */
function printMarkdown(title, content) {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2, h3 { color: #444; }
                pre { background: #f5f5f5; padding: 10px; overflow: auto; }
                code { font-family: 'Courier New', monospace; }
                table { border-collapse: collapse; width: 100%; }
                table, th, td { border: 1px solid #ddd; }
                th, td { padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                @media print {
                    body { font-size: 12pt; }
                    pre, code { font-size: 10pt; }
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="content">${content}</div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Kısa bir gecikme sonra yazdır (sayfanın yüklenmesi için)
    setTimeout(function() {
        printWindow.print();
        // Yazdırma diyalogu kapatıldıktan sonra pencereyi kapat
        printWindow.close();
    }, 500);
}

/**
 * Markdown dosyasını indir
 */
function downloadMarkdown(path, title) {
    fetch(path)
        .then(response => response.text())
        .then(content => {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(content));
            
            // Dosya adını belirle
            const fileName = path.split('/').pop();
            element.setAttribute('download', fileName);
            
            // Görünmez link oluştur ve tıkla
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        })
        .catch(error => {
            console.error('Dosya indirme hatası:', error);
            alert('Dosya indirilirken bir hata oluştu: ' + error.message);
        });
} 