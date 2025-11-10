// 로딩 화면 - 첫 방문에만 표시
window.onload = function () {
  const loadingScreen = document.getElementById("initialLoading");

  if (!loadingScreen) return;

  // 이미 방문한 적이 있는지 확인
  const hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    // 첫 방문인 경우
    loadingScreen.style.display = "flex";

    // 5초 후에 로딩 화면 제거
    setTimeout(function () {
      document.body.removeChild(loadingScreen);
      // 방문 기록 저장
      sessionStorage.setItem("hasVisited", "true");
    }, 5000);
  } else {
    // 이미 방문한 경우 로딩 화면 즉시 제거
    document.body.removeChild(loadingScreen);
  }
};
