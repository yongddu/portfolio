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

      // 마우스 진입 즉시 3D 효과 시작
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

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

    // 호버 중 마우스 움직임에 따른 3D 효과
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 마우스 위치 기준으로 회전 각도 계산
      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      // 3D 회전 적용 (즉각 반응)
      gsap.to(item, {
        duration: 0.1,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.1,
        transformPerspective: 800,
        ease: "power1.out",
      });
    });
  });

  // ******************  메인 콘텐츠는 ScrollSmoother 사용 안함 (인트로에서만 사용)  ****************** //
  // ScrollSmoother는 exhibition-intro.js에서 인트로용으로만 사용됩니다

  // ******************  헤더 제어 비활성화 (메인 페이지는 스크롤 없음)  ****************** //
  // ScrollTrigger 헤더 제어 코드 비활성화 (스크롤이 없는 페이지에서는 헤더 항상 표시)
  /*
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
  */

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

  // ==================== Nav Underline 이동 효과 ==================== //
  const navLinks = document.querySelectorAll(
    ".top-nav .nav.n01, .top-nav .nav.n02, .top-nav .nav.n03"
  );
  const underline = document.getElementById("navUnderline");
  const topNav = document.querySelector(".top-nav");

  function moveUnderline(target) {
    if (!underline || !topNav || !target) return;
    const navRect = topNav.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    gsap.to(underline, {
      left: left,
      width: width,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  // 초기 위치: 01 (활성 페이지 추론 가능하면 변경)
  const initial = document.querySelector(".top-nav .nav.n01");
  moveUnderline(initial);

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => moveUnderline(link));
    link.addEventListener("focus", () => moveUnderline(link));
    link.addEventListener("click", (e) => {
      // 페이지 이동 전에 애니메이션; 동일 페이지라면 유지
      moveUnderline(link);
    });
  });
});
