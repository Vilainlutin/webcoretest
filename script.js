/* ═══════════════════════════════════════════════════════════════════════════
   LA MAISON VIDE - WEIRDCORE / DREAMCORE / OLD WEB
   JavaScript principal
   ═══════════════════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────────────────
// CURSEUR PERSONNALISÉ
// ───────────────────────────────────────────────────────────────────────────

const customCursor = document.querySelector('.custom-cursor');

if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    // Effet au clic
    document.addEventListener('mousedown', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Effet hover sur les liens
    document.querySelectorAll('a, button, .house-element, .garden-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(2)';
            customCursor.style.mixBlendMode = 'difference';
        });
        el.addEventListener('mouseleave', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursor.style.mixBlendMode = 'screen';
        });
    });
}

// ───────────────────────────────────────────────────────────────────────────
// COMPTEUR DE VISITEURS (simulation nostalgique)
// ───────────────────────────────────────────────────────────────────────────

const visitorCounter = document.getElementById('counter');

if (visitorCounter) {
    // Récupérer ou initialiser le compteur depuis localStorage
    let visits = localStorage.getItem('visitorCount');
    
    if (!visits) {
        // Nombre aléatoire initial pour l'effet rétro
        visits = Math.floor(Math.random() * 900) + 100;
    }
    
    // Incrémenter à chaque visite
    visits = parseInt(visits) + 1;
    localStorage.setItem('visitorCount', visits);
    
    // Afficher avec des zéros devant
    visitorCounter.textContent = visits.toString().padStart(6, '0');
    
    // Effet de "chargement" du compteur
    const targetCount = visits;
    let currentCount = 0;
    const increment = Math.ceil(targetCount / 20);
    
    const animateCounter = () => {
        if (currentCount < targetCount) {
            currentCount = Math.min(currentCount + increment, targetCount);
            visitorCounter.textContent = currentCount.toString().padStart(6, '0');
            setTimeout(animateCounter, 50);
        }
    };
    
    // Démarrer l'animation après un délai
    setTimeout(animateCounter, 1000);
}

// ───────────────────────────────────────────────────────────────────────────
// EFFET DE PARALLAXE LÉGER
// ───────────────────────────────────────────────────────────────────────────

const parallaxElements = document.querySelectorAll('.garden-item, .floating-text, .cloud');

let ticking = false;

function updateParallax() {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.02 + (index % 5) * 0.01;
        const yPos = scrollY * speed;
        el.style.transform = `translateY(${yPos}px) ${el.style.transform.replace(/translateY\([^)]*\)/g, '')}`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ───────────────────────────────────────────────────────────────────────────
// EFFET DE MOUVEMENT AU SURVOL DE LA MAISON
// ───────────────────────────────────────────────────────────────────────────

const house = document.querySelector('.house');

if (house) {
    house.addEventListener('mousemove', (e) => {
        const rect = house.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 5;
        const rotateY = (x / rect.width) * -5;
        
        house.style.transform = `
            translateY(${Math.sin(Date.now() / 1000) * 10}px) 
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    });
    
    house.addEventListener('mouseleave', () => {
        house.style.transform = '';
    });
}

// ───────────────────────────────────────────────────────────────────────────
// SONS AMBIANTS (optionnel - décommentez pour activer)
// ───────────────────────────────────────────────────────────────────────────

/*
const hoverSound = new Audio('hover.mp3'); // Ajoutez votre propre son
hoverSound.volume = 0.1;

document.querySelectorAll('.house-element').forEach(el => {
    el.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    });
});
*/

// ───────────────────────────────────────────────────────────────────────────
// EFFET GLITCH ALÉATOIRE
// ───────────────────────────────────────────────────────────────────────────

