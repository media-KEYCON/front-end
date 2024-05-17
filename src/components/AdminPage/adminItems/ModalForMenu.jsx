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

export const AddMenuModal = ({ onClose, categoryId, onAddMenu }) => {
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handleMenuNameChange = (e) => {
    setMenuName(e.target.value);
  };

  const handleMenuPriceChange = (e) => {
    setMenuPrice(e.target.value);
  };

  const handleSoldOutChange = (e) => {
    setIsSoldOut(e.target.checked);
  };

  const handleAddMenu = async () => {
    try {
      // const response = await axios.post(
      await axios.post(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menus/${categoryId}`,
        {
          menusName: menuName,
          menusPrice: menuPrice,
          soldOut: isSoldOut,
        }
      );
      // console.log(response);
      // console.log(`${menuName}, ${menuPrice} 추가 성공`);
      onClose(); // 모달 창 닫음
      onAddMenu();
    } catch (error) {
      console.error("메뉴 추가 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>메뉴 이름/가격을 입력해주세요</ModalTitle>
      <Box>
        <TitlePlusInput>
          <InputTitle>메뉴명</InputTitle>
          <Input
            type="text"
            placeholder="Menu Name"
            value={menuName}
            onChange={handleMenuNameChange}
          />
        </TitlePlusInput>
        <TitlePlusInput>
          <InputTitle>가격</InputTitle>
          <Input
            type="number"
            placeholder="Menu Price"
            value={menuPrice}
            onChange={handleMenuPriceChange}
          />
        </TitlePlusInput>
      </Box>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={isSoldOut}
          onChange={handleSoldOutChange}
        />
        품절
      </CheckboxLabel>
      <InputButton onClick={handleAddMenu}>입력 완료</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

// 수정/품질관리 로직
export const EditMenuModal = ({
  selectedMenuId,
  selectedMenuData,
  onClose,
  onEditMenu,
}) => {
  const [menuData, setMenuData] = useState({
    name: selectedMenuData.name,
    price: selectedMenuData.price,
    soldOut: selectedMenuData.soldOut,
  });

  const handleMenuDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setMenuData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleEditMenu = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menus/${selectedMenuId}`,
        {
          menusName: menuData.name,
          menusPrice: menuData.price,
          soldOut: menuData.soldOut,
        }
      );
      // console.log(`${menuData.name}(id=${selectedMenuId})가 수정되었습니다.`);

      // 메뉴 수정 후 업데이트 함수 호출
      onEditMenu();

      // 모달 창 닫기
      onClose();
    } catch (error) {
      console.error("메뉴 수정 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>메뉴 이름/가격을 입력해주세요</ModalTitle>
      <Box>
        <TitlePlusInput>
          <InputTitle>메뉴명</InputTitle>
          <Input
            type="text"
            name="name"
            value={menuData.name}
            onChange={handleMenuDataChange}
          />
        </TitlePlusInput>

        <TitlePlusInput>
          <InputTitle>가격</InputTitle>
          <Input
            type="number"
            name="price"
            value={menuData.price}
            onChange={handleMenuDataChange}
          />
        </TitlePlusInput>
      </Box>
      <CheckboxLabel>
        <input
          type="checkbox"
          name="soldOut"
          checked={menuData.soldOut}
          onChange={handleMenuDataChange}
        />
        품절
      </CheckboxLabel>
      <InputButton onClick={handleEditMenu}>입력 완료</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

//카테고리 이름 수정 함수
export const EditCategoryModal = ({
  selectedCategoryId,
  currentCategoryName,
  onClose,
  onSave,
}) => {
  const [newCategoryName, setNewCategoryName] = useState(currentCategoryName);

  const handleCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/category/${selectedCategoryId}`, // 수정된 URL
        {
          categoryName: newCategoryName, // 요청 본문에 categoryName 추가
        }
      );

      // 카테고리 이름 변경 후 작업 완료 후 로직 (예: 메시지 출력 등)
      // console.log(`카테고리 이름이 변경되었습니다: ${newCategoryName}`);

      onSave(newCategoryName);
      onClose();
    } catch (error) {
      console.error("카테고리 이름 변경 실패: ", error);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>수정할 카테고리 이름을 입력해주세요 </ModalTitle>
      <Input
        type="text"
        placeholder="새 카테고리 이름"
        value={newCategoryName}
        onChange={handleCategoryNameChange}
      />
      <InputButton onClick={handleSave}>저장</InputButton>
      <CloseButton onClose={onClose} />
    </PopupBox>
  );
};

export const DeleteMenuModal = ({ menusId, onClose, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteMenu = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menus/${menusId}`
      );

      onDelete(menusId);
      onClose();
    } catch (error) {
      console.error("Failed to delete menu: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PopupBox>
      <ModalTitle>메뉴를 삭제하시겠습니까?</ModalTitle>
      <InputButton
        onClick={handleDeleteMenu}
        disabled={isDeleting} // 삭제 작업 중에는 버튼 비활성화
      >
        {isDeleting ? "삭제 중..." : "확인"}
      </InputButton>
      <CloseButton onClose={onClose} disabled={isDeleting} />
    </PopupBox>
  );
};
