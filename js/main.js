// Web sayfası JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menü işlevselliği
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Mobil menüdeki linklere tıklandığında menüyü kapat
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Sayfa kaydırma animasyonu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Planlama dokümanları butonuna tıklama olayı
    const planningDocsBtn = document.getElementById('planning-docs-btn');
    if (planningDocsBtn) {
        planningDocsBtn.addEventListener('click', function() {
            showPlanningDocs();
        });
    }
    
    // Sayfa yüklendiğinde başlangıç animasyonları
    animateOnScroll();
    
    // Scroll olayı ekle
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature, .team-member, .doc-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }

    // Header scroll efekti
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Scroll animasyonu için
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Elementleri görünür olduklarında animasyonla göster
        document.querySelectorAll('.feature, .team-member, .docs-list li, .sprint-item').forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
        
        // Parallax efekti
        if (document.querySelector('.hero-shapes')) {
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                shape.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });

    // Sprint timeline interaktivitesi
    if (document.querySelector('.sprint-timeline')) {
        document.querySelectorAll('.sprint-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('sprint-active');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('sprint-active');
            });
        });
    }
    
    // Yakında Geliyor butonuna interaktif efektler
    const primaryBtn = document.querySelector('.primary-btn');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Dünya Kaşifi yakında geliyor! Takipte kalın...', 'info');
        });
    }
    
    // Doküman interaktivitesi
    if (document.querySelector('.doc-card')) {
        document.querySelectorAll('.doc-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Kart tıklanabilir olsun
                if (e.target.tagName !== 'A') {
                    const link = this.querySelector('a');
                    if (link) window.location.href = link.getAttribute('href');
                }
            });
        });
    }
    
    // Technoloji etiketleri için tooltip efekti
    if (document.querySelector('.tech-tag')) {
        const techInfo = {
            'AR Teknolojisi': 'ARCore ve ARKit kullanılarak cihazınızda gerçek dünya ile etkileşimli içerikler',
            'Unity 3D': 'Oyun geliştirme için kullanılan güçlü ve esnek motor',
            'Eğitici İçerik': 'Eğlenceyi öğrenmeyle birleştiren pedagojik içerikler',
            'STEAM Yaklaşımı': 'Bilim, Teknoloji, Mühendislik, Sanat ve Matematik odaklı eğitim yaklaşımı'
        };
        
        document.querySelectorAll('.tech-tag').forEach(tag => {
            const tagText = tag.textContent.trim();
            
            tag.addEventListener('mouseenter', function() {
                if (techInfo[tagText]) {
                    showTooltip(this, techInfo[tagText]);
                }
            });
            
            tag.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        });
    }
});

// Element görünür mü kontrolü
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Element animasyonlarını başlat
function animateElements() {
    // Hero section animasyonu
    const hero = document.querySelector('#hero .container');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Hero şekilleri için animasyon
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.opacity = '0';
        shape.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            shape.style.transition = 'all 0.8s ease-out';
            shape.style.opacity = '1';
            shape.style.transform = 'scale(1)';
        }, 500 + (index * 200));
    });
    
    // Sprint timeline için animasyon
    const timelineTrack = document.querySelector('.timeline-track');
    if (timelineTrack) {
        timelineTrack.style.height = '0';
        
        setTimeout(() => {
            timelineTrack.style.transition = 'height 1.5s ease-out';
            timelineTrack.style.height = '100%';
        }, 800);
    }
}

