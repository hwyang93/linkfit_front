const FILTER = {
  REPLY_OR_NOT: [
    {label: '답변 대기중', value: ''},
    {label: '답변 수락', value: ''},
    {label: '답변 거절', value: ''},
    {label: '제안 마감', value: ''},
  ],
  PERIOD: [
    {label: '일주일', value: ''},
    {label: '1개월', value: ''},
    {label: '2개월', value: ''},
    {label: '3개월 이상', value: ''},
  ],
  STATUS: [
    {label: '지원 완료', value: ''},
    {label: '지원 취소', value: ''},
    {label: '열람', value: ''},
    {label: '합격', value: ''},
    {label: '불합격', value: ''},
  ],
  PROGRESSION: [
    {label: '진행중', value: ''},
    {label: '마감', value: ''},
  ],
};

export default FILTER;
