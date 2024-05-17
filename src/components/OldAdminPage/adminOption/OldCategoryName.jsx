import { useState } from "react";
import { styled } from "styled-components";
import OldCheckbox from "./OldCheckbox";

const CategoryNameBox = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 5px;
  background-color: var(--secondary-color);

  input {
    padding-left: 30px; // checkArea width랑 동일하게
    flex: 1; // 필수 체크박스 외의 모든 공간 차지
    border: none;
    outline: none;
    background: none;
    text-align: center;
    font-weight: bold;
    font-size: var(--font-medium);
  }
`;

const CheckArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px; // 위 input padding-left랑 동일하게
`;

const OldCategoryName = ({ isChecked, handleCheckbox }) => {
  const [optionCatName, setOptionCatName] = useState("");

  return (
    <CategoryNameBox>
      <input
        type="text"
        placeholder="옵션 카테고리명 입력"
        value={optionCatName}
        onChange={(e) => setOptionCatName(e.target.value)}
      />
      <CheckArea>
        <OldCheckbox checked={isChecked} onChange={handleCheckbox} id="cb1" />
        <label htmlFor="cb1"></label>
        <div style={{ fontSize: "9px", marginTop: "2px" }}>필수</div>
      </CheckArea>
    </CategoryNameBox>
  );
};

export default OldCategoryName;
