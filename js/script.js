// ===============================
// SELECT ELEMENTS
// ===============================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-menu a");

const scrollTopBtn = document.getElementById("scrollTop");

const sections = document.querySelectorAll("section");

// ===============================
// DARK / LIGHT MODE
// ===============================

// Check if user has a saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

// Toggle theme

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


// ===============================
// MOBILE MENU
// ===============================

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navMenu.classList.toggle("active");

});


// ===============================
// CLOSE MENU AFTER CLICK
// ===============================

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    });

});


// ===============================
// SCROLL TO TOP BUTTON
// ===============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollTopBtn.style.display = "flex";

        scrollTopBtn.style.alignItems = "center";

        scrollTopBtn.style.justifyContent = "center";

    } else {

        scrollTopBtn.style.display = "none";

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") ===
            "#" + currentSection

        ) {

            link.classList.add("active");

        }

    });

});


// ===============================
// HEADER SHADOW ON SCROLL
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
    ".section-title, .skills-grid, .projects-grid, .certification-grid, .timeline-container, .about-text, .contact-form"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ==========================================
   TYPING ANIMATION
========================================== */


const typingElement = document.getElementById("typing-text");

const typingWords = [

    "Frontend Web Developer",

    "Cloud Engineer",

    "AWS Certified Cloud Practitioner",

    "AWS Certified Solutions Architect",

    "DevOps Engineer"

];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, letterIndex);

        letterIndex++;

        if (letterIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, letterIndex);

        letterIndex--;

        if (letterIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 45 : 100);

}

typeEffect();


/* ==========================================
   PROJECT FILTERING
========================================== */

const filterButtons =
    document.querySelectorAll(".project-filter button");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        projectCards.forEach((card) => {

            if (

                filter === "all" ||

                card.classList.contains(filter)

            ) {

                card.style.display = "block";

                setTimeout(() => {

                    card.style.opacity = "1";

                    card.style.transform =
                        "scale(1)";

                }, 100);

            }

            else {

                card.style.opacity = "0";

                card.style.transform =
                    "scale(.8)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 250);

            }

        });

    });

});

/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

const contactForm =
document.getElementById("contactForm");

const formMessage =
document.getElementById("formMessage");

const submitBtn =
document.getElementById("submitBtn");


contactForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name =
    contactForm.querySelector(
        'input[type="text"]'
    ).value.trim();

    const email =
    contactForm.querySelector(
        'input[type="email"]'
    ).value.trim();

    const message =
    contactForm.querySelector(
        "textarea"
    ).value.trim();

    formMessage.textContent="";

    formMessage.className="";



    if(name===""){

        formMessage.textContent=
        "Please enter your name.";

        formMessage.classList.add("error");

        return;

    }



    if(email===""){

        formMessage.textContent=
        "Please enter your email.";

        formMessage.classList.add("error");

        return;

    }



    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){

        formMessage.textContent=
        "Please enter a valid email address.";

        formMessage.classList.add("error");

        return;

    }



    if(message.length<10){

        formMessage.textContent=
        "Your message should be at least 10 characters.";

        formMessage.classList.add("error");

        return;

    }



    submitBtn.classList.add("loading");

    submitBtn.textContent="Sending...";



    setTimeout(()=>{

        formMessage.textContent=
        "Thank you! Your message has been received.";

        formMessage.classList.add("success");

        submitBtn.classList.remove("loading");

        submitBtn.textContent=
        "Send Message";

        contactForm.reset();

    },1500);

});