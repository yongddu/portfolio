// ==================== 스크롤 프로그레스 바 ==================== //
function updateScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress-bar");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / documentHeight) * 100;

  if (scrollProgress) {
    scrollProgress.style.width = scrollPercentage + "%";
  }
}

// 스크롤 이벤트 리스너
window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", updateScrollProgress);

// 페이지 로드 효과
window.addEventListener("load", () => {
  const pageLoader = document.getElementById("pageLoader");
  const body = document.body;

  setTimeout(() => {
    pageLoader.classList.add("fade-out");
    body.classList.add("loaded");

    setTimeout(() => {
      pageLoader.style.display = "none";
    }, 200);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(TextPlugin, ScrambleTextPlugin, ScrollTrigger);

  // ==================== 3D 회전 페이지 전환 ==================== //
  const items = document.querySelectorAll(".item");
  const transitionOverlay = document.getElementById("transitionOverlay");

  items.forEach((item) => {
    const link = item.parentElement;
    const href = link.getAttribute("href");

    link.addEventListener("click", (e) => {
      e.preventDefault();

      // 클릭된 아이템의 현재 위치 저장
      const rect = item.getBoundingClientRect();
      item.style.top = `${rect.top}px`;
      item.style.left = `${rect.left}px`;
      item.style.width = `${rect.width}px`;
      item.style.height = `${rect.height}px`;

      // 클릭된 아이템에 회전 애니메이션 추가
      item.classList.add("rotating");
      document.body.classList.add("page-transition");

      // 0.6초 후 오버레이 시작
      setTimeout(() => {
        transitionOverlay.classList.add("active");
      }, 400);

      // 1.2초 후 페이지 이동
      setTimeout(() => {
        window.location.href = href;
      }, 1000);
    });

    // 호버 효과
    item.addEventListener("mouseenter", (e) => {
      const title = item.dataset.title;
      const date = item.dataset.date;
      gsap.to(".hover-title", { scrambleText: title, duration: 0.7 });
      gsap.to(".hover-date", { scrambleText: date, duration: 0.5 });

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      gsap.to(item, {
        duration: 0.1,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.1,
        transformPerspective: 1000,
        ease: "power1.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(".hover-title", { text: "", duration: 0.7 });
      gsap.to(".hover-date", { text: "", duration: 0.5 });

      // 3D 효과 원래대로 복귀
      gsap.to(item, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power2.out",
      });
    });
  });

  // ******************  ScrollSmoother (index02만 해당 요소가 있을 때)  ****************** //
  let smoother = null;
  if (
    window.ScrollSmoother &&
    document.querySelector("#smooth-wrapper") &&
    document.querySelector("#smooth-content")
  ) {
    try {
      gsap.registerPlugin(ScrollSmoother);
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        effects: true,
      });
    } catch (e) {
      // noop
    }
  }

  // ******************  헤더: 스크롤 방향에 따라 숨김/표시 (ScrollTrigger 기반)  ****************** //
  const header = document.querySelector("#header");
  if (header && window.ScrollTrigger) {
    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        if (self.direction === 1) {
          header.classList.add("hide");
        } else {
          header.classList.remove("hide");
        }
        if (self.scroll() <= 10) header.classList.remove("hide");
      },
    });
  }

  // ==================== 랜덤 등장 애니메이션 ==================== //
  function showImagesRandomly() {
    const images = document.querySelectorAll(".item");
    if (images.length === 0) {
      return;
    }
    const shuffledImages = Array.from(images).sort(() => Math.random() - 0.5);
    shuffledImages.forEach((img, index) => {
      const delay = index * (200 + Math.random() * 100);
      setTimeout(() => {
        img.classList.add("animate");
        setTimeout(() => {
          img.classList.remove("animate");
          img.classList.add("show");
        }, 500);
      }, delay);
    });
  }
  setTimeout(() => {
    showImagesRandomly();
  }, 500);

  // ==================== TOP 버튼 기능 ==================== //
  const topBtn = document.getElementById("topBtn");

  // 스크롤 위치에 따라 TOP 버튼 표시/숨김
  function toggleTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  }

  // TOP 버튼 클릭 시 상단으로 스크롤
  topBtn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power2.out",
    });
  });

  // 스크롤 이벤트에 TOP 버튼 토글 함수 추가
  window.addEventListener("scroll", toggleTopButton);

  // 초기 상태 설정
  toggleTopButton();

  // ==================== Nav Underline 이동 효과 (index02) ==================== //
  const navLinks02 = document.querySelectorAll(
    ".top-nav .nav.n01, .top-nav .nav.n02, .top-nav .nav.n03"
  );
  const underline02 = document.getElementById("navUnderline");
  const topNav02 = document.querySelector(".top-nav");

  function moveUnderline02(target) {
    if (!underline02 || !topNav02 || !target) return;
    const navRect = topNav02.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    gsap.to(underline02, {
      left,
      width,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  // 초기 위치는 n02
  const initial02 = document.querySelector(".top-nav .nav.n02");
  moveUnderline02(initial02);

  navLinks02.forEach((link) => {
    link.addEventListener("mouseenter", () => moveUnderline02(link));
    link.addEventListener("focus", () => moveUnderline02(link));
    link.addEventListener("click", () => moveUnderline02(link));
  });
});
