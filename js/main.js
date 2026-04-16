document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Управління хедером при скролі
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (header && window.scrollY > 50) {
            header.classList.add('shadow-2xl');
            // Змінюємо прозорість фону при скролі
            header.classList.replace('bg-dark/80', 'bg-dark/95');
        } else if (header) {
            header.classList.remove('shadow-2xl');
            header.classList.replace('bg-dark/95', 'bg-dark/80');
        }
    });

    // 2. Управління мобільним меню (ДОДАНО)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Закриваємо меню після натискання на посилання
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Анімація появи елементів
    const revealElements = () => {
        const reveals = document.querySelectorAll('.service-card, section h2, #about img, .border-l-2');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 150) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealElements);
    revealElements();

    // 4. Анімовані лічильники
    const counters = document.querySelectorAll('.font-black.text-white');
    const runCounters = () => {
        counters.forEach(counter => {
            const text = counter.innerText;
            if ((text.includes('+') || text.includes('%')) && !counter.dataset.started) {
                const target = parseInt(text);
                let count = 0;
                const speed = 2000 / target;

                const updateCount = () => {
                    if (count < target) {
                        count++;
                        counter.innerText = count + (text.includes('+') ? '+' : '%');
                        setTimeout(updateCount, speed);
                    }
                };
                
                const rect = counter.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    counter.dataset.started = true;
                    updateCount();
                }
            }
        });
    };
    window.addEventListener('scroll', runCounters);
    runCounters();

    // 5. Ефект кліку на посилання
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('mousedown', function() { this.style.transform = "scale(0.95)"; });
        anchor.addEventListener('mouseup', function() { this.style.transform = "scale(1)"; });
    });
});