// Bildirim gösterme
function showNotification(message, type = 'info') {
    // Halihazırda bir bildirim varsa kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animasyon için zamanlama
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Kapanış butonu
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Otomatik kapanma
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Tooltip gösterme
let activeTooltip = null;

function showTooltip(element, text) {
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltipHeight - 10 + window.scrollY + 'px';
    
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
    
    activeTooltip = tooltip;
}

function hideTooltip() {
    if (activeTooltip) {
        activeTooltip.classList.remove('show');
        setTimeout(() => {
            if (activeTooltip.parentNode) {
                document.body.removeChild(activeTooltip);
            }
            activeTooltip = null;
        }, 200);
    }
}

// RAAS Animasyonu
function initRaasAnimation() {
    if (!document.querySelector('#raas-demo')) return;
    
    const raasContainer = document.querySelector('#raas-demo');
    const raasElements = [
        { icon: 'fa-globe', text: 'Dünya Haritası', delay: 0 },
        { icon: 'fa-language', text: 'Dil Modülü', delay: 0.5 },
        { icon: 'fa-landmark', text: 'Kültürel Yapılar', delay: 1 },
        { icon: 'fa-medal', text: 'Başarılar', delay: 1.5 }
    ];
    
    // RAAS elementlerini oluştur
    raasElements.forEach(element => {
        const raasElement = document.createElement('div');
        raasElement.className = 'raas-element';
        raasElement.style.animationDelay = `${element.delay}s`;
        
        raasElement.innerHTML = `
            <div class="raas-icon">
                <i class="fas ${element.icon}"></i>
            </div>
            <div class="raas-text">${element.text}</div>
        `;
        
        raasContainer.appendChild(raasElement);
    });
}

// Sayfayı yazdırmak için
function printDocument(docId) {
    const printWindow = window.open('', '_blank');
    const documentContent = document.getElementById(docId).innerHTML;
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Dünya Kaşifi - Doküman</title>
            <link rel="stylesheet" href="css/style.css">
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #4d51d8; }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="no-print">
                <button onclick="window.print()">Yazdır</button>
                <button onclick="window.close()">Kapat</button>
            </div>
            <h1>Dünya Kaşifi - Doküman</h1>
            <hr>
            ${documentContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

// Planlama dokümanlarını gösteren fonksiyon
function showPlanningDocs() {
    const planningDocs = [
        { title: "Backlog ve Sprint Planı", path: "planning/backlog.md" },
        { title: "Kullanıcı Hikayeleri", path: "planning/user-story-örnekleri.md" }
    ];
    
    // Modal öğesini getir
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalHeader = document.querySelector('.modal-header h2');
    const modalContent = document.querySelector('.modal-content');
    
    if (!modalOverlay || !modalHeader || !modalContent) {
        console.error("Modal elementleri bulunamadı");
        return;
    }
    
    // Modal başlığını güncelle
    modalHeader.textContent = "Planlama Dokümanları";
    
    // Doküman listesini oluştur
    let planningDocsHTML = `
        <div class="document-category-header" style="color: #5E35B1">
            <i class="fas fa-tasks"></i> 
            <h3>Proje Planlama Dokümanları</h3>
        </div>
        <div class="documents-list">
    `;
    
    planningDocs.forEach(doc => {
        // Dosya adını al (sadece gösterim için)
        const fileName = doc.path.split('/').pop();
        
        planningDocsHTML += `
            <div class="document-item" data-path="${doc.path}">
                <div class="doc-icon" style="background-color: #5E35B1">
                    <i class="fas fa-file-alt" style="color: white;"></i>
                </div>
                <div class="doc-info">
                    <h4>${doc.title}</h4>
                    <span class="file-path">${fileName}</span>
                </div>
                <div class="doc-action">
                    <button class="btn-view-doc" aria-label="Görüntüle" title="Dökümanı Görüntüle" style="background-color: #5E35B1">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    planningDocsHTML += '</div>';
    
    // Modal içeriğini güncelle
    modalContent.innerHTML = planningDocsHTML;
    
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
    modalOverlay.classList.add('active');
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
    
    // Dosya yoluna göre local dosya kullan
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
            
            // Modal içeriğini güncelle
            modalContent.innerHTML = `<div class="markdown-content">${html}</div>`;
            
            // İçeriğin tamamını görüntülemek için modalı kaydır
            modalContent.scrollTop = 0;
            
            // Kod blokları için syntax highlighting
            if (window.hljs) {
                document.querySelectorAll('.markdown-content pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            }
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