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

    // Yukarı çıkma butonu işlevselliği
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
            showNotification('Macera Haritası yakında geliyor! Takipte kalın...', 'info');
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

    // Logo görüntüleme efekti
    const footerLogo = document.querySelector('.footer-logo-img');
    if (footerLogo) {
        footerLogo.addEventListener('mouseenter', function() {
            this.classList.add('logo-active');
        });
        
        footerLogo.addEventListener('mouseleave', function() {
            this.classList.remove('logo-active');
        });
        
        // Sayfa açılışında hafif animasyon efekti
        setTimeout(() => {
            footerLogo.classList.add('logo-animate');
            setTimeout(() => {
                footerLogo.classList.remove('logo-animate');
            }, 1500);
        }, 1000);
    }

    // Galeri Modal İşlevselliği
    const galleryModalHTML = `
        <div class="gallery-modal" id="gallery-modal">
            <div class="gallery-modal-content">
                <span class="gallery-modal-close">&times;</span>
                <img src="" alt="" id="gallery-modal-img">
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', galleryModalHTML);
    
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalClose = document.querySelector('.gallery-modal-close');
    
    // Galeri öğelerine tıklama olayları ekle
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            galleryModalImg.src = imgSrc;
            galleryModalImg.alt = imgAlt;
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Büyütme butonuna tıklama
        const viewFullsizeBtn = item.querySelector('.view-fullsize');
        if (viewFullsizeBtn) {
            viewFullsizeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const imgSrc = item.getAttribute('data-image');
                const imgAlt = item.querySelector('img').getAttribute('alt');
                
                galleryModalImg.src = imgSrc;
                galleryModalImg.alt = imgAlt;
                galleryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Modal kapatma olayları
    galleryModalClose.addEventListener('click', closeGalleryModal);
    
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });
    
    // ESC tuşu ile modal kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            closeGalleryModal();
        }
    });
    
    function closeGalleryModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Galeri animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards ${entry.target.dataset.delay || 0}s`;
            }
        });
    }, observerOptions);
    
    // Galeri öğelerine gözlemci ekle ve gecikme ayarla
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.dataset.delay = index * 0.1;
        item.style.opacity = '0';
        galleryObserver.observe(item);
    });
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
            <title>Macera Haritası - Doküman</title>
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
            <h1>Macera Haritası - Doküman</h1>
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
        { title: "Backlog ve Sprint Planı", path: "docs/planlama/backlog.md" },
        { title: "Kullanıcı Hikayeleri", path: "docs/planlama/user-story-örnekleri.md" },
        { title: "Sprint Planı", path: "docs/planlama/sprint-plan.md" }
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
    
    // Geri butonu için modal header'ı güncelle
    updateModalHeader();
    
    // Global değişken olarak planlama kategorisini belirt
    window.currentCategoryKey = 'planlama';
    
    // Geri butonunu gizle (kategorideyken gösterme)
    const backButton = document.querySelector('.modal-back');
    if (backButton) {
        backButton.style.display = 'none';
        
        // Geri butonuna olay dinleyici ekle - ana planlama listesine dönüş
        backButton.addEventListener('click', function() {
            showPlanningDocs();
        });
    }
    
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
                loadMarkdownDocWithBackButton(docPath, docTitle);
            }
        });
        
        // Buton için ayrı olay dinleyici
        const viewButton = item.querySelector('.btn-view-doc');
        viewButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Event'in üst elemanlara yayılımını durdur
            loadMarkdownDocWithBackButton(docPath, docTitle);
        });
    });
    
    // Modalı göster
    modalOverlay.classList.add('active');
}

// Modal header'ını güncelleyerek geri butonunu ekler
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
        
        // Kapatma butonuna olay dinleyici ekle
        const closeButton = modalHeader.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                document.querySelector('.modal-overlay').classList.remove('active');
            });
        }
    }
}

// Markdown dokümanını yükler ve geri butonu işlevselliğini sağlar
function loadMarkdownDocWithBackButton(filePath, title) {
    if (!marked || typeof marked.parse !== 'function') {
        console.error('Marked kütüphanesi düzgün yüklenmedi');
        return;
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Doküman yüklenemedi: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            const html = marked.parse(markdown);
            
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <div class="modal-header">
                    <button class="btn secondary-btn" onclick="showPlanningDocs()" style="margin-right: 10px;">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="markdown-content">
                    ${html}
                </div>
            `;
            
            // Modal kapatma ve geri butonu için event listeners
            document.querySelector('.modal-close').addEventListener('click', closeModal);
            
            // Highlight.js ile kod vurgulama
            if (typeof hljs !== 'undefined') {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
        })
        .catch(error => {
            console.error('Markdown doküman yüklenirken hata:', error);
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <div class="modal-header">
                    <button class="btn secondary-btn" onclick="showPlanningDocs()" style="margin-right: 10px;">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2>Hata</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="error-message">
                    <h3>Doküman yüklenemedi</h3>
                    <p>Üzgünüz, belge yüklenirken bir hata oluştu: ${error.message}</p>
                </div>
            `;
            document.querySelector('.modal-close').addEventListener('click', closeModal);
        });
}

/**
 * Doküman görüntüleme modu - Header
 */
let documentHeader = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Macera Haritası - Doküman</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/markdown-viewer.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body { padding: 20px; max-width: 900px; margin: 0 auto; }
        .doc-header { display: flex; align-items: center; margin-bottom: 20px; }
        .doc-logo { width: 60px; margin-right: 15px; }
        .doc-title { margin: 0; color: #673AB7; }
        .back-link { display: inline-block; margin-top: 30px; color: #673AB7; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="doc-header">
        <img src="docs/kurumsal/logo.png" class="doc-logo" alt="Logo">
        <h1>Macera Haritası - Doküman</h1>
    </div>
`;

// Ana sayfa linkini güncelleyerek galeri bölümünü dahil et
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.querySelector('a[href="#app-gallery"]')) {
        const aboutLink = document.querySelector('a[href="#about"]').parentElement;
        const galleryLink = document.createElement('li');
        galleryLink.innerHTML = '<a href="#app-gallery"><i class="fas fa-images"></i> Galeri</a>';
        
        // About linkinden sonra ekle
        aboutLink.insertAdjacentElement('afterend', galleryLink);
    }
    
    // Navbar smooth scroll güncellemesi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 