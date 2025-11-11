// 로딩 화면 - 첫 방문에만 표시
window.onload = function () {
  const loadingScreen = document.getElementById("initialLoading");

  if (!loadingScreen) return;

  // 이미 방문한 적이 있는지 확인 (세션 기반)
  const hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    // 첫 방문인 경우
    console.log("첫 방문 - 로딩 화면 표시");
    loadingScreen.style.display = "flex";

    // 5초 후에 페이드아웃 시작
    setTimeout(function () {
      loadingScreen.classList.add("fade-out");

      // 페이드아웃 애니메이션 완료 후 제거
      setTimeout(function () {
        loadingScreen.style.display = "none";
        // 전시회 인트로 표시 이벤트 발생
        window.dispatchEvent(new Event("loadingComplete"));
        // 방문 기록 저장
        sessionStorage.setItem("hasVisited", "true");
        console.log("로딩 완료 - 인트로 시작");
      }, 800); // 페이드아웃 시간과 동일
    }, 5000);
  } else {
    // 재방문인 경우 - 로딩과 인트로 모두 스킵
    console.log("재방문 - 로딩과 인트로 스킵");
    loadingScreen.style.display = "none";

    // 인트로도 완전히 숨기기
    const exhibitionIntro = document.getElementById("exhibitionIntro");
    if (exhibitionIntro) {
      exhibitionIntro.style.display = "none";
      exhibitionIntro.classList.remove("active");
    }

    // 메인 콘텐츠 즉시 표시
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.documentElement.style.overflow = "auto";

    // 헤더 표시
    const header = document.querySelector("header");
    if (header) {
      header.style.display = "block";
      header.style.opacity = "1";
    }

    // 커서 설정 복원
    document.body.style.cursor = "none";

    // 즉시 메인 페이지로 이동 이벤트 발생
    setTimeout(() => {
      window.dispatchEvent(new Event("skipToMain"));
    }, 100);
  }
};
