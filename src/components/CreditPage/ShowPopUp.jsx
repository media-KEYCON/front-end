import React, { useEffect } from "react";
import { PopUpContent, TransParentBackGournd } from "./PopupStyleComponents";


const ShowPopUp = ({ onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <TransParentBackGournd>
      <PopUpContent>
        <span>결제중</span>
      </PopUpContent>
    </TransParentBackGournd>
  );
};

export default ShowPopUp;
