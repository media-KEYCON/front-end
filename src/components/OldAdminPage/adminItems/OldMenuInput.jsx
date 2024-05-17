// MenuInput.js

import React from "react";
import styled from "styled-components";

const MenuInputContainer = styled.div`
  /* 메뉴 박스, 메뉴 삭제버튼 담는 박스 */
  position: relative;
  margin: 3px 5px;
`;

const MenuInputTextBox = styled.input`
  /* 메뉴명 적혀있을 박스 */
  background-color: #fff;
  margin-left: 5.3rem;

  padding: 5px 20px;

  border: none;
  display: inline;
`;

const MenuNameClearButton = styled.button`
  /* 메뉴삭제버튼 */
  position: absolute;
  margin-top: 0.1rem;

  margin-left: -30px;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const OldMenuInput = ({ value, onChange, onClear }) => {
  return (
    <MenuInputContainer>
      <MenuInputTextBox
        type="text"
        placeholder="메뉴 입력"
        value={value}
        onChange={onChange}
        contentEditable
      />
      <MenuNameClearButton onClick={onClear}>❌</MenuNameClearButton>
    </MenuInputContainer>
  );
};

export default OldMenuInput;
