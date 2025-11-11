// 로딩 화면 - 첫 방문에만 표시
window.onload = function () {
  const loadingScreen = document.getElementById("initialLoading");

  if (!loadingScreen) return;

  // 이미 방문한 적이 있는지 확인
  const hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    // 첫 방문인 경우
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
      }, 800); // 페이드아웃 시간과 동일
    }, 5000);
  } else {
    // 이미 방문한 경우 - 로딩과 인트로 모두 스킵
    loadingScreen.style.display = "none";
    const exhibitionIntro = document.getElementById("exhibitionIntro");
    if (exhibitionIntro) {
      exhibitionIntro.style.display = "none";
    }
    // 메인 콘텐츠 바로 표시
    document.body.style.overflow = "auto";
  }
};
