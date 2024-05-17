import React from "react";
import styled from "styled-components";

const PriceInputContainer = styled.div`
  /* 가격 박스, 가격 삭제버튼 담는 박스 */
  position: relative;
`;

const PriceInputTextBox = styled.input`
  /* 가격 적혀있을 박스 */
  background-color: #fff;
  margin-left: 2rem;

  padding: 5px 20px;

  word-break: break-all;
  border: none;
  z-index: 8000;
`;

const PriceNameClearButton = styled.button`
  /* 가격 삭제버튼 */
  position: absolute;
  margin-top: 0.1rem;
  margin-left: -33px;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const OldPriceInput = ({ value, onChange, onClear }) => {
  return (
    <PriceInputContainer>
      <PriceInputTextBox
        type="text"
        placeholder="가격 입력"
        value={value}
        onChange={onChange}
        contentEditable
      />
      <PriceNameClearButton onClick={onClear}>❌</PriceNameClearButton>
    </PriceInputContainer>
  );
};

export default OldPriceInput;
