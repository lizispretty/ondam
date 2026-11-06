
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
