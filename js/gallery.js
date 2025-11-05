document.addEventListener("DOMContentLoaded", () => {
  (function ($) {
    var s,
      spanizeLetters = {
        settings: {
          letters: $(".js-spanize"),
        },
        init: function () {
          s = this.settings;
          this.bindEvents();
        },
        bindEvents: function () {
          s.letters.html(function (i, el) {
            //spanizeLetters.joinChars();
            var spanizer = $.trim(el).split("");
            return "<span>" + spanizer.join("</span><span>") + "</span>";
          });
        },
      };
    spanizeLetters.init();
  })(jQuery);

  // 전체화면 갤러리 기능
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const fullscreenGallery = document.getElementById("fullscreenGallery");
  const closeGallery = document.getElementById("closeGallery");

  // 2.5초 후에 버튼 천천히 나타내기
  setTimeout(function () {
    if (fullscreenBtn) {
      fullscreenBtn.classList.add("show");
    }
  }, 750);

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", function (e) {
      requestFullscreenAndOpenGallery(e.currentTarget);
    });
  }

  if (closeGallery) {
    closeGallery.addEventListener("click", function () {
      // 전체화면 해제 후 index.html로 이동
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      // index.html로 이동
      window.location.href = "index.html";
    });
  }

  // ESC 키로 갤러리 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && fullscreenGallery.classList.contains("active")) {
      closeGalleryModal();
    }
  });

  // 전체화면 요청 및 갤러리 열기
  function requestFullscreenAndOpenGallery(buttonElement) {
    console.log("전체화면 요청 및 갤러리 열기"); // 디버깅용

    // 전환 효과 시작
    if (window.fullscreenTransition) {
      fullscreenTransition.animate(() => {
        // 전환 효과가 끝나면 전체화면 요청 및 갤러리 열기
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
          elem
            .requestFullscreen()
            .then(() => {
              openGalleryModal();
            })
            .catch((err) => {
              console.log("전체화면 실패, 갤러리만 열기:", err);
              openGalleryModal();
            });
        } else if (elem.webkitRequestFullscreen) {
          // Safari
          elem.webkitRequestFullscreen();
          setTimeout(openGalleryModal, 100);
        } else if (elem.mozRequestFullScreen) {
          // Firefox
          elem.mozRequestFullScreen();
          setTimeout(openGalleryModal, 100);
        } else if (elem.msRequestFullscreen) {
          // IE/Edge
          elem.msRequestFullscreen();
          setTimeout(openGalleryModal, 100);
        } else {
          // 전체화면 지원하지 않으면 갤러리만 열기
          openGalleryModal();
        }
      }, buttonElement);
    } else {
      // fullscreenTransition이 없으면 바로 실행
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem
          .requestFullscreen()
          .then(() => {
            openGalleryModal();
          })
          .catch((err) => {
            console.log("전체화면 실패, 갤러리만 열기:", err);
            openGalleryModal();
          });
      } else {
        openGalleryModal();
      }
    }
  }

  // 갤러리 모달 열기
  function openGalleryModal() {
    console.log("갤러리 모달 열기"); // 디버깅용
    fullscreenGallery.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 방지

    // 약간의 지연 후 opacity를 1로 변경하여 부드럽게 페이드인
    setTimeout(() => {
      fullscreenGallery.classList.add("active");
    }, 150);
  }

  // 갤러리 모달 닫기 및 전체화면 해제
  function closeGalleryModal() {
    console.log("갤러리 모달 닫기"); // 디버깅용
    fullscreenGallery.classList.remove("active");
    document.body.style.overflow = ""; // 스크롤 복원

    // 전체화면도 해제
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  // 갤러리 배경 클릭시 닫기
  fullscreenGallery.addEventListener("click", function (e) {
    if (e.target === fullscreenGallery) {
      closeGalleryModal();
    }
  });

  // 전체화면 상태 변경 감지
  const fullscreenEvents = [
    "fullscreenchange",
    "webkitfullscreenchange",
    "mozfullscreenchange",
    "MSFullscreenChange",
  ];

  fullscreenEvents.forEach((eventName) => {
    document.addEventListener(eventName, function () {
      // 전체화면이 해제되면 갤러리도 닫기
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        if (fullscreenGallery.classList.contains("active")) {
          fullscreenGallery.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });
});
