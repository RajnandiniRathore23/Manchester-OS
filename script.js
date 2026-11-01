document.addEventListener('DOMContentLoaded', () => {
    const taskbarButtons = document.querySelectorAll('.taskbar-btn');
    const closeButtons = document.querySelectorAll('.close-btn');
    const windows = document.querySelectorAll('.window');
    taskbarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const windowId = btn.getAttribute('data-window');
            const targetWindow = document.getElementById(windowId);
            if (targetWindow) {
                targetWindow.style.display = 'block';
                targetWindow.style.left = '50%';
                targetWindow.style.top = '50%';
                targetWindow.style.transform = 'translate(-50%, -50%)';
                targetWindow.style.zIndex = getMaxZIndex() + 1;
            }
        });
    });
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const windowId = btn.getAttribute('data-window');
            const targetWindow = document.getElementById(windowId);
            if (targetWindow) {
                targetWindow.style.display = 'none';
            }
        });
    });
    const welcomeBtn = document.getElementById('welcome-action-btn');
    const welcomeWindow = document.getElementById('welcome-window');
    if (welcomeBtn && welcomeWindow) {
        welcomeBtn.addEventListener('click', () => {
            welcomeWindow.style.display = 'none';
        });
    }
    windows.forEach(win => {
        win.addEventListener('mousedown', () => {
            win.style.zIndex = getMaxZIndex() + 1;
        });
    });
    function getMaxZIndex() {
        let maxZ = 10;
        windows.forEach(win => {
            let z = window.getComputedStyle(win).zIndex;
            if (!isNaN(z) && z > maxZ) {
                maxZ = parseInt(z);
            }
        });
        return maxZ;
    }
    windows.forEach(win => {
        const header = win.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, initialX, initialY;
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY; 
            let rect = win.getBoundingClientRect();
            win.style.transform = 'none'; 
            initialX = rect.left;
            initialY = rect.top;
            win.style.left = `${initialX}px`;
            win.style.top = `${initialY}px`;
            win.style.zIndex = getMaxZIndex() + 1;
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
            win.style.left = `${initialX + dx}px`;
            win.style.top = `${initialY + dy}px`;
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateString = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
        const timeElement = document.getElementById('live-time');
        const dateElement = document.getElementById('live-date');
        if (timeElement) timeElement.textContent = timeString;
        if (dateElement) dateElement.textContent = dateString;
    }             
    setInterval(updateClock, 1000);
    updateClock();
    async function fetchManCityFixture() {
        const miniBody = document.getElementById('match-mini-body');
        try {
            const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/382/schedule');
            const data = await response.json();
            let targetMatch = null;
            if (data && data.events && data.events.length > 0) {
                const now = new Date().getTime();
                targetMatch = data.events.find(event => {
                    const eventTime = new Date(event.date).getTime();
                    const state = event.competitions[0]?.status?.type?.state;
                    return state === 'in' || eventTime >= now;
                });

                if (!targetMatch) {
                    targetMatch = data.events[data.events.length - 1];
                }
            }
            if (targetMatch && miniBody) {
                const statusType = targetMatch.competitions[0].status.type.description; 
                const competitors = targetMatch.competitions[0].competitors;
                const homeTeam = competitors.find(c => c.homeAway === 'home');
                const awayTeam = competitors.find(c => c.homeAway === 'away');
    
                const homeName = homeTeam.team.shortDisplayName || homeTeam.team.name;
            
                const awayName = awayTeam.team.shortDisplayName || awayTeam.team.name;

                miniBody.innerHTML = `
                    <p class="mini-teams">${homeName} vs ${awayName}</p>
                    <p class="mini-status"><span class="live-badge">${statusType}</span></p>
                `;
            }
        } catch (error) {
            console.error("Error fetching automated schedule:", error);
        }
    }

    fetchManCityFixture();
    setInterval(fetchManCityFixture, 60000);

    
    const galleryPhotos = [
        { url: "", caption: "Etihad Stadium  " },
        { url: "", caption: "Matchday Fans " },
        { url: "", caption: "The Treble Trophies " },
        { url: "", caption: "Matchball & Pitch Warmups " },
        { url: "", caption: "Floodlights & Night " }
    ];

    let currentPhotoIndex = 0;
    const galleryImg = document.getElementById('gallery-img');
    const galleryCaption = document.getElementById('gallery-caption');
    const galleryIndicator = document.getElementById('gallery-indicator');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');

    function updateGallery() {
        if (!galleryImg) return;
        galleryImg.style.opacity = '0.3';
        setTimeout(() => {
            galleryImg.src = galleryPhotos[currentPhotoIndex].url;
            galleryCaption.textContent = galleryPhotos[currentPhotoIndex].caption;
            galleryIndicator.textContent = `${currentPhotoIndex + 1} / ${galleryPhotos.length}`;
            galleryImg.style.opacity = '1';
        }, 150);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
            updateGallery();
        });

        nextBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
            updateGallery();
        });

        updateGallery();
    }
}); 
uuuuuuuuuuuuuuuuupppp