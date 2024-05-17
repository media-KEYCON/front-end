import React from "react";
import { styled } from "styled-components";
import { TransParentBackGournd } from "./PopupStyleComponents";

const RegistrationCompleteContainer = styled(TransParentBackGournd)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;

const RegistrationComplete = () => {
  return (
    <RegistrationCompleteContainer>
      <span>포인트 등록 완료</span>
    </RegistrationCompleteContainer>
  );
};

export default RegistrationComplete;
