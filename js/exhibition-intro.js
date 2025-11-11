// exhibition-intro.js - 전시회 인트로 애니메이션

document.addEventListener("DOMContentLoaded", () => {
  const exhibitionIntro = document.getElementById("exhibitionIntro");
  const introEnterBtn = document.getElementById("introEnterBtn");
  const introSections = document.querySelectorAll(".intro-section");

  console.log("Exhibition Intro 로드됨");

  // 로딩이 완료되면 인트로 표시
  window.addEventListener("loadingComplete", () => {
    console.log("로딩 완료 - 인트로 표시");
    showExhibitionIntro();
  });

  // 인트로 표시 함수
  function showExhibitionIntro() {
    exhibitionIntro.classList.add("active");
    console.log("인트로 활성화");

    // 커스텀 커서는 유지하되 body cursor는 none으로
    document.body.style.cursor = "none";
    const blackCircle = document.querySelector(".black-circle");
    const ghost = document.querySelector(".ghost");
    const hippo = document.querySelector("#hippo");
    if (blackCircle) blackCircle.style.display = "block";
    if (ghost) ghost.style.display = "block";
    if (hippo) hippo.style.display = "block";

    // 첫 번째 섹션 바로 표시
    setTimeout(() => {
      if (introSections[0]) {
        introSections[0].classList.add("visible");
      }
    }, 100);

    // 스크롤 이벤트로 섹션 표시
    setupScrollReveal();
  }

  // 스크롤 시 섹션 나타나기
  function setupScrollReveal() {
    const observerOptions = {
      root: exhibitionIntro,
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    introSections.forEach((section) => {
      observer.observe(section);
    });
  }

  // ENTER 버튼 클릭 이벤트
  if (introEnterBtn) {
    introEnterBtn.addEventListener("click", () => {
      console.log("ENTER 버튼 클릭");
      enterExhibition();
    });

    // 스페이스바로도 입장 가능 (마지막 섹션에서만)
    exhibitionIntro.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        const scrollPosition = exhibitionIntro.scrollTop;
        const scrollHeight = exhibitionIntro.scrollHeight;
        const clientHeight = exhibitionIntro.clientHeight;

        // 거의 끝까지 스크롤했을 때만
        if (scrollPosition + clientHeight >= scrollHeight - 100) {
          e.preventDefault();
          console.log("스페이스바 입력");
          enterExhibition();
        }
      }
    });
  }

  // 전시회 입장 애니메이션
  function enterExhibition() {
    // 버튼 비활성화
    introEnterBtn.style.pointerEvents = "none";

    // 커튼 효과
    const isLeft = Math.random() > 0.5;
    exhibitionIntro.classList.add(isLeft ? "curtain-left" : "curtain-right");
    console.log("커튼 효과:", isLeft ? "왼쪽" : "오른쪽");

    // 1.5초 후 인트로 제거
    setTimeout(() => {
      exhibitionIntro.style.display = "none";

      // 메인 콘텐츠 스크롤 활성화 (커스텀 커서는 계속 유지)
      document.body.style.overflow = "auto";

      console.log("인트로 종료 - 메인 사이트");
    }, 1500);
  }

  // 인트로가 활성화되어 있는 동안 body 스크롤 비활성화
  if (exhibitionIntro) {
    document.body.style.overflow = "hidden";
  }
});
