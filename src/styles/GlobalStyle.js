/*
 root color랑 font size는 아직 확정은 아니지만 그냥 임시로 넣어놨어요!!
 이 파일은 수정 전/후에 꼭 함께 의논하기~!~!
 */

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{ 
    --primary-color: #002ecf;   /* background-color: var(--primary-color); 이런식으로 사용*/
    --secondary-color: #d1dbff;  /*계속 주문하기 버튼 색*/
    --third-color: #f2f2f2;
    --white: #ffffff  /* 사실 white는 그냥 white로 쓰는게 더...ㅎ */

    --font-regular: 1rem;
    --font-big: 1.3rem;
    --font-small: 0.8rem;
}
html {
  background-color: darkgreen;
  @media (orientation: landscape) {
    margin: 0 20vw;
  }
  @media (orientation: portrait) {
    margin: 0 1px;
  }
  overflow: hidden;
}



/* 이 밑은 CSS reset 관련 코드 */ 
body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  background-color: white;
  min-width: fit-content; // 중간에 추가함
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
    box-sizing: border_box;
}
a{
    text-decoration: none;
    color: inherit;
}
`;

export default GlobalStyle;
