import { styled } from "styled-components";

export const Box = styled.div`
  height: 100px;
  width: 100%;
  // background-color: lightblue;
  margin: 1px;
`;
export const PopupBox = styled.div`
  background-color: white;
  border: 1px solid var(--primary-color);
  width: 60%;
  height: 55%;
  position: fixed;
  top: 100px;
`;

/*
위: 기존코드(혹시 몰라서 남겨둠)
아래: 추가된코드(현재 반영)
*/

export const PageBox = styled.div`
  padding: 0 20px; // 상 우 하 좌
  overflow: auto;
  height: 100%;
`;

export const EachCategory = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  gap: 9px;
  padding-top: 22px;
`;

export const EachMenu = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  margin-bottom: ${(props) => (props.hide ? "-18px" : "0")};
  font-weight: ${(props) => (props.hide ? "bold" : "normal")};
`;

export const EachOption = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  gap: 8px;
  padding-top: 10px;
  margin-bottom: ${(props) => (props.hide ? "-18px" : "0")};
  font-weight: ${(props) => (props.hide ? "bold" : "normal")};
`;

export const OneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const GroupName = styled.div`
  width: fit-content;
  padding: 8px;
  border-radius: 5px;
  font-size: var(--font-medium);
  background-color: var(--primary-color);
  color: white;
`;

export const NameAndPrice = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 5fr 3fr;
  gap: 8px;
`;

export const Name = styled.div`
  flex: 1;
  overflow-x: hidden;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bolder;
  background-color: ${(props) => (props.hide ? "none" : "var(--third-color)")};
`;

export const Price = styled.div`
  overflow-x: hidden;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 1rem;
  background-color: ${(props) => (props.hide ? "none" : "var(--third-color)")};
`;

export const Type = styled.div`
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 1rem;
  background-color: ${(props) => (props.hide ? "none" : "var(--third-color)")};
  overflow-x: hidden;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
`;

export const PilSoo = styled.div`
  display: flex;
  align-items: center;
  width: 2.8rem;
  font-size: 1rem;
`;

export const OptionFields = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 5fr 2.8fr;
  gap: 8px;
`;
