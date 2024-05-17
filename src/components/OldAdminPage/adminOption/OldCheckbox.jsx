import { styled } from "styled-components";
import { FaCheck } from "react-icons/fa6";

const CheckboxContainer = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: ${({ checked }) =>
    checked ? "var(--primary-color)" : "white"};
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const CheckIcon = styled(FaCheck)`
  color: white;
`;

const OldCheckbox = ({ className, checked, onChange, ...props }) => {
  const handleCheckbox = () => {
    onChange((prev) => !prev);
  };

  return (
    <CheckboxContainer onClick={handleCheckbox} className={className}>
      <HiddenCheckbox checked={checked} onChange={handleCheckbox} {...props} />
      <StyledCheckbox checked={checked}>
        <CheckIcon checked={checked} />
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default OldCheckbox;
