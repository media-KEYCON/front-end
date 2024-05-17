import { styled } from "styled-components";

const BackgroundBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100%;
`;

export default function CartBackground({ toggle, handleClick }) {
  return <>{toggle && <BackgroundBox onClick={handleClick} />}</>;
}
