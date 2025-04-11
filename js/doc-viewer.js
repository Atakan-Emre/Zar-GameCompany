/**
 * Doc Viewer - Markdown dosyalarını dinamik olarak yükleyip görüntüleyen script
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Döküman yükleyici başlatılıyor...');
    
    // Marked.js kütüphanesini dinamik olarak yükle
    loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', function() {
        console.log('Marked.js yüklendi');
        // Highlight.js kütüphanesini yükle
        loadScript('https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/lib/highlight.min.js', function() {
            console.log('Highlight.js yüklendi');
            // Highlight.js stil dosyasını yükle
            loadCSS('https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css');
            
            // Doküman listesini yükle ve görüntüle
            initializeDocViewer();
        });
    });
    
    // Hata izleme
    window.addEventListener('error', function(e) {
        console.error('Global hata yakalandı:', e.error.message);
        console.error('Dosya:', e.filename);
        console.error('Satır:', e.lineno);
        console.error('Sütun:', e.colno);
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
    // Doküman Kategorileri ve Belgeleri
    const documentCategories = [
        {
            id: 'kurumsal',
            title: 'Kurumsal',
            icon: 'fas fa-building',
            description: 'Şirket bilgileri ve kurumsal dokümanlar',
            documents: [
                { title: 'Hakkımızda', path: 'docs/kurumsal/hakkimizda.md' },
                { title: 'Ekibimiz', path: 'docs/kurumsal/ekibimiz.md' },
                { title: 'İletişim Bilgileri', path: 'docs/kurumsal/iletişim-bilgileri.md' }
            ]
        },
        {
            id: 'tasarim',
            title: 'Tasarım Dokümanları',
            icon: 'fas fa-paint-brush',
            description: 'Oyun tasarımı ve geliştirme dokümanları',
            documents: [
                { title: 'Oyun Tasarımı', path: 'docs/tasarım-dokümanları/oyun-tasarimi.md' },
                { title: 'AR Entegrasyon Notları', path: 'docs/tasarım-dokümanları/ar-entegrasyon.md' },
                { title: 'KPI, SMART ve STEAM Yaklaşımı', path: 'docs/tasarım-dokümanları/kpi-smart-steam.md' },
                { title: 'RAAS Tasarım İlkeleri', path: 'docs/tasarım-dokümanları/raas-ilkeleri.md' }
            ]
        },
        {
            id: 'teknik',
            title: 'Teknik Dokümanlar',
            icon: 'fas fa-code',
            description: 'Teknik geliştirme ve altyapı dokümanları',
            documents: [
                { title: 'Uygulama Mimarisi', path: 'docs/teknik-dokümanlar/mimari-tasarim.md' },
                { title: 'Altyapı ve API', path: 'docs/teknik-dokümanlar/altyapı.md' },
                { title: 'Güvenlik ve Kontrol', path: 'docs/teknik-dokümanlar/güvenlik-kontrol.md' }
            ]
        },
        {
            id: 'planlama',
            title: 'Proje Planlama',
            icon: 'fas fa-tasks',
            description: 'Proje planlama ve izleme dokümanları',
            documents: [
                { title: 'Ürün ve Sprint Backlog', path: 'planning/backlog.md' },
                { title: 'Kullanıcı Hikayeleri', path: 'planning/user-story-örnekleri.md' }
            ]
        }
    ];

    // MD dosyalarını görüntüleyecek modal oluşturma
    createMarkdownModal();
    
    // Dinamik döküman listesi oluşturma
    renderDocumentList(documentCategories);
    
    // Markdown görüntüleme konfigürasyonu
    configureMarked();
    
    // Modal kapatma işlevini ayarla
    setupModalClose();
    
    // Test için örnek doküman yüklemeyi dene
    console.log("Örnek test dokümanı yükleniyor...");
    setTimeout(function() {
        loadMarkdownFile("README.md", "Proje README Dosyası");
    }, 2000);
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
            <h3>${category.title}</h3>
            <p>${category.description}</p>
            <div class="doc-list-toggle"><i class="fas fa-chevron-down"></i></div>
        `;
        
        // Alt dokümanlar için liste oluştur
        const docList = document.createElement('ul');
        docList.className = 'doc-sublist';
        
        category.documents.forEach(doc => {
            const docItem = document.createElement('li');
            docItem.className = 'doc-item';
            docItem.innerHTML = `<i class="fas fa-file-alt"></i> ${doc.title}`;
            
            // Doküman tıklama olayı
            docItem.addEventListener('click', function() {
                loadMarkdownFile(doc.path, doc.title);
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
 * Markdown dosyasını yükler ve görüntüler
 * @param {string} path - Markdown dosyasının yolu
 * @param {string} title - Dokümanın başlığı
 */
