import { Link } from "react-router-dom";
import styled from "styled-components";

import { LoginBox, Logos, SubmitBtn, Trash } from './loginItems/loginItemCSS';

const SubmitBtn2 = styled.button`
    border: 0;
    margin: 0.5rem 0;
    padding: 1rem 3rem;
    width: 100%;
    border-radius: 10px;
    background: var(--blue, #002ECF);
    color: #FFF;
    font-weight: bold;
    flex-shrink: 0;
    font-size: var(--font-big);
    cursor: pointer;
`
export default function Select() {

    return (
        <>
            <LoginBox>
                <Trash>
                <Logos />
                    <SubmitBtn2 type="submit" >
                        <Link to={"/main"}>주문 페이지 </Link>
                    </SubmitBtn2>
                    <SubmitBtn type="submit" >
                        <Link to={"/admin"}>관리자 페이지 </Link>
                    </SubmitBtn>
                </Trash>
            </LoginBox>
        </>
    );
}