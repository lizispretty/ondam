
/* =========================================
   ONDAM - COMPLETE SCRIPT
========================================= */


// 1. 모바일 메뉴

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");

        menuToggle.textContent = nav.classList.contains("active")
            ? "✕"
            : "☰";
    });

    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });
}


// 2. 현재 연도 표시

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 3. 예약 기능

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
    const dateInput = document.getElementById("reserveDate");
    const timeInput = document.getElementById("reserveTime");
    const peopleInput = document.getElementById("reservePeople");
    const result = document.getElementById("reservationResult");

    const getLocalDate = () => {
        const now = new Date();

        return new Date(
            now.getTime() - now.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];
    };

    if (dateInput) {
        dateInput.min = getLocalDate();
    }

    reservationForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!dateInput || !timeInput || !peopleInput || !result) {
            return;
        }

        result.textContent =
            `${dateInput.value} ${timeInput.value}, ${peopleInput.value} 예약 신청 시연이 완료되었습니다.`;

        reservationForm.reset();
        dateInput.min = getLocalDate();
    });
}


// 4. 현재 섹션 메뉴 강조

const sections = document.querySelectorAll(
    "#about, #menu, #space, #reservation, #info"
);

const navLinks = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


// 5. 스크롤 등장 애니메이션

const revealElements = document.querySelectorAll(
    ".about-inner, .menu-card, .space-inner, .reservation-section .section-inner, .info-card"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -20px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}


// 6. 실행 상태 확인

console.log("ONDAM JavaScript loaded successfully.");
console.log("애니메이션 대상 개수:", revealElements.length);
