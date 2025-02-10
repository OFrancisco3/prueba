var swiper = new Swiper(".sw-hugo", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  

/*ANIMACIONES*/
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.animate-item');
  
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); 
          }
      });
  }, {
      threshold: 0.1 // Ajustar como se guste.
  });

  items.forEach(item => observer.observe(item));
});

/*probando*/

/*
const noActivaElement = document.querySelector('.no-activa');
const featureCards = document.querySelectorAll('.feature-card');

noActivaElement.addEventListener('mouseover', () => {
    featureCards.forEach((card, index) => {
        if (index >= featureCards.length - 4) {
            const featureTitle = card.querySelector('.feature-title');
            const featureDescription = card.querySelector('.feature-description');

            // Ocultar con transición
            featureTitle.classList.add('hidden');
            featureDescription.classList.add('hidden');

            // Esperar a que la transición termine antes de cambiar el texto
            setTimeout(() => {
                if (featureTitle) {
                    featureTitle.textContent = `Nuevo Título ${index + 1}`;
                }
                if (featureDescription) {
                    featureDescription.textContent = `Nueva descripción para la característica ${index + 1}.`;
                }

                // Mostrar con transición
                featureTitle.classList.remove('hidden');
                featureDescription.classList.remove('hidden');
            }, 200); // Tiempo de la transición (coincide con el CSS)
        }
    });
});

noActivaElement.addEventListener('mouseout', () => {
    featureCards.forEach((card, index) => {
        if (index >= featureCards.length - 4) {
            const featureTitle = card.querySelector('.feature-title');
            const featureDescription = card.querySelector('.feature-description');

            // Ocultar con transición
            featureTitle.classList.add('hidden');
            featureDescription.classList.add('hidden');

            setTimeout(() => {
                if (featureTitle) {
                    switch (index) {
                        case featureCards.length - 4:
                            featureTitle.textContent = 'Reparación o Reemplazo Rápido:';
                            break;
                        case featureCards.length - 3:
                            featureTitle.textContent = 'Varianza de Voltaje y Descargas:';
                            break;
                        case featureCards.length - 2:
                            featureTitle.textContent = 'Refacciones Nuevas y Mano de Obra Certificada:';
                            break;
                        case featureCards.length - 1:
                            featureTitle.textContent = 'Sin Deducibles:';
                            break;
                    }
                }
                if (featureDescription) {
                    switch (index) {
                        case featureCards.length - 4:
                            featureDescription.textContent = 'Garantizamos reparaciones en 30 días o sustituimos tu producto. Reemplazo ante la 3ra falla diagnosticada.';
                            break;
                        case featureCards.length - 3:
                            featureDescription.textContent = 'Cubrimos fallas por variaciones de voltaje y descargas eléctricas.';
                            break;
                        case featureCards.length - 2:
                            featureDescription.textContent = 'Piezas de alta calidad y técnicos certificados para un servicio impecable.';
                            break;
                        case featureCards.length - 1:
                            featureDescription.textContent = 'Protección completa sin preocupaciones ni gastos extras; ¡Solo beneficios para ti!';
                            break;
                    }
                }

                // Mostrar con transición
                featureTitle.classList.remove('hidden');
                featureDescription.classList.remove('hidden');
            }, 300); // Tiempo de la transición
        }
    });
});
*/

const noActivaElement = document.querySelector('.no-activa');
const featureCards = document.querySelectorAll('.feature-card');
const activeArrow = document.querySelector('.activa span');
const inactiveArrow = document.querySelector('.flecha-no-activa span');

// Configuración inicial
let isAnimating = false;
let hoverTimeout;
const animationDuration = 300; // ms

// Estados iniciales
activeArrow.style.transform = 'rotate(0deg)'; // ↓
inactiveArrow.style.transform = 'rotate(-90deg)'; // →

// Datos originales y temporales
const cardContents = Array.from(featureCards).map((card, index) => ({
  title: card.querySelector('.feature-title')?.textContent,
  description: card.querySelector('.feature-description')?.textContent,
  element: card
}));

// Función única para animaciones
const animateCards = (isHover) => {
  if (isAnimating) return;
  isAnimating = true;

  // Rotación de flechas
  activeArrow.style.transform = isHover ? 'rotate(-90deg)' : 'rotate(0deg)';
  inactiveArrow.style.transform = isHover ? 'rotate(0deg)' : 'rotate(-90deg)';

  // Animación de tarjetas
  featureCards.forEach((card, index) => {
    if (index >= featureCards.length - 4) {
      const title = card.querySelector('.feature-title');
      const description = card.querySelector('.feature-description');
      
      // Fase 1: Ocultar
      title.style.transition = description.style.transition = 'opacity 0.2s ease';
      title.style.opacity = description.style.opacity = '0';

      // Fase 2: Cambiar contenido
      setTimeout(() => {
        if (isHover) {
          title.textContent = `Nuevo Título ${index + 1}`;
          description.textContent = `Nueva descripción ${index + 1}`;
        } else {
          title.textContent = cardContents[index].title;
          description.textContent = cardContents[index].description;
        }

        // Fase 3: Mostrar
        title.style.opacity = description.style.opacity = '1';
      }, 200);
    }
  });

  setTimeout(() => {
    isAnimating = false;
  }, animationDuration);
};

// Eventos con debounce
noActivaElement.addEventListener('mouseenter', () => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => animateCards(true), 50);
});

noActivaElement.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => animateCards(false), 50);
});