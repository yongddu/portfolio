document.addEventListener('DOMContentLoaded', ()=>{
     // 데이터 예시 (원하는 이미지 주소와 텍스트로 수정 가능)
  const data = {
    uiux: {
      img: 'https://via.placeholder.com/600x300?text=UIUX+Image',
      desc: 'UIUX 관련 이미지와 설명입니다.'
    },
    textile: {
      img: 'https://via.placeholder.com/600x300?text=TEXTILE+Image',
      desc: 'TEXTILE 관련 이미지와 설명입니다.'
    },
    ceramic: {
      img: 'https://via.placeholder.com/600x300?text=CERAMIC+Image',
      desc: 'CERAMIC 관련 이미지와 설명입니다.'
    },
    '3d': {
      img: 'https://via.placeholder.com/600x300?text=3D+Image',
      desc: '3D 관련 이미지와 설명입니다.'
    },
    dining: {
      img: 'https://via.placeholder.com/600x300?text=DINING+Image',
      desc: 'DINING 관련 이미지와 설명입니다.'
    }
  };

  const menuItems = document.querySelectorAll('.menu div');
  const contentArea = document.getElementById('content-area');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      // active 클래스 토글
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // 데이터 가져오기
      const id = item.getAttribute('data-id');
      const itemData = data[id];

      // 콘텐츠 영역 변경
      contentArea.innerHTML = `
        <img src="${itemData.img}" alt="${id}" />
        <div class="desc">${itemData.desc}</div>
      `;
    });
  });56
})