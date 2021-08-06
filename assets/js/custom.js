// MENU SHOW V HIDDEN
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close');

// SHOW
toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show'); 
});

//HIDDEN
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
});
// REMOVE MENU
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));
// SCROLL SECITON ACTIVE LINK
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', scrollActive);
function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*='+ sectionId +']').classList.add('active');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active'); 
        }
    });
}
// INIT AOS
AOS.init();

// Modal JS

const modal__container = document.querySelector('#modal__container')
const open__modal = document.querySelector('.open__modal')
const close = document.querySelector('.close')

open__modal.addEventListener('click', () => {
    modal__container.classList.add('show')
})

close.addEventListener('click', () => {
    modal__container.classList.remove('show')
})

// Carouselnya
const projectsSlide = document.querySelector('.projects__slide')
const projectsImages = document.querySelectorAll('.projects__slide img')

// Tombol prev dan next
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')

// Buat counter untuk slides nya
let counter = 1
const size = projectsImages[0].clientWidth
projectsSlide.style.transform = 'translateX('+ (-size * counter) +'px)'

prevBtn.addEventListener('click', function () {
    projectsSlide.style.transition = "transform 0.5s ease-in"
    counter--
    projectsSlide.style.transform = 'translateX('+ (-size * counter) +'px)'
})
nextBtn.addEventListener('click', function () {
    // console.log(-size)
    // alert('TES')
    projectsSlide.style.transition = "transform 0.5s ease-in"
    counter++
    projectsSlide.style.transform = 'translateX('+ (-size * counter) +'px)'
})
projectsSlide.addEventListener('transitionend', function () {
    console.log(projectsImages[counter].id)
    if (projectsImages[counter].id === "firstSlide") {
        prevBtn.style.display = 'none'
    } else {
        prevBtn.style.display = 'block'
    }
    if (projectsImages[counter].id === "lastSlide") {
        nextBtn.style.display = 'none'
    } else {
        nextBtn.style.display = 'block'
    }
})