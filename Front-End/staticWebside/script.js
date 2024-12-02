document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.getElementById('rocket');
    const section1 = document.getElementById('section1');

    window.addEventListener('scroll', () => {
        const sectionPosition = section1.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5; // Auslöser-Punkt
        
        if (sectionPosition < screenPosition) {
            rocket.classList.add('fly');
        }
    });
});