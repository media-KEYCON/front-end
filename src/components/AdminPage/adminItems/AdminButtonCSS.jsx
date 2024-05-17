import { styled, css } from "styled-components";
import { FaPlus, FaXmark, FaAngleLeft } from "react-icons/fa6";

export const PlusBtn = styled.button`
  border: 0;
  height: 50px;
  width: 100%;
  background-color: var(--secondary-color);
`;

export const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  gap: 8px;
  border-radius: 5px;
  font-weight: bold;
  background: var(--secondary-color);
  margin: 12px 0;
  //margin: 6px 17px 25px 17px; // 상 우 하 좌

  .plus {
    margin-top: 2px;
    border-radius: 3px;
    width: 13px;
    height: 13px;
    background-color: var(--primary-color);
    color: white;
    padding: 2px;
  }
`;
export const PlusButton = ({ children, onClick }) => (
  <AddButton onClick={onClick}>
    <FaPlus className="plus" />
    {children}
  </AddButton>
);

export const Btn = styled.div`
  height: fit-content;
  text-align: center;
  border-radius: 6px;
  padding: 10px 7px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: var(--font-small);
  font-weight: bolder;
  white-space: nowrap;
  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
`;

export const SmallBtn = styled.div`
  height: fit-content;
  width: fit-content;
  margin-left: 8px;
  text-align: center;
  vertical-align: middle;
  border-radius: 18px;
  padding: 6px 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: var(--font-small);
  font-weight: bolder;
  white-space: nowrap;
`;

export const XButton = styled.div`
  background: var(--third-color);
  display: flex;
  align-items: center;
  border-radius: 5px;

  // visibility: ${(props) => (props.hide ? "hidden" : "visible")};
  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `}
`;

export const XBtn = ({ onClick,hide }) => (
  <XButton hide={hide} onClick={onClick}>
    <FaXmark />
  </XButton>
);

export const BackBtnBg = styled.div`
  width: fit-content;
  padding: 8px;
  border-radius: 9999px;
  font-size: var(--font-small);
  background-color: var(--primary-color);
  color: white;
  margin-left: 8px;
`;

export function BackBtn({ str }) {
  return (
    <BackBtnBg>
      <FaAngleLeft />
      {str}
    </BackBtnBg>
  );
}

