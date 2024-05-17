import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import { PlusButton, Btn } from "./adminItems/AdminButtonCSS";
import {
  PageBox,
  EachCategory,
  OneRow,
  Name,
  Buttons,
} from "./adminItems/AdminContainerCSS";
import {
  AddCategoryModal,
  EditCategoryModal,
  DeleteCategoryModal,
} from "./adminItems/ModalForCategory";

export default function AdminCategory() {
  const [ownerId, setOwnerId] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setOwnerId(userId);
  }, []);

  // 실제로 API에 GET 요청 보내는 함수
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/category/all/${ownerId}`
      );
      // console.log(response);
      return response.data.responseData;
    } catch (error) {
      console.error("카테고리 불러오기 실패", error);
      return [];
    }
  };

  // 카테고리 새로 추가됐을 때 실시간으로 다시 get 요청 보내서 반영하는 함수
  const fetchUpdatedCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  // 카테고리 수정 시 업데이트된 카테고리 정보 반영을 위한 함수
  const handleEditCategoryUpdate = async () => {
    try {
      await fetchUpdatedCategories(); // 수정된 카테고리 정보 다시 불러오기
    } catch (error) {
      console.error("카테고리 업데이트 반영 실패", error);
    }
  };

  const handleDeleteCategoryUpdate = async () => {
    try {
      await fetchUpdatedCategories(); // 수정된 카테고리 정보 다시 불러오기
    } catch (error) {
      console.error("카테고리 업데이트 반영 실패", error);
    }
  };

  // 마운트 될 때 get 해와주는 함수
  useEffect(() => {
    async function fetchCategories() {
      if (ownerId) {
        const categories = await getCategories();
        setCategories(categories);
      }
      setIsLoading(false);
    }
    fetchCategories();
  }, [ownerId]);

  const handleAdd = () => {
    // 기존 handleAddCategoryButtonClick
    setIsAddModalOpen(true);
  };

  const handleEdit = (categoryId, categoryName) => {
    // 기존 handleEditCategoryButtonClick
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setIsEditModalOpen(true);
  };

  const handleDelete = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedCategoryId(null);
    // setNewCategoryName(""); // 팝업 창이 닫힐 때 새로운 카테고리명 상태 초기화
    //창이 닫히면 새로고침하기.
  };

  return (
    <PageBox>
      <Header title="카테고리 등록" link="/main" />
      <PlusButton onClick={handleAdd}>카테고리 추가</PlusButton>
      <div>
        {isLoading ? (
          <div>로딩중...</div>
        ) : categories.length === 0 ? (
          <div style={{ padding: "10px" }}>등록된 카테고리가 없어요</div>
        ) : (
          categories.map((item) => (
            <EachCategory key={item.categoryId}>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                카테고리명
              </div>
              <OneRow>
                <Name>{item.categoryName}</Name>
                <Buttons>
                  <Btn
                    onClick={() =>
                      handleEdit(item.categoryId, item.categoryName)
                    }
                  >
                    수정하기
                  </Btn>
                  <Btn
                    onClick={() =>
                      handleDelete(item.categoryId, item.categoryName)
                    }
                  >
                    삭제하기
                  </Btn>
                </Buttons>
              </OneRow>
              <Link
                to={`/admin/${item.categoryId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Btn>메뉴 조회</Btn>
              </Link>
            </EachCategory>
          ))
        )}
      </div>
      {isAddModalOpen && (
        <AddCategoryModal
          ownerId={ownerId}
          onClose={handleCloseModal}
          onAddCategory={fetchUpdatedCategories}
        />
      )}
      {isEditModalOpen && (
        <EditCategoryModal
          selectedCategoryId={selectedCategoryId}
          selectedCategoryName={selectedCategoryName}
          onClose={handleCloseModal}
          onEditCategory={handleEditCategoryUpdate}
          /* 추가: 카테고리 수정 후 업데이트 함수 전달 */
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCategoryModal
          categoryId={selectedCategoryId}
          categoryName={selectedCategoryName}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteCategory={handleDeleteCategoryUpdate}
        />
      )}
    </PageBox>
  );
}
