import React, { useEffect } from "react";
import { PopUpContent, TransParentBackGournd } from "./PopupStyleComponents";


const ShowFirstPopUp = ({ onClose }) => {
  // 3초 후에 팝업을 닫는 함수
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <TransParentBackGournd>
      <PopUpContent>
        <span>카드를 넣어주세요</span>
      </PopUpContent>
    </TransParentBackGournd>
  );
};

export default ShowFirstPopUp;
