import React, { useState } from "react";
import axios from "axios";
import {
  PopupBox,
  ModalTitle,
  CloseButton,
  Input,
  InputButton,
} from "./AdminModalCSS";

export const AddCategoryModal = ({ onClose, ownerId, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
      //const response = await axios.post(
      await axios.post(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/category/${ownerId}`,
        {
          categoryName: categoryName,
        }
      );
      // console.log(response);
      // console.log(`${categoryName} 추가 성공`);
      onClose();
      onAddCategory();
    } catch (error) {
      console.error("카테고리 추가 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>카테고리명을 입력해주세요</ModalTitle>
      <Input
        type="text"
        value={categoryName}
        onChange={handleCategoryNameChange}
      />
      <InputButton primary="true" onClick={handleAddCategory}>
        입력 완료
      </InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

export const EditCategoryModal = ({
  selectedCategoryId,
  selectedCategoryName,
  onClose,
  onEditCategory,
}) => {
  const [newCategoryName, setNewCategoryName] = useState(selectedCategoryName);

  const handleNewCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleEditCategory = async () => {
    try {
      // 수정된 카테고리 정보를 백엔드로 전송
      await axios.put(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/category/${selectedCategoryId}`,
        {
          categoryName: newCategoryName,
        }
      );

      // 수정 성공 시 모달 창 닫고 업데이트 반영
      // console.log(
      //   `${selectedCategoryName}(id=${selectedCategoryId})를 ${newCategoryName}으로 업데이트 되었습니다.`
      // );
      onClose();
      onEditCategory();
    } catch (error) {
      console.error("카테고리 수정 실패: ", error);
    }
  };
  return (
    <PopupBox>
      <ModalTitle>수정할 카테고리 명을 입력해주세요</ModalTitle>
      <Input
        type="text"
        value={newCategoryName}
        onChange={handleNewCategoryNameChange}
      />
      <InputButton onClick={handleEditCategory}>입력완료</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

export const DeleteCategoryModal = ({
  categoryId,
  categoryName,
  onClose,
  onDeleteCategory,
}) => {
  const handleDeleteCategory = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/category/${categoryId}`
      );
      // console.log(`${categoryName}(id=${categoryId})가 삭제되었습니다.`);
      onClose();
      onDeleteCategory();
    } catch (error) {
      console.error("카테고리 삭제 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>{categoryName} 카테고리를 삭제하시겠습니까?</ModalTitle>
      <InputButton onClick={handleDeleteCategory}>삭제</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};
