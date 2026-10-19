// Menu toggle (mobile)
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item img');
let currentIndex = 0;
let images = [];

if (galleryItems.length) {
    images = Array.from(galleryItems).map(img => img.dataset.full);

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showLightbox();
        });
    });
}

function showLightbox() {
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showLightbox();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showLightbox();
}

if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);
if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Form
const ctaForm = document.getElementById('ctaForm');
const formSuccess = document.getElementById('formSuccess');

if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            cantidad: document.getElementById('cantidad').value,
            mensaje: document.getElementById('mensaje').value
        };
        console.log('Solicitud enviada:', data);
        ctaForm.reset();
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
    });
}

// Header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animacion al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit-card, .material-card, .specs-block, .care-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
