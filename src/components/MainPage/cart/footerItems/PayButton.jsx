import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Pointpopup from "./../../../CreditPage/Pointpopup";
import ShowTakeoutPopUp from "../../../CreditPage/ShowTakeoutPopUp";
import ShowFirstPopUp from "../../../CreditPage/ShowFirstPopUp";
import ShowPopUp from "../../../CreditPage/ShowPopUp";
import ShowNextPopUp from "../../../CreditPage/ShowNextPopUp";
import ShowReceiptPopup from "../../../CreditPage/ShowReceiptPopup";

const MainBox = styled.div`
  padding: 1vw 1.2vw;
  height: 100vh; /* Modify later to fit the length of the menu board */
`;

const PayButtonBox = styled.button`
  background-color: var(--primary-color);
  color: white;
  font-size: inherit;
  font-weight: bold;
  border: none;
  border-radius: 11px;
  box-shadow: none;
  height: 62px;
  padding: 0 20px;
  cursor: pointer;

  &:active {
    background-color: #2764ff;
  }
`;

export default function PayButton({ updatedCart }) {
  const [isPaymentComplete, setPaymentComplete] = useState(false);
  const [showTakeoutPopUp, setShowTakeoutPopUp] = useState(false);
  const [showFirstPopUp, setFirstShowPopUp] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showNextPopUp, setShowNextPopUp] = useState(false);
  const [showSmallPopUp, setShowSmallPopUp] = useState(false);
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);

  const PaymentCancel = () => {
    setShowTakeoutPopUp(false);
    setPaymentComplete(false);
  };

  const handlePayButtonClick = async () => {
    setPaymentComplete(true);
    setShowTakeoutPopUp(true);

    const cartId = localStorage.getItem("cartId");
    try {
      await axios
        .put(`${process.env.REACT_APP_SERVER_IP}/api/v1/cart`, {
          cartId: Number(cartId),
          orderMenuUpdateRequestDtoList: updatedCart,
        })
        .then((res) => {
          const totalPrice = res.data.responseData.totalPrice;
          localStorage.setItem("totalPrice", totalPrice);
        });
    } catch (error) {
      console.error("카트 업데이트 실패:", error);
    }
  };

  const openReceiptPopup = () => {
    setShowReceiptPopup(true);
    setShowNextPopUp(false); // 영수증 팝업을 열면 결제 완료 팝업을 닫습니다.
  };

  const openShowFirstPopUp = (shouldTakeout) => {
    setShowTakeoutPopUp(false);
    // 필요한 경우 "shouldTakeout" 변수를 기반으로 다른 작업을 수행할 수 있습니다.
    // 예를 들어 사용자의 선택에 따라 다른 상태 변수를 업데이트하거나 다른 작업을 수행할 수 있습니다.
    // 이 예시에서는 항상 ShowTakeoutPopUp 이후에 다음 팝업을 표시합니다.
    setFirstShowPopUp(shouldTakeout);
  };

  const openSmallPopUp = () => {
    setShowSmallPopUp(true);
  };

  const closeSmallPopUp = () => {
    setShowSmallPopUp(false);
  };

  const closeReceiptPopup = () => {
    setShowReceiptPopup(false);
  };

  useEffect(() => {
    if (showFirstPopUp) {
      const timeout = setTimeout(() => {
        setFirstShowPopUp(false);
        setShowPopUp(true);
      }, 3000);

      // Clean up the timeout on component unmount or if payment status changes
      return () => clearTimeout(timeout);
    }
  }, [showFirstPopUp]);

  useEffect(() => {
    if (showPopUp) {
      const timeout = setTimeout(() => {
        setShowPopUp(false);
        setShowNextPopUp(true);
      }, 3000);

      // Clean up the timeout on component unmount or if payment status changes
      return () => clearTimeout(timeout);
    }
  }, [showPopUp]);

  useEffect(() => {
    if (showReceiptPopup) {
      const timeout = setTimeout(() => {
        setShowReceiptPopup(false);
        // 페이지 이동
        window.location.replace("/main"); // 메인 페이지의 URL로 변경해야 합니다.
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showReceiptPopup]);

  return (
    <>
      {!isPaymentComplete ? (
        <PayButtonBox onClick={handlePayButtonClick}>결제하기</PayButtonBox>
      ) : (
        <MainBox>
          {showTakeoutPopUp && ( //포장/매장 여부 선택 팝업
            <ShowTakeoutPopUp
              onShowFirstPopUp={openShowFirstPopUp}
              PaymentCancel={PaymentCancel}
            />
          )}

          {showFirstPopUp && ( // 카드를 넣어주세요 선택 팝업
            <ShowFirstPopUp onClose={() => setFirstShowPopUp(false)} />
          )}

          {showPopUp && ( //결제중 팝업창
            <ShowPopUp onClose={() => setShowNextPopUp(true)} />
          )}

          {showNextPopUp && ( //결제완료 팝업
            <ShowNextPopUp
              onReceiptButtonClick={openReceiptPopup}
              onPointButtonClick={openSmallPopUp}
            />
          )}

          {showReceiptPopup && ( // 영수증 발급 완료 팝업
            <ShowReceiptPopup onClose={closeReceiptPopup} />
          )}

          {showSmallPopUp && ( //포인트적립 팝업
            <div
              style={{
                position: "fixed",
                top: "5%",
                left: "30%",
                width: "40%",
                height: "90%",
                background: "#FFFFFF",
                zIndex: 9999,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "11px",
              }}
            >
              <Pointpopup onClose={closeSmallPopUp}></Pointpopup>
            </div>
          )}
        </MainBox>
      )}
    </>
  );
}
