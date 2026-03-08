document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. APPARITION AU SCROLL (REVEAL EFFECT) ---
    // Cette fonction surveille chaque section et la fait glisser vers le haut
    // quand elle entre dans le champ de vision.
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Une fois affiché, on arrête de surveiller cet élément
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15, // Se déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px" 
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 2. EFFET MACHINE À ÉCRIRE (FOUNDER NOTE) ---
    const typewriterElement = document.getElementById("typewriter");
    const phrase = typewriterElement.innerText;
    typewriterElement.innerText = ""; // On vide le texte pour l'animer

    let charIndex = 0;
    function playTypewriter() {
        if (charIndex < phrase.length) {
            typewriterElement.innerHTML += phrase.charAt(charIndex);
            charIndex++;
            setTimeout(playTypewriter, 25); // Vitesse de frappe (en ms)
        }
    }

    // On ne lance l'animation que quand l'utilisateur arrive sur la section
    const textObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            playTypewriter();
            textObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.8 });

    textObserver.observe(document.querySelector('.founder-note'));


    // --- 3. EFFET DE LUEUR DYNAMIQUE (MOUSE TRACKING) ---
    // Ajoute une lueur qui suit la souris sur les cartes de produits
    const cards = document.querySelectorAll('.product-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // On injecte les positions dans des variables CSS
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 4. PETIT BONUS : LOG CONSOLE "PRO" ---
    console.log("%c PARADOX SYSTEMS %c Dev Mode Active", 
        "color: black; background: white; font-weight: bold; padding: 2px 5px;", 
        "color: #666;");
});

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const runCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = 30; // Plus c'est bas, plus c'est rapide
        const increment = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => runCounter(el), 30);
        } else {
            el.innerText = target;
        }
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // On lance chaque compteur de la zone
                counters.forEach(counter => runCounter(counter));
                // On arrête d'observer après le premier passage
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    const container = document.querySelector('.stats-container');
    if (container) statsObserver.observe(container);
});