const REGEXP = {
  EMAIL:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  // 패스워드 (영문 소문자 또는 대문자 반드시 포함, 숫자 포함, 특수문자 포함, 8~15자 내외
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}/,
  WHITE_SPACE: /\s/g,
};

export default REGEXP;
