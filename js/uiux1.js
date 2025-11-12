// uiux1.js - PNG 이미지 스무스 스크롤 전용

console.log("uiux1.js 로드됨");

// DOM이 완전히 로드된 후 실행
window.addEventListener("load", function () {
  console.log("uiux1.js 실행 시작");

  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  /* ************************ ScrollSmoother 초기화 ************************ */
  let smoother = null;
  if (
    ScrollSmoother &&
    document.querySelector("#smooth-wrapper") &&
    document.querySelector("#smooth-content")
  ) {
    try {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
      });
      console.log("ScrollSmoother 초기화 성공");
    } catch (e) {
      console.error("ScrollSmoother 초기화 실패:", e);
    }
  }

  /* ****************** process-img 스무스 스크롤 효과 ****************** */
  const processImg = document.querySelector(".process-img");

  if (processImg) {
    console.log("process-img 찾음:", processImg);

    // 이미지에 부드러운 parallax 효과 적용
    gsap.to(processImg, {
      y: -300,
      ease: "none",
      scrollTrigger: {
        trigger: processImg,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          console.log("스크롤 진행률:", self.progress.toFixed(2));
        },
      },
    });

    console.log("process-img ScrollTrigger 적용 완료");
  } else {
    console.error("process-img를 찾을 수 없습니다!");
  }

  /* ******************** 헤더 스크롤에 따라 숨김/표시 ******************** */
  const header = document.querySelector("#header");
  if (header) {
    let lastScroll = 0;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();

        if (currentScroll > lastScroll && currentScroll > 100) {
          // 아래로 스크롤 & 100px 이상
          header.classList.add("hide");
        } else {
          // 위로 스크롤
          header.classList.remove("hide");
        }

        // 맨 위에 있으면 무조건 표시
        if (currentScroll <= 10) {
          header.classList.remove("hide");
        }

        lastScroll = currentScroll;
      },
    });

    console.log("헤더 스크롤 효과 적용 완료");
  }

  /* **************************** TOP 버튼 기능 ********************* */
  const topBtn = document.getElementById("topBtn");
  if (topBtn) {
    // 스크롤 시 버튼 표시/숨김
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.progress > 0.2) {
          topBtn.classList.add("show");
        } else {
          topBtn.classList.remove("show");
        }
      },
    });

    // TOP 버튼 클릭 이벤트
    topBtn.addEventListener("click", () => {
      if (smoother && smoother.scrollTo) {
        smoother.scrollTo(0, true);
      } else {
        gsap.to(window, {
          scrollTo: { y: 0 },
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });

    console.log("TOP 버튼 기능 적용 완료");
  }

  /* ******************** 스크롤 프로그레스 바 ******************** */
  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const progress = self.progress * 100;
        progressFill.style.width = progress + "%";
      },
    });
    console.log("스크롤 프로그레스 바 적용 완료");
  }

  // ScrollTrigger 새로고침
  ScrollTrigger.refresh();

  console.log("✅ uiux1.js 초기화 완료!");
});
