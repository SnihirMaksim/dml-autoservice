document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Управління хедером при скролі
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.querySelector('div > div').classList.add('py-2', 'bg-card/95');
            header.querySelector('div > div').classList.remove('py-4', 'bg-card/80');
            header.classList.add('shadow-2xl');
        } else {
            header.querySelector('div > div').classList.add('py-4', 'bg-card/80');
            header.querySelector('div > div').classList.remove('py-2', 'bg-card/95');
            header.classList.remove('shadow-2xl');
        }
    });

    // 2. Анімація появи елементів (Reveal on Scroll)
    const revealElements = () => {
        const reveals = document.querySelectorAll('.service-card, section h2, #about img, .border-l-2');
        
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Додаємо клас reveal всім потрібним елементам
    document.querySelectorAll('.service-card, section h2, #about img, .border-l-2').forEach(el => {
        el.classList.add('reveal');
    });

    window.addEventListener('scroll', revealElements);
    revealElements(); // Запуск при першому завантаженні

    // 3. Анімовані лічильники (наприклад, для досвіду "15+")
    const counters = document.querySelectorAll('.font-black.text-white');
    const runCounters = () => {
        counters.forEach(counter => {
            const text = counter.innerText;
            if (text.includes('+') || text.includes('%')) {
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
                
                // Запускаємо, коли елемент у полі зору
                const rect = counter.getBoundingClientRect();
                if (rect.top < window.innerHeight && !counter.dataset.started) {
                    counter.dataset.started = true;
                    updateCount();
                }
            }
        });
    };

    window.addEventListener('scroll', runCounters);
    runCounters();

    // 4. Логіка для кнопок (ефект кліку)
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('mousedown', function() {
            this.style.transform = "scale(0.95)";
        });
        anchor.addEventListener('mouseup', function() {
            this.style.transform = "scale(1)";
        });
    });
});