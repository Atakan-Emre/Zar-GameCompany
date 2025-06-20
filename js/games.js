// Oyun Kartları JavaScript İşlevselliği
document.addEventListener('DOMContentLoaded', function() {
    
    // Oyun kartlarına tıklama olayları
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');
        const demoBtn = card.querySelector('.demo-btn');
        const gameType = card.getAttribute('data-game');
        
        // Keşfet butonuna tıklama
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateToGame(gameType);
            });
        }
        
        // Demo butonuna tıklama
        if (demoBtn && !demoBtn.classList.contains('disabled')) {
            demoBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showDemo(gameType);
            });
        }
        
        // Kart tıklama
        card.addEventListener('click', function() {
            showGamePreview(gameType);
        });
        
        // Hover efektleri
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hovered');
        });
    });
    
    // Sayfa yüklendiğinde animasyonlar
    animateGameCards();
});

// Oyun sayfasına yönlendirme
function navigateToGame(gameType) {
    const gamePages = {
        'macera-haritasi': 'macera-haritasi.html',
        'math-ar': 'mathar.html'
    };
    
    const targetPage = gamePages[gameType];
    if (targetPage) {
        // Geçiş animasyonu ile sayfa değiştir
        showPageTransition(() => {
            window.location.href = targetPage;
        });
    }
}

// Demo gösterimi
function showDemo(gameType) {
    if (gameType === 'macera-haritasi') {
        // Macera Haritası demo videosu
        showVideoModal('Uygulama_Tanitim.mp4', 'Macera Haritası Demo');
    } else if (gameType === 'math-ar') {
        // MathAR yerel demo videosu
        showVideoModal('MathAR.mp4', 'MathAR Demo');
    }
}

// Oyun önizlemesi göster
function showGamePreview(gameType) {
    const gameInfo = {
        'macera-haritasi': {
            title: 'Macera Haritası',
            description: 'AR teknolojisiyle dünya keşfi ve kültürel öğrenme deneyimi',
            features: [
                '🗺️ 3D AR Dünya Haritası',
                '🎮 İnteraktif Mini Oyunlar',
                '🌍 50+ Ülke Keşfi',
                '👤 Avatar Kişiselleştirme',
                '🏆 Ödül ve Rozet Sistemi',
                '👨‍👩‍👧‍👦 Ebeveyn Kontrolü'
            ],
            technologies: ['Unity 3D', 'ARKit/ARCore', 'C#', 'Firebase'],
            status: 'Tamamlandı',
            color: '#7E57C2'
        },
        'math-ar': {
            title: 'MathAR',
            description: 'AR ile görsel matematik öğrenme platformu',
            features: [
                '📐 3D Geometrik Şekiller',
                '🔢 İnteraktif Sayı Sistemi',
                '📊 Görsel Grafik Analizi',
                '🧮 AR Hesap Makinesi',
                '🎯 Seviyeli Öğrenme',
                '📈 İlerleme Takibi'
            ],
            technologies: ['Unity 3D', 'ARKit/ARCore', 'Machine Learning', 'Analytics'],
            status: 'Tamamlandı',
            color: '#2196F3'
        }
    };
    
    const game = gameInfo[gameType];
    if (game) {
        showGameInfoModal(game);
    }
}

