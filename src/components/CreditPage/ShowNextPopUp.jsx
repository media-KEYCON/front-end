import React from "react";
import { styled } from "styled-components";

import {
  PopUpButton,
  PopUpContent,
  IndentedContainer,
  TransParentBackGournd,
} from "./PopupStyleComponents";

const Upper = styled.div`
  margin-bottom: 5rem;
`;

const ShowNextPopUp = ({ onReceiptButtonClick, onPointButtonClick }) => {
  //const orderId = localStorage.getItem('orderId');
  const orderNumber = localStorage.getItem("orderNumber");
  const totalPrice = localStorage.getItem("totalPrice");

  return (
    <TransParentBackGournd>
      <PopUpContent>
        <Upper>
          <IndentedContainer>
            <span>{totalPrice}원</span>
          </IndentedContainer>
          <IndentedContainer>
            <span>결제 완료</span>
          </IndentedContainer>
        </Upper>
        <PopUpButton onClick={onReceiptButtonClick}>영수증 받기</PopUpButton>
        <PopUpButton onClick={onPointButtonClick}>포인트 적립하기</PopUpButton>
        <IndentedContainer>
          <span>주문 번호: {orderNumber}번</span>
        </IndentedContainer>
      </PopUpContent>
    </TransParentBackGournd>
  );
};

export default ShowNextPopUp;