async function loadMarkdownFile(path, title) {
    console.log("Doküman yükleniyor: " + path);
    
    // Modal başlığını ayarla
    document.getElementById('markdownTitle').textContent = title;
    
    // Yükleniyor mesajını göster
    document.getElementById('markdownContent').innerHTML = '<div class="loading">Doküman yükleniyor...</div>';
    
    // Modal'ı göster
    document.getElementById('markdownModal').style.display = 'block';
    
    try {
        let markdown = null;
        let errorMsg = null;
        
        // Önce GitHub'dan yüklemeyi dene
        try {
            console.log("GitHub'dan yükleniyor...");
            markdown = await fetchFromGitHub(path);
            console.log("GitHub'dan yükleme başarılı");
        } catch (githubError) {
            console.error("GitHub'dan yükleme başarısız:", githubError);
            errorMsg = githubError.message;
            
            // GitHub başarısız olursa yerel dosyadan yüklemeyi dene
            try {
                console.log("Yerel dosyadan yükleniyor...");
                markdown = await fetchFromLocal(path);
                console.log("Yerel dosyadan yükleme başarılı");
                errorMsg = null; // Yerel yükleme başarılı olduysa hata mesajını temizle
            } catch (localError) {
                console.error("Yerel dosyadan yükleme de başarısız:", localError);
                throw new Error(`Doküman yüklenemedi: ${errorMsg}\nYerel hata: ${localError.message}`);
            }
        }
        
        // Markdown içeriğini görüntüle
        if (markdown) {
            displayMarkdown(markdown);
        } else {
            throw new Error("Markdown içeriği boş");
        }
    } catch (error) {
        console.error("Doküman yükleme hatası:", error);
        document.getElementById('markdownContent').innerHTML = `
            <div class="error-message">
                <h3>Doküman yüklenemedi</h3>
                <p>${error.message}</p>
                <p>Lütfen daha sonra tekrar deneyin veya site yöneticisiyle iletişime geçin.</p>
            </div>
        `;
    }
}

/**
 * GitHub'dan markdown dosyasını yükler
 * @param {string} path - Dosya yolu
 * @returns {Promise<string>} - Markdown içeriği
 */
async function fetchFromGitHub(path) {
    // GitHub bilgileri
    const owner = "Atakan-Emre";
    const repo = "Zar-GameCompany";
    const branch = "main";
    
    // GitHub raw URL'ini oluştur
    const githubRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    console.log("GitHub Raw URL:", githubRawUrl);
    
    const response = await fetch(githubRawUrl);
    console.log("GitHub Yanıt Durumu:", response.status, response.statusText);
    
    if (!response.ok) {
        throw new Error(`GitHub'dan yükleme başarısız: ${response.status} ${response.statusText}`);
    }
    
    const markdown = await response.text();
    if (!markdown || markdown.trim() === '') {
        throw new Error('Boş içerik');
    }
    
    return markdown;
}

/**
 * Yerel dosyadan markdown yükler
 * @param {string} path - Dosya yolu
 * @returns {Promise<string>} - Markdown içeriği
 */
async function fetchFromLocal(path) {
    console.log("Yerel dosya yolu:", path);
    
    const response = await fetch(path);
    console.log("Yerel Yanıt Durumu:", response.status, response.statusText);
    
    if (!response.ok) {
        throw new Error(`Yerel dosyadan yükleme başarısız: ${response.status} ${response.statusText}`);
    }
    
    const markdown = await response.text();
    if (!markdown || markdown.trim() === '') {
        throw new Error('Boş içerik');
    }
    
    return markdown;
}

/**
 * Markdown içeriğini HTML'e dönüştürüp görüntüler
 * @param {string} markdown - Markdown içeriği
 */
function displayMarkdown(markdown) {
    console.log(`Markdown içeriği yüklendi (${markdown.length} karakter)`);
    
    try {
        // Markdown'ı HTML'e dönüştür
        const html = marked.parse(markdown);
        console.log("Markdown HTML'e dönüştürüldü");
        
        // İçeriği göster
        document.getElementById('markdownContent').innerHTML = html;
        
        // Kod bloklarına syntax highlighting uygula
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
        console.log("Doküman başarıyla görüntülendi");
    } catch (error) {
        console.error("Markdown işleme hatası:", error);
        document.getElementById('markdownContent').innerHTML = `
            <div class="error-message">
                <h3>İçerik işlenemedi</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
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
    // GitHub repo bilgileri
    const owner = 'Atakan-Emre';
    const repo = 'Zar-GameCompany';
    const branch = 'main';
    
    // GitHub Raw içerik URL'si
    const githubRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    
    fetch(githubRawUrl)
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