
// HTML 요소 가져오기
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// 모바일 메뉴
if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");

        menuToggle.textContent = nav.classList.contains("active")
            ? "✕"
            : "☰";
    });

    // 메뉴를 누르면 닫기
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });
}

// 현재 연도 표시
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// 예약 기능
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
    const dateInput = document.getElementById("reserveDate");
    const timeInput = document.getElementById("reserveTime");
    const peopleInput = document.getElementById("reservePeople");
    const result = document.getElementById("reservationResult");

    // 오늘 이전 날짜 선택 방지
    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    if (dateInput) {
        dateInput.min = localToday;
    }

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!dateInput || !timeInput || !peopleInput || !result) {
            return;
        }

        const date = dateInput.value;
        const time = timeInput.value;
        const people = peopleInput.value;

        result.textContent =
            `${date} ${time}, ${people} 예약 신청 시연이 완료되었습니다.`;

        reservationForm.reset();
        dateInput.min = localToday;
    });
}

// 현재 화면의 섹션에 맞춰 메뉴 강조하기

const sections = document.querySelectorAll(
    "#about, #menu, #space, #reservation, #info"
);

const navLinks = document.querySelectorAll(".nav a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
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

sections.forEach((section) => {
    sectionObserver.observe(section);
});

// 스크롤 등장 애니메이션

const revealElements = document.querySelectorAll(
    ".about-inner, .menu-card, .space-inner, .reservation-section .section-inner, .info-card"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
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
