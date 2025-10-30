document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".wrap").forEach((wrap) => {
    wrap.querySelector(".img-wrap").style.opacity = 0;
    wrap.querySelector(".explain-wrap").style.opacity = 0;
  });
  /* ************************* 플로그인 등록 ************************* */
  /* ************************* 플로그인 등록 ************************* */
  gsap.registerPlugin(
    TextPlugin,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother
  );

  /* ************************ ScrollSmoother ************************ */
  /* ************************ ScrollSmoother ************************ */
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
    } catch (e) {}
  }

  // *********************  헤더 스크롤에 따라 숨김   ****************** //
  // *********************  헤더 스크롤에 따라 숨김   ****************** //
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

  // ***************************** 밑으로 **************************** //
  // ***************************** 밑으로 **************************** //
  const dragDownText = document.getElementById("dragDownText");
  if (dragDownText && window.ScrollTrigger) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() > 0) {
          dragDownText.classList.add("hide");
        } else {
          dragDownText.classList.remove("hide");
        }
      },
    });
  }

  // ****************** 사진들 나오는 효과인데 쓸 까 말 까 *************** //
  // ****************** 사진들 나오는 효과인데 쓸 까 말 까 *************** //

  document.querySelectorAll(".wrap").forEach((wrap, index) => {
    const isLeft = wrap.classList.contains("l1");
    let animationComplete = false;
    let isTransitioning = false;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        pin: true,
        start: "top top",
        end: "+=800",
        scrub: 1,
        onEnter: () => {
          const imgWrap = wrap.querySelector(".img-wrap");
          const explainWrap = wrap.querySelector(".explain-wrap");
          gsap.killTweensOf([imgWrap, explainWrap]);
          gsap.set([imgWrap, explainWrap], { clearProps: "all" });
          gsap.set(imgWrap, {
            x: isLeft ? -50 : 50,
            opacity: 0,
            force3D: true,
          });
          gsap.set(explainWrap, {
            y: isLeft ? 100 : -100,
            opacity: 0,
            force3D: true,
          });
          gsap.to(imgWrap, {
            x: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            force3D: true,
          });
          gsap.to(explainWrap, {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.5,
            ease: "power2.out",
            force3D: true,
            onComplete: () => {
              animationComplete = true;
            },
          });
        },
        onLeave: () => {
          const imgWrap = wrap.querySelector(".img-wrap");
          const explainWrap = wrap.querySelector(".explain-wrap");
          gsap.killTweensOf([imgWrap, explainWrap]);
          gsap.to(imgWrap, {
            x: isLeft ? 50 : -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            force3D: true,
            onComplete: () => {
              gsap.set(imgWrap, { clearProps: "all" }); // 완료 후 초기화
            },
          });
          gsap.to(explainWrap, {
            x: isLeft ? -50 : 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            force3D: true,
            onComplete: () => {
              gsap.set(explainWrap, { clearProps: "all" }); // 완료 후 초기화
            },
          });
        },
        onEnterBack: () => {
          const imgWrap = wrap.querySelector(".img-wrap");
          const explainWrap = wrap.querySelector(".explain-wrap");
          gsap.killTweensOf([imgWrap, explainWrap]);
          gsap.set([imgWrap, explainWrap], { clearProps: "all" });
          gsap.set(imgWrap, {
            x: isLeft ? -50 : 50,
            opacity: 0,
            force3D: true,
          });
          gsap.set(explainWrap, {
            x: isLeft ? 50 : -50,
            opacity: 0,
            force3D: true,
          });

          gsap.to(imgWrap, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            force3D: true,
          });

          gsap.to(explainWrap, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
            force3D: true,
            onComplete: () => {
              animationComplete = true;
            },
          });
        },
        onLeaveBack: () => {
          animationComplete = false;
          const imgWrap = wrap.querySelector(".img-wrap");
          const explainWrap = wrap.querySelector(".explain-wrap");
          gsap.killTweensOf([imgWrap, explainWrap]);
          gsap.to(imgWrap, {
            x: isLeft ? -50 : 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            force3D: true,
            onComplete: () => {
              gsap.set(imgWrap, { clearProps: "all" });
            },
          });
          gsap.to(explainWrap, {
            x: isLeft ? 50 : -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            force3D: true,
            onComplete: () => {
              gsap.set(explainWrap, { clearProps: "all" });
            },
          });
        },
        onUpdate: (self) => {
          if (animationComplete && !isTransitioning) {
            if (self.progress >= 0.8 && self.direction === 1) {
              const nextWrap = document.querySelectorAll(".wrap")[index + 1];
              if (nextWrap) {
                isTransitioning = true;
                gsap.to(window, {
                  scrollTo: nextWrap,
                  duration: 0.8,
                  ease: "power2.inOut",
                  onComplete: () => {
                    setTimeout(() => {
                      isTransitioning = false;
                    }, 300);
                  },
                });
              }
            }

            if (self.progress <= 0.2 && self.direction === -1) {
              const prevWrap = document.querySelectorAll(".wrap")[index - 1];
              if (prevWrap) {
                isTransitioning = true;
                gsap.to(window, {
                  scrollTo: prevWrap,
                  duration: 0.8,
                  ease: "power2.inOut",
                  onComplete: () => {
                    setTimeout(() => {
                      isTransitioning = false;
                    }, 300);
                  },
                });
              }
            }
          }
        },
      },
    });
  });

  // **************************** TOP 버튼 기능 ********************* //
  // **************************** TOP 버튼 기능 ********************* //
  const topBtn = document.getElementById("topBtn");

  // 스크롤 시 버튼 표시/숨김
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const scrollPercent = self.progress;
      // 70% 이상 스크롤하면 버튼 표시
      if (scrollPercent > 0.7) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    },
  });

  // TOP 버튼 클릭 시 맨 위로 이동
  topBtn.addEventListener("click", () => {
    if (smoother) {
      // ScrollSmoother를 사용하는 경우
      smoother.scrollTo(0, true, "power2.inOut");
    } else {
      // 일반 스크롤
      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  });
});
