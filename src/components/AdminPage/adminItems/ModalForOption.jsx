import React, { useState } from "react";
import axios from "axios";
import {
  PopupBox,
  ModalTitle,
  CloseButton,
  Input,
  InputButton,
  Box,
  InputTitle,
  TitlePlusInput,
  CheckboxLabel,
} from "./AdminModalCSS";

//옵션 추가 로직=============================================================
export const AddOptionModal = ({ onClose, menusId, onAddOption }) => {
  const [isRequired, setIsRequired] = useState(false);
  const [optionGroup, setOptionGroup] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState("");

  const handleRequiredChange = (e) => {
    setIsRequired(e.target.checked);
  };

  const handleOptionGroupChange = (e) => {
    setOptionGroup(e.target.value);
  };

  const handleOptionNameChange = (e) => {
    setOptionName(e.target.value);
  };

  const handleOptionPriceChange = (e) => {
    setOptionPrice(e.target.value);
  };

  const handleAddOption = async () => {
    try {
      //const response = await axios.post(
      await axios.post(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menuoptions/${menusId}`,
        {
          menuOptionsCategory: optionGroup,
          menuOptionsContents: optionName,
          menuOptionsPrice: optionPrice,
          mandatory: isRequired,
        }
      );
      // console.log(response);
      // console.log(`${optionGroup}, ${optionName}, ${optionPrice} 추가 성공`);
      onClose();
      onAddOption();
    } catch (error) {
      console.error("옵션 추가 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>옵션명/가격을 입력해주세요.</ModalTitle>
      <Box style={{flexWrap:"wrap", }}>
        <TitlePlusInput>
          <InputTitle>종류</InputTitle>
          <Input
            type="text"
            placeholder="옵션 종류"
            value={optionGroup}
            onChange={handleOptionGroupChange}
          />
        </TitlePlusInput>
        <TitlePlusInput>
          <InputTitle>옵션명</InputTitle>
          <Input
            type="text"
            placeholder="옵션명"
            value={optionName}
            onChange={handleOptionNameChange}
          />
        </TitlePlusInput>
        <TitlePlusInput>
          <InputTitle>옵션 가격</InputTitle>
          <Input
            type="number"
            placeholder="옵션 가격"
            value={optionPrice}
            onChange={handleOptionPriceChange}
          />
        </TitlePlusInput>
      </Box>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={isRequired}
          onChange={handleRequiredChange}
        />
        필수
      </CheckboxLabel>
      <InputButton onClick={handleAddOption}>입력 완료</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

//옵션 수정 로직================================================================
export const EditOptionModal = ({
  selectedOptionId,
  selectedOptionData,
  onClose,
  onEditOption,
}) => {
  const [inputIsRequired, setInputIsRequired] = useState(
    selectedOptionData.mandatory
  );
  const [inputOptionGroup, setInputOptionGroup] = useState(
    selectedOptionData.menuOptionsCategory
  );
  const [inputOptionName, setInputOptionName] = useState(
    selectedOptionData.menuOptionsContents
  );
  const [inputOptionPrice, setInputOptionPrice] = useState(
    selectedOptionData.menuOptionsPrice
  );

  const handleRequiredChange = (e) => {
    setInputIsRequired(e.target.checked);
  };

  const handleOptionGroupChange = (e) => {
    setInputOptionGroup(e.target.value);
  };

  const handleOptionNameChange = (e) => {
    setInputOptionName(e.target.value);
  };

  const handleOptionPriceChange = (e) => {
    setInputOptionPrice(e.target.value);
  };

  const handleEditOption = async () => {
    try {
      const updatedOptionData = {
        menuOptionsCategory: inputOptionGroup,
        menuOptionsContents: inputOptionName,
        menuOptionsPrice: inputOptionPrice,
        mandatory: inputIsRequired,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menuoptions/${selectedOptionId}`,
        updatedOptionData
      );

      // console.log("옵션 수정됨:", response.data);
      // 모달 창 닫기
      onClose();
      onEditOption();
    } catch (error) {
      console.error("옵션 수정 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>옵션 정보를 수정해주세요.</ModalTitle>
      
      <Box style={{flexWrap:"wrap"}}>
        <TitlePlusInput>
          <InputTitle>종류</InputTitle>
          <Input
            type="text"
            placeholder="옵션 종류"
            value={inputOptionGroup}
            onChange={handleOptionGroupChange}
          />
        </TitlePlusInput>
        <TitlePlusInput>
          <InputTitle>옵션명</InputTitle>
          <Input
            type="text"
            placeholder="옵션명"
            value={inputOptionName}
            onChange={handleOptionNameChange}
          />
        </TitlePlusInput>
        <TitlePlusInput>
          <InputTitle>옵션 가격</InputTitle>
          <Input
            type="number"
            placeholder="옵션 가격"
            value={inputOptionPrice}
            onChange={handleOptionPriceChange}
          />
        </TitlePlusInput>
      </Box>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={inputIsRequired}
          onChange={handleRequiredChange}
        />
        필수
      </CheckboxLabel>
      <InputButton onClick={handleEditOption}>입력 완료</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

// 옵션 삭제 로직=================================================================
export const DeleteOptionModal = ({
  onClose,
  onDeleteOption,
  selectedOptionId,
}) => {
  const handleDeleteOption = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menuoptions/${selectedOptionId}`
      );

      // console.log("옵션 삭제됨:", response.data);
      // 모달 창 닫기
      onClose();
      onDeleteOption();
    } catch (error) {
      console.error("옵션 삭제 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>옵션을 삭제하시겠습니까?</ModalTitle>
      <InputButton onClick={handleDeleteOption}>삭제</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};
