document.addEventListener('DOMContentLoaded', function () {
    const videos = [
        'https://www.youtube.com/embed/OJhwtf8Qri8',
        'https://www.youtube.com/embed/vPzrR0vbewo',
        'https://www.youtube.com/embed/aRGVnYZ4RBA'
    ];

    let currentVideoIndex = 0;
    const videoContainer = document.getElementById('currentVideoContainer')?.querySelector('.video-container');
    const prevBtn = document.getElementById('prevVideoBtn');
    const nextBtn = document.getElementById('nextVideoBtn');

    if (!videoContainer || !prevBtn || !nextBtn) {
        console.error('No se encontraron los elementos necesarios en el DOM');
        return;
    }

    function loadVideo(index) {
        videoContainer.innerHTML = `
            <iframe width="100%" height="450" src="${videos[index]}" frameborder="0" allowfullscreen title="Video ${index + 1}" aria-label="Video ${index + 1}"></iframe>
        `;
    }

    prevBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        loadVideo(currentVideoIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(currentVideoIndex);
    });

    loadVideo(currentVideoIndex);

    // Efecto de nieve mejorado
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Usar emoji de copo de nieve
        snowflake.innerHTML = '❄';
        
        // Estilos aleatorios
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        
        document.body.appendChild(snowflake);

        // Eliminar después de la animación
        setTimeout(() => {
            snowflake.remove();
        }, 15000);
    }
    
    // Crear copos solo en diciembre
    const currentMonth = new Date().getMonth(); // 0=enero, 11=diciembre
    if (currentMonth === 11) {
        setInterval(createSnowflake, 300);
    }

    // Efecto de confeti patrio (banderas y estrellas blancas/azules/rojas)
    const coloresEstrella = ['#ffffff', '#0033a0', '#e63946'];

    function createPatriaConfeti() {
        const confeti = document.createElement('div');
        confeti.classList.add('patria-confeti');

        const esBandera = Math.random() < 0.5;
        if (esBandera) {
            confeti.innerHTML = '🇨🇱';
        } else {
            confeti.innerHTML = '★';
            confeti.style.color = coloresEstrella[Math.floor(Math.random() * coloresEstrella.length)];
        }

        confeti.style.left = `${Math.random() * 100}vw`;
        confeti.style.opacity = Math.random() * 0.5 + 0.5;
        confeti.style.fontSize = `${Math.random() * 16 + 16}px`;
        confeti.style.animationDuration = `${Math.random() * 8 + 6}s, ${Math.random() * 2 + 2}s`;

        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 15000);
    }

    // Decoración de Fiestas Patrias solo en septiembre
    if (currentMonth === 8) {
        document.body.classList.add('fiestas-patrias');

        const bunting = document.createElement('div');
        bunting.classList.add('patria-bunting');
        document.body.appendChild(bunting);

        setInterval(createPatriaConfeti, 400);
    }

    // Scroll suave para navegación
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Año dinámico en el footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Reproductor arrastrable
    const player = document.getElementById('radioPlayer');
    if (player && window.innerWidth > 768) {
        let dragging = false, startX, startY, origLeft, origTop;

        player.addEventListener('mousedown', (e) => {
            if (e.target.closest('button, input')) return;
            dragging = true;
            const rect = player.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            origLeft = rect.left;
            origTop  = rect.top;
            player.style.right  = 'auto';
            player.style.bottom = 'auto';
            player.style.left   = origLeft + 'px';
            player.style.top    = origTop  + 'px';
            player.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = Math.max(0, Math.min(window.innerWidth  - player.offsetWidth,  origLeft + dx));
            const newTop  = Math.max(0, Math.min(window.innerHeight - player.offsetHeight, origTop  + dy));
            player.style.left = newLeft + 'px';
            player.style.top  = newTop  + 'px';
        });

        document.addEventListener('mouseup', () => {
            dragging = false;
            player.classList.remove('dragging');
        });
    }

    // Reproductor de radio profesional
    const radioAudio  = document.getElementById('radioAudio');
    const rpPlayBtn   = document.getElementById('rpPlayBtn');
    const rpPlayIcon  = document.getElementById('rpPlayIcon');
    const rpWave      = document.getElementById('rpWave');
    const rpVolume    = document.getElementById('rpVolume');
    const rpVolIcon   = document.getElementById('rpVolIcon');

    if (radioAudio && rpPlayBtn) {
        radioAudio.volume = parseFloat(rpVolume.value);

        rpPlayBtn.addEventListener('click', () => {
            if (radioAudio.paused) {
                radioAudio.play().catch(() => {});
            } else {
                radioAudio.pause();
            }
        });

        radioAudio.addEventListener('play', () => {
            rpPlayIcon.classList.replace('fa-play', 'fa-pause');
            rpWave.classList.remove('paused');
        });

        radioAudio.addEventListener('pause', () => {
            rpPlayIcon.classList.replace('fa-pause', 'fa-play');
            rpWave.classList.add('paused'); // animación lenta cuando pausa
        });

        rpVolume.addEventListener('input', () => {
            radioAudio.volume = parseFloat(rpVolume.value);
            const muted = rpVolume.value == 0;
            rpVolIcon.classList.toggle('fa-volume-mute', muted);
            rpVolIcon.classList.toggle('fa-volume-up', !muted);
        });

        rpVolIcon.addEventListener('click', () => {
            if (radioAudio.volume > 0) {
                radioAudio._prevVol = radioAudio.volume;
                radioAudio.volume = 0;
                rpVolume.value = 0;
                rpVolIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
            } else {
                radioAudio.volume = radioAudio._prevVol || 0.8;
                rpVolume.value = radioAudio.volume;
                rpVolIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
            }
        });
    }
});