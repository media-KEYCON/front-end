import React from "react";
import {
  PopUpButton,
  PopUpContent,
  IndentedContainer,
  TransParentBackGournd,
} from "./PopupStyleComponents";
import { FaXmark } from "react-icons/fa6";
import { styled } from "styled-components";
import axios from "axios";

const CancleBtnBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 2rem;
`;

export default function ShowTakeoutPopUp({ onShowFirstPopUp, PaymentCancel }) {
  const handleTakeout = (takeOut) => {
    const cartId = localStorage.getItem("cartId");

    // API 요청을 보내는 코드
    axios
      .post(`${process.env.REACT_APP_SERVER_IP}/api/v1/orders`, {
        takeOut: takeOut,
        cartId: cartId,
      })
      .then((response) => {
        // 요청이 성공한 경우에 실행할 코드
        // console.log("API 요청 성공:", response);
        onShowFirstPopUp(true);
        localStorage.setItem("cartId", null);
        const orderId = response.data.responseData.orderId;
        localStorage.setItem("orderId", orderId); // Store orderId in localStorage
        // console.log("order response", response);

        const orderNumber = response.data.responseData.orderNumber;
        localStorage.setItem("orderNumber", orderNumber);
      })
      .catch((error) => {
        // 요청이 실패한 경우에 실행할 코드
        console.error("API 요청 실패:", error);
      });
  };

  return (
    <TransParentBackGournd>
      <PopUpContent>
        <CancleBtnBox onClick={PaymentCancel}>
          <FaXmark size={50} />
        </CancleBtnBox>
        <IndentedContainer>
          <span style={{ lineHeight: 1.5 }}>
            포장여부를 선택하면
            <br />
            결제가 진행됩니다.
          </span>
        </IndentedContainer>
        <PopUpButton onClick={() => handleTakeout(true)}>포장하기</PopUpButton>
        <PopUpButton onClick={() => handleTakeout(false)}>먹고가기</PopUpButton>
      </PopUpContent>
    </TransParentBackGournd>
  );
}
