import { styled } from "styled-components";

export const PopUpButton = styled.button`
  border: 0;
  margin-top: 1rem;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  background: #FFF;
  width: 295px;
  height: 92px;
  flex-shrink: 0;
  font-size: 25px;
  /* 선택된 메뉴 블록의 스타일*/
  &:hover{
    background-color: var(--primary-color);
    color: white;
  }
`;

export const PopUpContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-size: 30px;
`;

export const IndentedContainer = styled.div`
  margin-top: 2rem;
  white-space: pre-wrap;
`;

export const TransParentBackGournd = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 46, 207, 0.65);
    z-index: 9999;
    color: white;
`