function triggerGlitch() {
    const body = document.body;
    
    // Ajouter un effet de glitch temporaire
    body.style.animation = 'none';
    body.offsetHeight; // Force reflow
    body.style.animation = 'glitch-screen 0.3s ease';
    
    // Créer le keyframe dynamiquement si nécessaire
    if (!document.getElementById('glitch-keyframes')) {
        const style = document.createElement('style');
        style.id = 'glitch-keyframes';
        style.textContent = `
            @keyframes glitch-screen {
                0%, 100% { filter: none; }
                10% { filter: hue-rotate(90deg); }
                20% { filter: invert(0.1); }
                30% { filter: saturate(2); }
                40% { filter: hue-rotate(-90deg); }
                50% { filter: none; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        body.style.animation = '';
    }, 300);
}

// Déclencher un glitch aléatoire de temps en temps
setInterval(() => {
    if (Math.random() < 0.1) { // 10% de chance toutes les 30 secondes
        triggerGlitch();
    }
}, 30000);

// ───────────────────────────────────────────────────────────────────────────
// EFFET DE CHARGEMENT DE PAGE
// ───────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Ajouter une classe pour indiquer que la page est chargée
    document.body.classList.add('loaded');
    
    // Animation d'entrée pour les éléments
    const animatedElements = document.querySelectorAll('.garden-item, .house-element, .dream-entry, .gallery-frame');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + index * 50);
    });
});

// ───────────────────────────────────────────────────────────────────────────
// FORMULAIRE DE CONTACT (simulation)
// ───────────────────────────────────────────────────────────────────────────

const contactForm = document.querySelector('.retro-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('.retro-button');
        const buttonText = button.querySelector('.button-text');
        const buttonLoading = button.querySelector('.button-loading');
        
        // Animation de chargement
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline';
        button.disabled = true;
        
        // Simuler l'envoi
        setTimeout(() => {
            buttonText.textContent = '✓ envoyé !';
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
            
            // Message de confirmation weirdcore
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                padding: 40px;
                border-radius: 10px;
                text-align: center;
                font-family: 'VT323', monospace;
                font-size: 1.5rem;
                z-index: 10000;
                box-shadow: 0 0 50px rgba(200, 180, 220, 0.5);
                animation: fadeInScale 0.5s ease;
            `;
            message.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 20px;">✉ ✧ ✉</div>
                <p>ton message voyage<br>dans le vide numérique...</p>
                <p style="font-size: 0.9rem; color: #8a9aaa; margin-top: 20px;">
                    (quelqu'un le recevra peut-être)
                </p>
            `;
            document.body.appendChild(message);
            
            // Style d'animation
            const animStyle = document.createElement('style');
            animStyle.textContent = `
                @keyframes fadeInScale {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(animStyle);
            
            // Fermer après 3 secondes
            setTimeout(() => {
                message.style.animation = 'fadeInScale 0.3s ease reverse';
                setTimeout(() => {
                    message.remove();
                    contactForm.reset();
                    buttonText.textContent = '► envoyer';
                    button.disabled = false;
                }, 300);
            }, 3000);
            
        }, 2000);
    });
}

// ───────────────────────────────────────────────────────────────────────────
// EASTER EGG - KONAMI CODE
// ───────────────────────────────────────────────────────────────────────────

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Easter egg activé !
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Effet spécial weirdcore
    document.body.style.animation = 'rainbow-bg 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Message secret
    const secret = document.createElement('div');
    secret.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Press Start 2P', cursive;
        font-size: 1rem;
        color: #fff;
        text-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff;
        z-index: 10000;
        animation: glitch-text 0.5s steps(2) infinite;
    `;
    secret.textContent = '★ YOU FOUND THE SECRET ★';
    document.body.appendChild(secret);
    
    // Annuler après 5 secondes
    setTimeout(() => {
        document.body.style.animation = '';
        secret.remove();
    }, 5000);
}

// ───────────────────────────────────────────────────────────────────────────
// EFFET "NEIGE" VHS (optionnel)
// ───────────────────────────────────────────────────────────────────────────

function createVHSNoise() {
    const noise = document.querySelector('.vhs-noise');
    if (!noise) return;
    
    // Variation aléatoire de l'opacité du bruit
    setInterval(() => {
        noise.style.opacity = (0.01 + Math.random() * 0.03).toString();
    }, 100);
}

createVHSNoise();

// ───────────────────────────────────────────────────────────────────────────
// PRÉCHARGEMENT DES IMAGES (optionnel)
// ───────────────────────────────────────────────────────────────────────────

function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Ajoute ici les URLs de tes GIFs pour les précharger
// preloadImages([
//     'ton-gif-1.gif',
//     'ton-gif-2.gif',
// ]);

// ───────────────────────────────────────────────────────────────────────────
// INITIALISATION
// ───────────────────────────────────────────────────────────────────────────

console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   ✧ la maison vide ✧                     ║
║                                           ║
║   bienvenue dans cet espace liminaire     ║
║   quelque part entre rêve et mémoire      ║
║                                           ║
║   ~ weirdcore / dreamcore / old web ~     ║
║                                           ║
╚═══════════════════════════════════════════╝
`);
