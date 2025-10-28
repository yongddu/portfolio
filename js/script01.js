// 페이지 로드 효과
window.addEventListener("load", () => {
  const pageLoader = document.getElementById("pageLoader");
  const body = document.body;

  setTimeout(() => {
    pageLoader.classList.add("fade-out");
    body.classList.add("loaded");

    setTimeout(() => {
      pageLoader.style.display = "none";
    }, 1500);
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(TextPlugin, ScrambleTextPlugin, ScrollTrigger);

  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const title = item.dataset.title;
      const date = item.dataset.date;
      // GSAP로 애니메이션 적용
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
});
