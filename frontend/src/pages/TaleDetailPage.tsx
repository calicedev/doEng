import React from 'react'

export default function TaleDetailPage() {
  return <div>TaleDetail</div>
}

const exData = {
  id: 1,
  title: '기여운 강아지',
  backgroundImage:
    'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDZfMTE3/MDAxNjA0NjIzMDcyMTIx.dnBY_69oDFP8FcsQRrUEN-ndhP6LeSO9XC-1jaXATi4g._cIMEdFaQO5rIwq6R_hqSdSXM1CGmDsIl4QGDPcPvWYg.PNG.skyzzang011/2.png?type=w800',
  score: 5.2,
  price: 1500000,
  purchased: true,
  myReview: {
    id: 1,
    memberId: 'Okieee',
    score: 4,
    content: '정말 재밌는 체고의 동화채깁니다',
  },
  reviewList: [
    {
      id: 2,
      memberId: 'calice',
      score: 3,
      content: '오와 너무 잼ㅆ어ㅛ 실화인가요?',
    },
    {
      id: 3,
      memberId: 'user12',
      score: 4,
      content: '내안에 흐겸룡이 ㅇ루부짖느다',
    },
  ],
}
