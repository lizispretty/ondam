
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// 모바일 메뉴 열기 / 닫기
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    menuToggle.textContent = nav.classList.contains("active")
        ? "✕"
        : "☰";
});

// 메뉴를 누르면 모바일 메뉴 닫기
document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// 현재 연도 표시
document.getElementById("year").textContent =
    new Date().getFullYear();

// 예약 문의 버튼
document.getElementById("contactButton").addEventListener("click", () => {
    alert("현재 시연용 웹사이트입니다.\n실제 예약 기능은 추후 연결할 예정입니다.");
});

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
    const dateInput = document.getElementById("reserveDate");

    // 오늘 이전 날짜 선택 방지
    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;

    reservationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const date = dateInput.value;
        const time = document.getElementById("reserveTime").value;
        const people = document.getElementById("reservePeople").value;

        document.getElementById("reservationResult").textContent =
            `${date} ${time}, ${people} 예약 신청 시연이 완료되었습니다.`;

        reservationForm.reset();
        dateInput.min = localToday;
    });
}
