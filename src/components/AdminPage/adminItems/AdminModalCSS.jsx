import { styled } from "styled-components";
import { FaXmark } from "react-icons/fa6";

// export const Header = styled.div`
// display: flex;
// justify-content: space-between;
// align-items: center;
// margin-top: 5%;
// margin-left: 2%;
// `;

//컨테이너
export const PopupBox = styled.div`
  background-color: white;
  border: 1px solid var(--primary-color);
  border-radius: 15px;  
  position: fixed;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Box = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 2rem;
`;

//title, lable
export const ModalTitle = styled.div`
  font-weight: bold;
  font-size: var(--font-regular);
  text-align: center; /* 가운데 정렬 추가 */
  word-break: keep-all;
  line-height: 1.4;
`;
export const InputTitle = styled.div`
  font-weight: bold;
  font-size: var(--font-regular);
`;
export const TitlePlusInput = styled.div`
margin-right: 1rem;
`;
export const CheckboxLabel = styled.label`
  display: flex;
  margin-bottom: 1rem;
  align-self: flex-start;
`;

//input
export const Input = styled.input`
padding: 10px;
border-radius: 13px;
border: none;
margin: 1rem 0;
background: var(--third-color);
display: flex;
`;

//버튼
export const CloseButtonContainer = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 3%;
  position: absolute;
  right: 0;
  top: 0;
  margin: 1rem;
`;
export const CloseButton = ({onClose}) => {
    return (
        <CloseButtonContainer onClick={onClose}>
            <FaXmark />
        </CloseButtonContainer>
    );
}

export const InputButton = styled.button`
padding: 0.5rem 0.8rem;
margin: 0.5rem;
border: none;
cursor: pointer;
background: var(--secondary-color);
/* flex-shrink: 0; */
color: var(--primary-color);
font-weight: 700;
border-radius: 13px;
`;