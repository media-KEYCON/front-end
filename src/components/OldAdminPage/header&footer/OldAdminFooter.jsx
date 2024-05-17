import { styled } from "styled-components";
import OldSaveButton from "../adminItems/OldSaveButton";

const FooterBox = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;

  background-color: var(--primary-color);
  padding: 15px;
  height: 62px;
  font-size: var(--font-big);
`;

export default function OldAdminFooter() {
  return (
    <FooterBox>
      <OldSaveButton buttonText={"메뉴 저장"} />
    </FooterBox>
  );
}
