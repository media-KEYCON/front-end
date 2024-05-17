import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import { StyleSheetManager } from "styled-components"; // 다음 warning 제거하려 추가: StyledComponent.ts:139 styled-components: it looks like an unknown prop "hide" is being sent through to the DOM, which will likely trigger a React console error.
import convertPrice from "../../utils/convertPrice";

import {
  PlusButton,
  Btn,
  XBtn,
  BackBtn,
} from "./adminItems/AdminButtonCSS";

import {
  PageBox,
  GroupName,
  EachMenu,
  OneRow,
  Buttons,
  NameAndPrice,
  Name,
  Price,
} from "./adminItems/AdminContainerCSS";
import {
  EditCategoryModal,
  AddMenuModal,
  EditMenuModal,
  DeleteMenuModal,
} from "./adminItems/ModalForMenu";

export default function AdminMenu() {
  const { categoryId } = useParams(); //url주소 얻기

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null); // 수정 대상 메뉴의 ID
  const [selectedMenuData, setSelectedMenuData] = useState({
    name: "",
    price: null,
    soldOut: null,
  });
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [menus, setMenus] = useState({
    categoryName: "",
    menusList: [],
  });


  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // 메뉴 삭제 확인 모달의 가시성 상태


  const getMenus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/category/${categoryId}`
      );
      // console.log(response);
      return response.data.responseData;
    } catch (error) {
      console.error("메뉴 불러오기 실패", error);
      return [];
    }
  };

  const fetchUpdatedMenus = async () => {
    const menus = await getMenus();
    setMenus(menus);
  };

  useEffect(() => {
    async function fetchMenus() {
      const menus = await getMenus();
      setMenus(menus);
    }
    fetchMenus();
  }, []);

  const handleEditCategory = () => {
    setIsEditCategoryModalOpen(true);
  };

  const handleEditCategoryName = (newName) => {
    // TODO: 백엔드에서 카테고리 이름 업데이트
    // console.log(`카테고리 이름 업데이트됨: ${newName}`);
    // 선택 사항으로 UI를 업데이트하여 변경 사항을 반영할 수 있습니다.
    setNewCategoryName(newName);
  };

  const handleAdd = () => {
    // 기존 handleAddMenuButtonClick
    setIsAddModalOpen(true);
  };

  const handleEdit = (menuId, menuData) => {
    setSelectedMenuId(menuId);
    setSelectedMenuData(menuData);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedMenuId(null);
    //새로고침으로 get받아오기
  };

  const handleCloseDeleteConfirmation = (menusId) => {
    setSelectedMenuId(menusId);
    setIsDeleteConfirmationOpen(true);
  };

  return (
    <PageBox>
      <Header title="메뉴 등록" link="/main" />
      <Link to="/admin">
        <BackBtn str="카테고리 등록"></BackBtn>
      </Link>
      <PlusButton onClick={handleAdd}>메뉴 추가</PlusButton>
      <div style={{ padding: "8px 0", fontWeight: "bold" }}>카테고리명</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GroupName>{menus.categoryName}</GroupName>
        {/* <SmallBtn onClick={handleEditCategory}>수정</SmallBtn> */}
      </div>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "hide"}>
        <EachMenu hide="true">
          <OneRow>
            <NameAndPrice>
              <Name hide="true">메뉴명</Name>
              <Price hide="true">가격</Price>
            </NameAndPrice>
            <Buttons>
              <Btn hide="true">수정/품절관리</Btn>
              <Btn hide="true">옵션</Btn>
            </Buttons>
            <XBtn hide="true" />
          </OneRow>
        </EachMenu>
      </StyleSheetManager>
      <div>
        {menus.menusList ? (
          menus.menusList.length === 0 ? (
            <div style={{ padding: "28px 12px" }}>등록된 메뉴가 없어요</div>
          ) : (
            menus.menusList.map((item) => (
              <EachMenu key={item.menusId}>
                <OneRow>
                  <NameAndPrice>
                    <Name>{item.menusName}</Name>
                    <Price>{convertPrice(item.menusPrice)}</Price>
                  </NameAndPrice>
                  <Buttons>
                    <Btn
                      onClick={() =>
                        handleEdit(item.menusId, {
                          name: item.menusName,
                          price: item.menusPrice,
                          soldOut: item.soldOut,
                        })
                      }
                    >
                      수정/품절관리
                    </Btn>
                    <Link
                      to={`/admin/${categoryId}/${item.menusId}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Btn>옵션</Btn>
                    </Link>
                  </Buttons>
                  <XBtn
                    onClick={() => handleCloseDeleteConfirmation(item.menusId)}
                  />
                </OneRow>
              </EachMenu>
            ))
          )
        ) : (
          <div>로딩중...</div>
        )}
      </div>
      {isAddModalOpen && (
        <AddMenuModal
          categoryId={categoryId}
          onClose={handleCloseModal}
          onAddMenu={fetchUpdatedMenus}
        />
      )}
      {isEditCategoryModalOpen && (
        <EditCategoryModal
          currentCategoryName={menus.categoryName}
          onClose={() => setIsEditCategoryModalOpen(false)}
          onSave={handleEditCategoryName}
        />
      )}
      {isEditModalOpen && selectedMenuId && (
        <EditMenuModal
          selectedMenuId={selectedMenuId}
          selectedMenuData={selectedMenuData}
          onClose={handleCloseModal}
          onEditMenu={fetchUpdatedMenus}
        />
      )}
      {isDeleteConfirmationOpen && (
        <DeleteMenuModal
          menusId={selectedMenuId}
          onClose={() => setIsDeleteConfirmationOpen(false)}
          onDelete={(deletedMenuId) => {
            fetchUpdatedMenus();
            // console.log(`Menu with ID ${deletedMenuId} has been deleted.`);
          }}
        />
      )}
    </PageBox>
  );
}
