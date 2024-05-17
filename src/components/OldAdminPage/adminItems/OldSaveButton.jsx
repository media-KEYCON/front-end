import { styled } from "styled-components";

const SaveButtonBox = styled.button`
  background-color: #ffffff;
  font-size: large; /*임시*/

  border: none;
  border-radius: 8px;
  box-shadow: none;
  padding: 15px 34px;

  cursor: pointer;
  &:active {
    background-color: #e4e4e4;
  }
`;

export default function OldSaveButton({ buttonText }) {
  return <SaveButtonBox>{buttonText}</SaveButtonBox>;
}
