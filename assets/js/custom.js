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
// Fetch data ke file json dulu hhe ;)
async function fetchProject() {

    const worksContainer = document.querySelector('.works__container')
    const modalContainer = document.querySelector('#modal__container')
    const openModal = document.getElementsByClassName('open__modal')
    const modalTitle = document.querySelector('.modal-title')
    const technologyTitle = document.querySelector('.technology-name')
    const closeModal = document.querySelector('.close')

    await fetch('projects.json').then(res => res.json()).then(data => {
        // console.log(data)
        let newRow = ''
        data.data.forEach((element, index) => {
            console.log(element)
            newRow += `
            <div class="works__img" data-aos="fade-in" data-aos-delay="800" data-aos-duration="800">
                <img src="https://cdn1-production-images-kly.akamaized.net/GVgUU_SxlV0i_IEMUSoZQGJTI4U=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2735401/original/083839100_1550814009-HL.jpg" alt="">

                <div class="works__data open__modal" data-project="${element.project_name}" data-technology="${element.technology}">
                    <a href="#" class="works__link"><i class="bx bx-link-alt"></i></a>
                    <span class="works__title">${element.project_name}</span>
                </div>
            </div>
            `
        })
        worksContainer.innerHTML = newRow
    })

    // Modal JS
    // Tampilkan di modal
    for (let i = 0; i < openModal.length; i++) {
        openModal[i].addEventListener('click', () => {
            // Event untuk menampilkan modal
            modalContainer.classList.add('show')
            // Buat variable
            let projectName = openModal[i].dataset.project
            let technologyName = openModal[i].dataset.technology
            // Tampilkan
            modalTitle.innerHTML = projectName
            technologyTitle.innerHTML = technologyName
        })
    }
    closeModal.addEventListener('click', () => {
        modalContainer.classList.remove('show')
    })
}
fetchProject()