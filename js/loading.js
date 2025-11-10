// 로딩 화면 - 첫 방문에만 표시
window.onload = function () {
  const loadingScreen = document.getElementById("initialLoading");

  if (!loadingScreen) return;

  // 이미 방문한 적이 있는지 확인
  const hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    // 첫 방문인 경우
    loadingScreen.style.display = "flex";

    // 3초 후에 페이드아웃 시작
    setTimeout(function () {
      loadingScreen.classList.add("fade-out");

      // 페이드아웃 애니메이션 완료 후 제거
      setTimeout(function () {
        document.body.removeChild(loadingScreen);
        // 방문 기록 저장
        sessionStorage.setItem("hasVisited", "true");
      }, 800); // 페이드아웃 시간과 동일
    }, 3000);
  } else {
    // 이미 방문한 경우 로딩 화면 즉시 제거
    document.body.removeChild(loadingScreen);
  }
};
