document.addEventListener('DOMContentLoaded', () => {
    // 1. Taskbar App Launching & Closing Windows
    const taskbarButtons = document.querySelectorAll('.taskbar-btn');
    const closeButtons = document.querySelectorAll('.close-btn');
    const windows = document.querySelectorAll('.window');

    // Open/Focus Window on Taskbar Click
    taskbarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const windowId = btn.getAttribute('data-window');
            const targetWindow = document.getElementById(windowId);
            if (targetWindow) {
                targetWindow.style.display = 'block';
                targetWindow.style.zIndex = getMaxZIndex() + 1;
            }
        });
    });

    // Close Window on '×' Click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const windowId = btn.getAttribute('data-window');
            const targetWindow = document.getElementById(windowId);
            if (targetWindow) {
                targetWindow.style.display = 'none';
            }
        });
    });

    // Welcome Modal Action Button ("LET'S GOOO!!")
    const welcomeBtn = document.getElementById('welcome-action-btn');
    const welcomeWindow = document.getElementById('welcome-window');
    if (welcomeBtn && welcomeWindow) {
        welcomeBtn.addEventListener('click', () => {
            welcomeWindow.style.display = 'none';
        });
    }

    // Bring window to front when clicked
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

    // 2. Simple Window Drag-and-Drop Implementation
    windows.forEach(win => {
        const header = win.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, initialX, initialY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            // If window is centered via transform, calculate bounding rect for smooth dragging
            let rect = win.getBoundingClientRect();
            win.style.transform = 'none'; // clear CSS transform on drag start
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
});
