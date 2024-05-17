import React, { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { PopUpContent } from "./PopupStyleComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SmallPopUpContent = styled(PopUpContent)`
    height: 50vh;
`;

const SmallPopUpHeader = styled.h2`
    margin-bottom: 5rem;
    color: black;
    font-weight: bold;
`;

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    font-size: 20px;
    padding: 5px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
`;

const RegisterButton = styled.button`
    position: absolute;
    transform: translateX(110%);
    right: 0;
    bottom: 0;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 0;
    background: var(--primary-color);
    color: white;
    font-weight: bold;
    &:hover {
        background-color: white;
        color: var(--primary-color);
        outline: 2px solid var(--primary-color);
    }
`;

const NumericKeypad = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* Update this line */
    gap: 7px;
    margin-top: 1rem;
`;
const NumericKey = styled.button`
    border: 0;
    width: 5rem;
    height: 5rem;
    padding: 1rem;
    border-radius: 5px;
    background: var(--secondary-color);
    font-size: 1.3rem;

    &:hover {
        color: var(--primary-color);
        outline: 2px solid var(--primary-color);
    }
`;

export default function Pointpopup({ onClose, onRegister }) {
    const [enteredNumber, setEnteredNumber] = useState("");
    const [completedPoint, setcompletedPoint] = useState(false);
    const [orderId, setOrderId] = useState(null); // orderId 상태값 추가

    const navigate = useNavigate();

    useEffect(() => {
        // 이전 컴포넌트에서 주문 ID를 설정하면 해당 값을 orderId 상태에 설정
        setOrderId(localStorage.getItem("orderId")); // 예시: localStorage에 orderId라는 키로 저장된 값을 가져옴
    }, []);

    const handleNumericKeyClick = (number) => {
        setEnteredNumber((prevNumber) => prevNumber + number);
    };
    const cartId = localStorage.getItem("cartId");

    const handleOneStepClearButtonClick = () => {
        setEnteredNumber((prevNumber) => prevNumber.slice(0, -1));
    };

    const handleRegisterButtonClick = async () => {
        const orderId = localStorage.getItem("orderId");
        // 입력된 핸드폰 번호와 주문 ID를 기반으로 요청 데이터 생성
        const requestData = {
            customerNumber: enteredNumber,
            orderId, // 이 부분은 실제로 주문 ID 값을 어떻게 가져올지에 따라 변경해야 합니다.
        };

        try {
            // 백엔드 API 호출
            const response = await axios.post(
                "http://localhost:8080/api/v1/customers", // API 엔드포인트 주소
                requestData
            );

            // 응답 데이터 확인 및 포인트 적립 완료 처리
            if (response.data.httpStatus === 200) {
                setcompletedPoint(true);

                // 포인트 적립 완료 팝업 창을 5초 동안 띄우고 페이지를 이동합니다.
                setTimeout(() => {
                    setcompletedPoint(false);
                    // Use window.location.replace to navigate to "/main"
                    window.location.replace("/main");
                }, 5000);
            }
        } catch (error) {
            console.error("포인트를 저장하는 동안 오류 발생:", error);
            // 오류 처리 로직 추가 (예: 오류 메시지 표시)
        }
    };

    return (
        <SmallPopUpContent>
            <SmallPopUpHeader>
                포인트 적립하기
                <br />
                <p style={{ fontSize: "1rem", paddingTop: "15px" }}>
                    휴대폰 전화번호를 입력해 주세요
                </p>
            </SmallPopUpHeader>
            <InputContainer>
                <Input type="text" value={enteredNumber} readOnly />
                <RegisterButton onClick={handleRegisterButtonClick}>
                    확인
                </RegisterButton>
            </InputContainer>
            <NumericKeypad>
                <NumericKey onClick={() => handleNumericKeyClick("1")}>
                    1
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("2")}>
                    2
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("3")}>
                    3
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("4")}>
                    4
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("5")}>
                    5
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("6")}>
                    6
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("7")}>
                    7
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("8")}>
                    8
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("9")}>
                    9
                </NumericKey>
                <NumericKey
                    onClick={() => handleNumericKeyClick("010")}
                    style={{
                        backgroundColor: "rgba(0, 46, 207, 0.65)",
                        color: "white",
                    }}
                >
                    010
                </NumericKey>
                <NumericKey onClick={() => handleNumericKeyClick("0")}>
                    0
                </NumericKey>
                <NumericKey
                    onClick={handleOneStepClearButtonClick}
                    style={{ fontSize: "1rem" }}
                >
                    {" "}
                    지우기
                </NumericKey>
            </NumericKeypad>
            {completedPoint && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 46, 207, 0.65)",
                        zIndex: 9999,
                        color: "white",
                    }}
                >
                    <PopUpContent>
                        <span>포인트 적립 완료</span>
                    </PopUpContent>
                </div>
            )}
        </SmallPopUpContent>
    );
}
