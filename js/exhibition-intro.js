// exhibition-intro.js - 전시회 인트로 애니메이션

document.addEventListener("DOMContentLoaded", () => {
  const exhibitionIntro = document.getElementById("exhibitionIntro");
  const introEnterBtn = document.getElementById("introEnterBtn");
  const introSections = document.querySelectorAll(".intro-section");
  let introSmoother = null;

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

    // 헤더는 건드리지 않음! 인트로 z-index가 더 높아서 자동으로 숨겨짐

    // 인트로에서는 body 스크롤 활성화
    document.body.style.position = "static";
    document.body.style.overflow = "hidden"; // body는 숨기고 인트로만 스크롤
    document.documentElement.style.overflow = "hidden";

    // 인트로용 ScrollSmoother 초기화
    initIntroScrollSmoother();

    // 커스텀 커서는 유지하되 body cursor는 none으로
    document.body.style.cursor = "none";
    const blackCircle = document.querySelector(".black-circle");
    const ghost = document.querySelector(".ghost");
    const hippo = document.querySelector("#hippo");
    if (blackCircle) blackCircle.style.display = "block";
    if (ghost) ghost.style.display = "block";
    if (hippo) hippo.style.display = "block";

    // 첫 번째 섹션 바로 표시 및 애니메이션
    setTimeout(() => {
      if (introSections[0]) {
        introSections[0].classList.add("visible");
        // 첫 번째 섹션 내용도 페이드인
        setTimeout(() => {
          introSections[0].classList.add("animate-in");
          console.log("첫 번째 섹션 내용 페이드인 시작");
        }, 200);
      }
    }, 100);

    // 스크롤 이벤트로 섹션 표시
    setupScrollReveal();
  }

  // 인트로용 ScrollSmoother 초기화
  function initIntroScrollSmoother() {
    console.log("인트로 ScrollSmoother 활성화 시도");

    // ScrollSmoother 로드 확인 후 초기화
    setTimeout(() => {
      if (window.ScrollSmoother && window.gsap && exhibitionIntro) {
        try {
          gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

          // 기존 ScrollSmoother 인스턴스가 있으면 제거
          if (introSmoother) {
            introSmoother.kill();
          }

          // 인트로 컨테이너를 ScrollSmoother로 감싸기
          const introScrollContainer = exhibitionIntro.querySelector(
            ".intro-scroll-container"
          );
          if (introScrollContainer) {
            introSmoother = ScrollSmoother.create({
              wrapper: exhibitionIntro,
              content: introScrollContainer,
              smooth: 2.5, // 매우 부드러운 스크롤
              effects: true,
              smoothTouch: 0.3, // 터치도 부드럽게
              normalizeScroll: true,
              ignoreMobileResize: true,
            });

            console.log("✅ 인트로 ScrollSmoother 초기화 완료!");

            // 섹션별 스크롤 스냅 설정
            initSectionSnap();
          } else {
            console.error("❌ intro-scroll-container를 찾을 수 없음");
          }
        } catch (e) {
          console.error("❌ 인트로 ScrollSmoother 초기화 실패:", e);
        }
      } else {
        console.error("❌ ScrollSmoother 또는 GSAP가 로드되지 않음");
      }
    }, 100); // 100ms 지연 후 실행
  }

  // 섹션별 스크롤 스냅 구현 (커스텀 Y값 설정)
  function initSectionSnap() {
    // 각 섹션의 Y 위치를 직접 설정 (원하는 대로 조정 가능)
    const sectionPositions = [
      0, // 섹션 1: 맨 위
      window.innerHeight, // 섹션 2: 1화면 아래
      window.innerHeight * 2, // 섹션 3: 2화면 아래
      window.innerHeight * 3, // 섹션 4: 3화면 아래
    ];

    let currentSection = 0;
    let isScrolling = false;

    // 프로그레스 바 요소들
    const progressFill = document.getElementById("progressFill");
    const sectionDots = document.querySelectorAll(".section-dot");

    // 프로그레스 바 업데이트 함수
    function updateProgressBar(sectionIndex) {
      const progress = (sectionIndex / (sectionPositions.length - 1)) * 100;

      if (progressFill) {
        progressFill.style.height = `${progress}%`;
      }

      // 섹션 도트 업데이트
      sectionDots.forEach((dot, index) => {
        if (index <= sectionIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });

      console.log(
        `프로그레스 바 업데이트: ${progress}% (섹션 ${sectionIndex + 1})`
      );
    }

    // 섹션 도트 클릭 이벤트
    sectionDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!isScrolling) {
          scrollToSection(index);
        }
      });
    });

    function scrollToSection(index) {
      if (index < 0 || index >= sectionPositions.length || isScrolling) return;

      // 기존 애니메이션 강제 중단
      gsap.killTweensOf(introSmoother);

      // 이전 섹션의 애니메이션 클래스 제거
      const sections = document.querySelectorAll(".intro-section");
      sections.forEach((section) => {
        section.classList.remove("animate-in");
      });

      isScrolling = true;
      currentSection = index;

      const targetY = sectionPositions[index];

      // 프로그레스 바 업데이트
      updateProgressBar(index);

      if (introSmoother) {
        // ScrollSmoother를 사용해서 특정 Y 위치로 이동
        gsap.to(introSmoother, {
          duration: 1.0, // 더 빠르게 설정
          scrollTop: targetY,
          ease: "power2.out", // 더 반응성 좋은 이징
          onComplete: () => {
            isScrolling = false; // 딜레이 제거

            // 도달한 섹션에 페이드인 애니메이션 적용
            const currentSectionElement = sections[currentSection];
            if (currentSectionElement) {
              setTimeout(() => {
                currentSectionElement.classList.add("animate-in");
                console.log(`섹션 ${index + 1} 내용 페이드인 시작`);
              }, 100);
            }
          },
        });
      }

      console.log(`섹션 ${index + 1}로 이동 (Y: ${targetY})`);
    }

    // 휠 이벤트 리스너 (개선된 반응성)
    let lastWheelTime = 0;

    function handleWheel(e) {
      const now = Date.now();

      // 너무 빠른 연속 스크롤 방지 (300ms 간격)
      if (now - lastWheelTime < 300 || isScrolling) {
        e.preventDefault();
        return false;
      }

      e.preventDefault();
      lastWheelTime = now;

      if (e.deltaY > 0) {
        // 아래로 스크롤
        scrollToSection(currentSection + 1);
      } else {
        // 위로 스크롤
        scrollToSection(currentSection - 1);
      }

      return false;
    }

    exhibitionIntro.addEventListener("wheel", handleWheel, { passive: false });

    // 키보드 이벤트 (위/아래 화살표)
    let lastKeyTime = 0;

    document.addEventListener("keydown", (e) => {
      if (!exhibitionIntro.classList.contains("active")) return;

      const now = Date.now();

      // 너무 빠른 연속 키 입력 방지 (300ms 간격)
      if (now - lastKeyTime < 300 || isScrolling) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        lastKeyTime = now;
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        lastKeyTime = now;
        scrollToSection(currentSection - 1);
      }
    });

    // 특정 섹션으로 직접 이동하는 함수 (외부에서 호출 가능)
    window.goToSection = function (index) {
      scrollToSection(index);
    };

    // 커스텀 Y 위치로 이동하는 함수 (외부에서 호출 가능)
    window.goToPosition = function (yPosition) {
      if (isScrolling) return;

      isScrolling = true;

      if (introSmoother) {
        gsap.to(introSmoother, {
          duration: 1.2,
          scrollTop: yPosition,
          ease: "power2.inOut",
          onComplete: () => {
            isScrolling = false;
          },
        });
      }

      console.log(`커스텀 Y 위치로 이동: ${yPosition}`);
    };

    // 초기 섹션으로 스크롤 및 프로그레스 바 설정
    setTimeout(() => {
      scrollToSection(0);
      // 첫 번째 섹션 도트를 활성화
      updateProgressBar(0);
    }, 500);
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

    // ScrollSmoother 제거
    if (introSmoother) {
      introSmoother.kill();
      introSmoother = null;
      console.log("인트로 ScrollSmoother 제거됨");
    }

    // 커튼 효과
    const isLeft = Math.random() > 0.5;
    exhibitionIntro.classList.add(isLeft ? "curtain-left" : "curtain-right");
    console.log("커튼 효과:", isLeft ? "왼쪽" : "오른쪽");

    // 1.5초 후 인트로 제거
    setTimeout(() => {
      exhibitionIntro.style.display = "none";

      // 헤더 완전히 정상화 (hide 클래스 제거)
      const header = document.getElementById("header");
      if (header) {
        header.classList.remove("hide");
        console.log("헤더 정상화 완료 - hide 클래스 제거됨");
      }

      // 메인 콘텐츠는 스크롤 없음 (이미지만 표시)
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      console.log("인트로 종료 - 메인 사이트 (헤더 자동 복구됨)");
    }, 1500);
  }

  // 초기에는 body 스크롤 비활성화 (로딩 중)
  if (exhibitionIntro) {
    document.body.style.position = "fixed";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // 헤더는 초기에 그대로 두되, 인트로 중에만 숨김
  }
});
