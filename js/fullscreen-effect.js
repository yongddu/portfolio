class FullscreenTransition {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "fullscreen-transition";
    document.body.appendChild(this.container);
    this.boxes = [];
    this.createBoxes();
  }

  createBoxes() {
    // 버튼 크기에 맞춰 더 많은 박스 생성 (작은 사각형)
    const cols = 40;
    const rows = 30;
    for (let i = 0; i < cols * rows; i++) {
      const box = document.createElement("div");
      box.className = "transition-box";
      this.container.appendChild(box);
      this.boxes.push(box);
    }
  }

  animate(callback, buttonElement) {
    this.container.style.display = "grid";

    // 버튼의 위치 계산
    let centerCol = 20;
    let centerRow = 15;

    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      centerCol = Math.floor((centerX / window.innerWidth) * 40);
      centerRow = Math.floor((centerY / window.innerHeight) * 30);

      console.log("Button position - Col:", centerCol, "Row:", centerRow);
    }

    const cols = 40;
    const rows = 30;

    // 각 박스의 거리 계산 및 애니메이션
    this.boxes.forEach((box, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      // 중심으로부터의 거리 계산 (맨해튼 거리 사용)
      const distance = Math.abs(col - centerCol) + Math.abs(row - centerRow);

      // 거리에 비례한 지연 시간 (부드러운 물결 효과)
      const delay = distance * 25;

      setTimeout(() => {
        box.classList.add("animate");
      }, delay);
    });

    // 애니메이션이 끝난 후 콜백 실행
    const maxDistance = cols + rows;
    const totalDuration = maxDistance * 25 + 600;

    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }
      // 전환 완료 후 컨테이너 숨기기
      setTimeout(() => {
        this.reset();
      }, 400);
    }, totalDuration);
  }

  reset() {
    this.boxes.forEach((box) => {
      box.classList.remove("animate");
    });
    setTimeout(() => {
      this.container.style.display = "none";
    }, 100);
  }
}

// DOM 로드 후 전역 인스턴스 생성
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.fullscreenTransition = new FullscreenTransition();
    console.log("FullscreenTransition initialized");
  });
} else {
  window.fullscreenTransition = new FullscreenTransition();
  console.log("FullscreenTransition initialized");
}
