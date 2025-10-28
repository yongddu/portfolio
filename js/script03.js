document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const header = document.querySelector("#header");
  let lastScrollY = 0;
  let smoother = null;

  function initScrollSmoother() {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (typeof ScrollSmoother !== "undefined" && wrapper && content) {
      try {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.1,
          effects: true,
        });
        try {
          window.__smoother = smoother;
        } catch (e) {}
        console.log("✅ ScrollSmoother 성공!");
      } catch (e) {
        console.log("❌ ScrollSmoother 실패:", e);
        if (wrapper) {
          wrapper.style.height = "auto";
          wrapper.style.overflow = "visible";
        }
      }
    } else {
      console.log(
        "⚠️ ScrollSmoother 로드되지 않음 - 네이티브 스크롤로 대체합니다."
      );
      if (wrapper) {
        wrapper.style.height = "auto";
        wrapper.style.overflow = "visible";
      }
    }
  }

  window.addEventListener("load", initScrollSmoother);

  let ticking = false;

  function updateHeader() {
    const scrollY = window.pageYOffset;

    if (scrollY > lastScrollY && scrollY > 100) {
      header.classList.add("hide");
    } else if (scrollY < lastScrollY || scrollY <= 100) {
      header.classList.remove("hide");
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  if (header) {
    window.addEventListener("scroll", onScroll);
    console.log("✅ 헤더 효과 설정 완료!");
  }

  const projectData = {
    UIUX: [
      {
        image: "./img/2-10.jpg",
        title: "UIUX Project 1",
        link: "./index03.html",
      },
      {
        image: "./img/2-11.jpg",
        title: "UIUX Project 2",
        link: "./index03.html",
      },
      {
        image: "./img/2-10.jpg",
        title: "UIUX Project 3",
        link: "./index03.html",
      },
    ],
    BANNER: [
      {
        image: "./img/2-10.jpg",
        title: "Banner Design 1",
        link: "./index03.html",
      },
      {
        image: "./img/2-10.jpg",
        title: "Banner Design 2",
        link: "./index03.html",
      },
      {
        image: "./img/2-10.jpg",
        title: "Banner Design 3",
        link: "./index03.html",
      },
    ],
    TEXTILE: [
      {
        image: "./img/2-1.jpg",
        title: "Textile Design 1",
        link: "./index03.html",
      },
      {
        image: "./img/2-5.jpg",
        title: "Textile Design 2",
        link: "./index03.html",
      },
      {
        image: "./img/2-8.jpg",
        title: "Textile Design 3",
        link: "./index03.html",
      },
      {
        image: "./img/2-9.jpg",
        title: "Textile Design 3",
        link: "./index03.html",
      },
    ],
    CERAMIC: [
      {
        image: "./img/2-2.jpg",
        title: "Ceramic Art 1",
        link: "./index03.html",
      },
      {
        image: "./img/2-6.jpg",
        title: "Ceramic Art 2",
        link: "./index03.html",
      },
      {
        image: "./img/2-6.jpg",
        title: "Ceramic Art 3",
        link: "./index03.html",
      },
    ],
    "3D": [
      { image: "./img/2-4.jpg", title: "3D Design 1", link: "./index03.html" },
      { image: "./img/2-4.jpg", title: "3D Design 2", link: "./index03.html" },
      { image: "./img/2-4.jpg", title: "3D Design 3", link: "./index03.html" },
    ],
    DINING: [
      {
        image: "./img/2-6.jpg",
        title: "Dining Project 1",
        link: "./index03.html",
      },
      {
        image: "./img/2-7.jpg",
        title: "Dining Project 2",
        link: "./index03.html",
      },
      {
        image: "./img/2-8.jpg",
        title: "Dining Project 3",
        link: "./index03.html",
      },
    ],
  };

  const categoryMenu = document.querySelector(".category-menu");
  const categoryButtons = document.querySelectorAll(".cg-btn");
  const projectsGrid = document.getElementById("projectGrid");

  // 부드럽게 맨 위로 스크롤하는 유틸리티
  function smoothScrollToTop(duration = 700, callback) {
    const smoothInstance = window.__smoother || smoother;

    if (smoothInstance && typeof smoothInstance.scrollTo === "function") {
      try {
        // 가능한 ScrollSmoother API를 사용해 스무스하게 이동 시도
        smoothInstance.scrollTo(0, { duration: duration / 1000 });
        setTimeout(() => {
          if (typeof callback === "function") callback();
        }, duration + 20);
        return;
      } catch (e) {
        // 실패시 폴백으로 아래 애니메이션 사용
      }
    }

    const start = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (start === 0) {
      if (typeof callback === "function") callback();
      return;
    }

    const startTime = performance.now();
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const y = Math.round(start * (1 - eased));
      window.scrollTo(0, y);
      if (t < 1) requestAnimationFrame(step);
      else if (typeof callback === "function") callback();
    }

    requestAnimationFrame(step);
  }

  function showProjects(category) {
    categoryMenu.classList.add("active");
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    const clickedButton = document.querySelector(
      `[data-category="${category}"]`
    );
    clickedButton.classList.add("active");
    // 우선 다 비워.
    projectsGrid.innerHTML = "";
    // 선택한거 작품보이게.
    const projects = projectData[category];
    projects.forEach((project, index) => {
      const projectElement = document.createElement("a");
      projectElement.className = "project-item";
      projectElement.innerHTML = `
               <a href="${project.link}">
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">


        </div>
    </a>

            `;

      projectsGrid.appendChild(projectElement);

      setTimeout(() => {
        projectElement.classList.add("show");
      }, index * 100);
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      // 부드럽게 스크롤한 뒤에 프로젝트를 로드
      smoothScrollToTop(700, () => showProjects(category));
    });
  });
});
