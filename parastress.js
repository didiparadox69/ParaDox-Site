document.addEventListener('DOMContentLoaded', () => {
    // Animation d'apparition au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Effet de mouvement sur la carte d'achat
    const buyCard = document.querySelector('.buy-card');
    document.addEventListener('mousemove', (e) => {
        let x = (window.innerWidth / 2 - e.pageX) / 25;
        let y = (window.innerHeight / 2 - e.pageY) / 25;
        buyCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
});