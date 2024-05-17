// 나중에 다 개별 컴포넌트로 쪼개기.. 지금 넘 복잡

import { useState } from "react";
import { styled } from "styled-components";
import OldCategoryName from "./OldCategoryName";
import { OldAddOptionButton } from "./OldButtonCSS";
import { FaPlus, FaXmark } from "react-icons/fa6";

const CategoryBox = styled.div`
  margin: 6px 17px 20px 17px; // 상 우 하 좌
`;

const CategoryContents = styled.div`
  // background-color: darkgray;
  padding: 10px 0;
  display: grid;
  gap: 5px;
`;

const EachOption = styled.div`
  // each 옵션 이름 & 가격 row
  display: grid;
  gap: 15px;
  grid-template-columns: 4fr 3fr 20px;

  .fixed {
    background: var(--primary-color);
    color: white;
  }

  div {
    // 옵션이름 칸 그 자체
    border-radius: 4px;
    padding: 3px 0;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      border: none;
      outline: none;
      background: none;
      text-align: center;
      margin: 0;
    }
  }
`;

export default function OldCategoryData() {
  const [optionName, setOptionName] = useState("");
  const [optionPrice, SetOptionPrice] = useState("");
  const [isChecked, setIsChecked] = useState(false); // '필수' 체크 관리
  const [options, setOptions] = useState([]);

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleAddOption = () => {
    const newOption = {
      optionName: optionName,
      optionPrice: optionPrice,
    };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setOptionName("");
    SetOptionPrice("");
  };

  const handleDeleteOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  // 옵션 제대로 입력되고 있는지 확인
  // useEffect(() => {
  //   options.forEach((option, index) => {
  //     console.log(`Option ${index} - optionName: ${option.optionName}`);
  //   });
  // }, [options]);

  return (
    <CategoryBox>
      <OldCategoryName isChecked={isChecked} handleCheckbox={handleCheckbox} />
      <CategoryContents>
        <EachOption className="fixed">
          <div className="fixed">옵션 이름</div>
          <div className="fixed">가격</div>
        </EachOption>
        {options.map((option, index) => (
          <EachOption key={index}>
            <div>
              <input
                type="text"
                placeholder="옵션명 입력"
                value={option.optionName}
                onChange={(e) =>
                  setOptions((prevOptions) =>
                    prevOptions.map((opt, i) =>
                      i === index ? { ...opt, optionName: e.target.value } : opt
                    )
                  )
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="가격 입력"
                value={option.optionPrice}
                onChange={(e) =>
                  setOptions((prevOptions) =>
                    prevOptions.map((opt, i) =>
                      i === index
                        ? { ...opt, optionPrice: e.target.value }
                        : opt
                    )
                  )
                }
              />
            </div>
            <div
              onClick={() => handleDeleteOption(index)}
              style={{ cursor: "pointer" }}
            >
              <FaXmark style={{ color: "#515151" }} />
            </div>
          </EachOption>
        ))}
        <OldAddOptionButton onClick={handleAddOption}>
          <FaPlus style={{ color: "#515151" }} />
        </OldAddOptionButton>
      </CategoryContents>
    </CategoryBox>
  );
}
