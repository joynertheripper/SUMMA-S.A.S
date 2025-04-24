document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // Ajusta la velocidad del conteo

    const startCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCount(counter), 20); // Actualiza cada 20ms
        } else {
            counter.innerText = target; // Asegura que el número final sea el objetivo
        }
    };

    // Función para inicializar el conteo
    const resetCount = () => {
        counters.forEach(counter => {
            counter.innerText = '0'; // Reinicia el contador a 0
        });
    };

    // Configuración del Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el marcador está visible, inicia el conteo
                counters.forEach(counter => startCount(counter));
            } else {
                // Reinicia el conteo si el marcador ya no es visible
                resetCount();
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando el 50% del elemento es visible

    // Observa la sección que contiene los contadores
    const statisticsSection = document.querySelector('.statistics-section');
    observer.observe(statisticsSection);
});

