import styled from "styled-components";
import logo from './logo.svg';
import logoSquare from './logoSquare.svg';

export const LoginBox = styled.div`
  height: 100vh; /* 추후 메뉴판 길이에 맞게 수정 */
  background: var(--third-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Logos() {
    return (
        <>
            <img
                style={{ height: "6rem", width: "auto" }}
                src={logoSquare}
                alt="LogoSquare"
            />
            <img
                style={{ height: "5rem", width: "auto", margin: "2rem 0 1.5rem 0" }}
                src={logo}
                alt="Logo"
            />
        </>
    )
}

export const SubmitBtn = styled.button`
  border: 0;
  margin: 0.5rem 0;
  padding: 1rem 3rem;
  width: 100%;
  border-radius: 10px;
  background: var(--secondary-color);
  color: var(--primary-color);
  font-weight: bold;
  flex-shrink: 0;
  font-size: var(--font-big);
  cursor: pointer;
`

export const FormInput = styled.input`
padding: 0.5rem 1rem;
font-size: 1rem;
border: 0;
border-radius: 5px;
margin-bottom: 1rem;
`;


export const FormLabel = styled.label`
font-size: 1.2rem;
margin-bottom: 0.5rem;
margin-right: 1rem;
`;

export const Trash = styled.div`
display: flex;
justify-content: center;
align-items: center;
white-space: normal;
flex-direction: column;
`;