// Oyun bilgi modalı
function showGameInfoModal(gameData) {
    const modalHTML = `
        <div class="game-info-modal" id="game-info-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header" style="border-top: 4px solid ${gameData.color}">
                    <h2>${gameData.title}</h2>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="game-status-badge" style="background: ${gameData.color}">
                        ${gameData.status}
                    </div>
                    <p class="game-modal-description">${gameData.description}</p>
                    
                    <div class="modal-section">
                        <h3>🎯 Özellikler</h3>
                        <ul class="features-list">
                            ${gameData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3>🛠️ Teknolojiler</h3>
                        <div class="tech-badges">
                            ${gameData.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn primary-btn" onclick="navigateToGame('${gameData.title.toLowerCase().replace(' ', '-')}')" style="background: ${gameData.color}">
                            <i class="fas fa-arrow-right"></i> Detayları Gör
                        </button>
                        <button class="btn secondary-btn" onclick="closeGameInfoModal()">
                            <i class="fas fa-times"></i> Kapat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('game-info-modal');
    modal.classList.add('active');
    
    // Modal kapatma olayları
    modal.querySelector('.modal-close').addEventListener('click', closeGameInfoModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeGameInfoModal);
    
    // ESC tuşu ile kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeGameInfoModal();
    });
}

// Oyun info modalını kapat
function closeGameInfoModal() {
    const modal = document.getElementById('game-info-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Video modal göster
function showVideoModal(videoSrc, title) {
    const modalHTML = `
        <div class="video-modal" id="video-modal">
            <div class="modal-overlay"></div>
            <div class="video-modal-content">
                <div class="video-header">
                    <h3>${title}</h3>
                    <span class="modal-close" title="Kapat">&times;</span>
                </div>
                <div class="video-container">
                    <video controls>
                        <source src="${videoSrc}" type="video/mp4">
                        Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="video-close-btn" onclick="closeVideoModal()">
                        <i class="fas fa-times"></i> Videoyu Kapat
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('video-modal');
    modal.classList.add('active');
    
    // Modal kapatma olayları
    modal.querySelector('.modal-close').addEventListener('click', closeVideoModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeVideoModal);
    
    // ESC tuşu ile kapatma
    document.addEventListener('keydown', handleVideoModalKeyPress);
}

// Video modal ESC tuşu yönetimi
function handleVideoModalKeyPress(e) {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
}

// Video modalını kapat
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0; // Videoyu başa sar
        }
        
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
        
        // ESC tuşu dinleyicisini kaldır
        document.removeEventListener('keydown', handleVideoModalKeyPress);
    }
}

// Sayfa geçiş animasyonu
function showPageTransition(callback) {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-content">
            <div class="spinner"></div>
            <p>Oyun sayfasına yönlendiriliyorsunuz...</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('active');
        setTimeout(callback, 500);
    }, 100);
}

// Oyun kartları animasyonu
function animateGameCards() {
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Notification sistemi
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Otomatik kapatma
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
    
    // Manuel kapatma
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// CSS stilleri dinamik olarak ekle
const gameModalStyles = `
<style>
/* Oyun Info Modal */
.game-info-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.game-info-modal.active {
    opacity: 1;
    visibility: visible;
}

.game-info-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
}

.game-info-modal .modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.game-info-modal .modal-header {
    padding: 25px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.game-info-modal .modal-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.8rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 5px;
}

.game-info-modal .modal-body {
    padding: 25px;
}

.game-status-badge {
    display: inline-block;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.game-modal-description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
}

.modal-section {
    margin-bottom: 30px;
}

.modal-section h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #333;
}

.features-list {
    list-style: none;
    padding: 0;
}

.features-list li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 1rem;
    color: #555;
}

.tech-badges {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tech-badge {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.9rem;
    color: #495057;
}

.modal-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}

.modal-actions .btn {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Video Modal */
.video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.video-modal.active {
    opacity: 1;
    visibility: visible;
}

.video-modal-content {
    background: white;
    border-radius: 15px;
    max-width: 800px;
    width: 90%;
    position: relative;
}

.video-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.video-container video {
    width: 100%;
    height: auto;
    border-radius: 0 0 15px 15px;
}

/* Page Transition */
.page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.page-transition-overlay.active {
    opacity: 1;
    visibility: visible;
}

.transition-content {
    text-align: center;
    color: white;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

/* Notification */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    padding: 15px 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1001;
}

.notification.show {
    transform: translateX(0);
}

.notification.info {
    border-left: 4px solid #2196F3;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
}

@media (max-width: 768px) {
    .game-info-modal .modal-content {
        width: 95%;
        margin: 20px;
    }
    
    .modal-actions {
        flex-direction: column;
    }
    
    .video-modal-content {
        width: 95%;
        margin: 20px;
    }
}
</style>
`;

// Stilleri head'e ekle
document.head.insertAdjacentHTML('beforeend', gameModalStyles); 