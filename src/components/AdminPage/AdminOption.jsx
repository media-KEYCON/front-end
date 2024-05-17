import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import convertPrice from "../../utils/convertPrice";
import Header from "../header/Header";
import {
  AddOptionModal,
  EditOptionModal,
  DeleteOptionModal,
} from "./adminItems/ModalForOption";
import { StyleSheetManager } from "styled-components"; // 다음 warning 제거하려 추가: StyledComponent.ts:139 styled-components: it looks like an unknown prop "hide" is being sent through to the DOM, which will likely trigger a React console error.
import {
  PlusButton,
  Btn,
  XBtn,
  BackBtn,
} from "./adminItems/AdminButtonCSS";
import {
  PageBox,
  EachOption,
  GroupName,
  OneRow,
  OptionFields,
  Name,
  Price,
  Type,
  PilSoo,
} from "./adminItems/AdminContainerCSS";

export default function AdminOption() {
  const { categoryId, menusId } = useParams(); //url주소 얻기

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedOptionData, setSelectedOptionData] = useState({
    menuOptionsCategory: "", // 예를 들어 빈 문자열로 초기화
    menuOptionsContents: "", // 예를 들어 빈 문자열로 초기화
    menuOptionsPrice: 0, // 혹은 다른 초기값으로 설정
    mandatory: false, // 혹은 다른 초기값으로 설정
  });
  // const [isEditOptionCategoryModalOpen, setIsEditOptionCategoryModalOpen] =
  //   useState(false);
  const [options, setOptions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/menus/${menusId}`
      );
      // console.log(response);
      return response.data.responseData;
    } catch (error) {
      console.error("옵션 불러오기 실패", error);
      return [];
    }
  };

  const fetchUpdatedOptions = async () => {
    const options = await getOptions();
    setOptions(options);
  };

  useEffect(() => {
    async function fetchOptions() {
      const options = await getOptions();
      setOptions(options);
    }
    fetchOptions();
  }, []);
  
  


  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (optionId, optionData) => {
    setSelectedOptionId(optionId);
    setSelectedOptionData(optionData);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedOptionId(null);
  };

  const handleDelete = (optionId) => {
    setSelectedOptionId(optionId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOptionId(null);
  };

  return (
    <PageBox>
      <Header title="옵션 등록" link="/main" />
      <div style={{ display: "flex" }}>
        <Link to="/admin">
          <BackBtn str="카테고리 등록"></BackBtn>
        </Link>
        <Link to={`/admin/${categoryId}`}>
          <BackBtn str="메뉴 등록"></BackBtn>
        </Link>
      </div>
      <PlusButton onClick={handleAdd}>옵션 추가</PlusButton>
      <div style={{ padding: "8px 0", fontWeight: "bold" }}>메뉴명</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GroupName>{options.menusName}</GroupName>
      </div>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "hide"}>
        <EachOption hide={"true"}>
          <OneRow>
            <PilSoo>필수</PilSoo>
            <OptionFields>
              <Type hide={"true"}>종류</Type>
              <Name hide={"true"}>옵션명</Name>
              <Price hide={"true"}>가격</Price>
            </OptionFields>
            <Btn hide={"true"}>수정하기</Btn>
            <XBtn hide={"true"} />
          </OneRow>
        </EachOption>
      </StyleSheetManager>
      <div>
        {options.menuOptionsList ? (
          options.menuOptionsList.length === 0 ? (
            <div style={{ paddingTop: "28px" }}>등록된 옵션이 없어요</div>
          ) : (
            options.menuOptionsList.map((item) => (
              <EachOption key={item.menuOptionsId}>
                <OneRow>
                  <PilSoo>
                    <input type="checkbox" checked={item.mandatory} readOnly />
                  </PilSoo>
                  <OptionFields>
                    <Type>{item.menuOptionsCategory}</Type>
                    <Name>{item.menuOptionsContents}</Name>
                    <Price>{convertPrice(item.menuOptionsPrice)}</Price>
                  </OptionFields>
                  <Btn onClick={() => handleEdit(item.menuOptionsId, item)}>
                    수정하기
                  </Btn>
                  <XBtn onClick={() => handleDelete(item.menuOptionsId)}/>
                </OneRow>
              </EachOption>
            ))
          )
        ) : (
          <div>로딩중...</div>
        )}
      </div>
      {isAddModalOpen && (
        <AddOptionModal
          onClose={handleCloseModal}
          menusId={menusId}
          onAddOption={fetchUpdatedOptions}
        />
      )}
      {isEditModalOpen && selectedOptionId && (
        <EditOptionModal
          selectedOptionId={selectedOptionId}
          selectedOptionData={selectedOptionData}
          onClose={handleCloseModal}
          onEditOption={fetchUpdatedOptions}
        />
      )}
      {isDeleteModalOpen && selectedOptionId && (
        <DeleteOptionModal
          selectedOptionId={selectedOptionId}
          onClose={handleCloseDeleteModal}
          onDeleteOption={fetchUpdatedOptions}
        />
      )}
    </PageBox>
  );
}
