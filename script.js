document.addEventListener('DOMContentLoaded', () => {
    const taskbarButtons = document.querySelectorAll('.taskbar-btn'),
    closeButtons = document.querySelectorAll('.close-btn'),
    windows = document.querySelectorAll('.window');
    taskbarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const windowId = btn.getAttribute('data-window'),
             tWin = document.getElementById(windowId);
            if (tWin) {
                tWin.style.display = 'block';
                tWin.style.left = '50%';
                tWin.style.top = '60px';
tWin.style.transform = 'translateX(-50%)';
                tWin.style.zIndex = getMaxZIndex() + 1;
            }
        })
    })
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const windowId = btn.getAttribute('data-window');
            const tWin = document.getElementById(windowId);
            if (tWin) {
                tWin.style.display = 'none';
            }
        })
    })
    const welcomeBtn = document.getElementById('welcome-action-btn');
    const welcomeWin = document.getElementById('welcome-window');
    if (welcomeBtn && welcomeWin) {
        welcomeBtn.addEventListener('click',()=>{
            welcomeWin.style.display='none';
        })
    }
    windows.forEach(win => {
        win.addEventListener('mousedown', () => {
            win.style.zIndex = getMaxZIndex() + 1;
        })
    })
    function getMaxZIndex() {
        let maxZ = 10;
        windows.forEach(win => {
            const z = parseInt(window.getComputedStyle(win).zIndex, 10);
            if (!isNaN(z) && z > maxZ) maxZ = z;    
        })
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
        win.style.left = `${Math.max(0, initialX + dx)}px`;
win.style.top = `${Math.max(0, initialY + dy)}px`;
            win.style.zIndex = getMaxZIndex() + 1;
            e.preventDefault();
        })
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
           win.style.left = `${Math.max(0, initialX + dx)}px`;
win.style.top = `${Math.max(0, initialY + dy)}px`;
        })
        document.addEventListener('mouseup', () => {
            isDragging = false;
        })
    })
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

        function updateCountdown() {
        const el = document.getElementById('countdown');
        if (!el) return;
        const now = Date.now();
        let next = null;
        document.querySelectorAll('.fixture-item').forEach(item => {
            const t = new Date(item.getAttribute('data-match-date')).getTime();
            if (t > now && (!next || t < next.time)) next = { time: t, item };
        });
        if (!next) {
            el.textContent = 'No upcoming matches';
            return;
        }
        const diff = next.time - now;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `${next.item.querySelector('strong').textContent} in ${d}d ${h}h ${m}m ${s}s`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
})
