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
    item.addEventListener("mouseenter", () => {
      const title = item.dataset.title;
      const date = item.dataset.date;
      gsap.to(".hover-title", { scrambleText: title, duration: 0.7 });
      gsap.to(".hover-date", { scrambleText: date, duration: 0.5 });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(".hover-title", { text: "", duration: 0.7 });
      gsap.to(".hover-date", { text: "", duration: 0.5 });
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
});
