import { styled } from "styled-components";
import { useEffect, useState } from "react";
import MenuModal from "./menuModal/MenuModal";
import axios from "axios";

const ListBox = styled.div`
    padding: 0 1.2vw; /* 위아래 패딩 0으로 수정 */
    overflow-y: scroll; /* 마지막에 스크롤 없애기 */
    height: 100%;
`;
//column을 이용한 구현
const List = styled.div`
    column-count: 2;
    column-gap: 10px;
`;
const Item = styled.div`
    width: 100%;
    /* height: ${(props) => props.height || "100px"}; */
    background-color: var(--third-color);
    display: inline-block;
    break-inside: avoid;
    margin-bottom: 10px;
`;
const CategoryTltleStyle = styled.h2`
    padding: 10px;
    font-size: var(--font-big);
    font-weight: bold;
`;
const MenuStyle = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 4px 10px;
    margin: 4px 0;
    /* 선택된 메뉴 블록의 스타일*/
    ${({ selected }) =>
        selected &&
        `
    background-color: var(--secondary-color);
  `}
`;
const SoldOutStyle = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;
    color: #9c9c9c;
`;
const SoldOutLine = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: black;
`;
const SoldOutText = styled.div`
    position: absolute;
    padding: 4px 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    border-radius: 5px;
    font-size: var(--font-small);
    color: var(--primary-color);
    background-color: var(--secondary-color);
`;

export function MasonryMenuContainer({ cartMenu, setCartMenu, onUpdatePrice }) {
    //서버로부터 장바구니 데이터 받기

    const [modalMenusId, setModalMenusId] = useState(null);
    const [menuData, setMenuData] = useState([]);

    const handleMenuItemClick = (menusId) => {
        setModalMenusId(menusId);
    };

    // 서버에서부터 메뉴판 데이터 받기
    useEffect(() => {
        const ownerId = localStorage.getItem("userId"); // ownerId(userId)값 localStorage에서 받기
        // console.log(`owrnerId: ${ownerId}`);
        axios
            .get(`http://localhost:8080/api/v1/category/all/${ownerId}`)
            .then((response) => {
                // 요청이 성공적으로 완료되었을 때 실행되는 코드
                // console.log(response.data); // 서버로부터 받은 데이터 출력
                setMenuData(response.data.responseData); // 받은 데이터를 menuData에 저장
            })
            .catch((error) => {
                // 요청이 실패했을 때 실행되는 코드
                console.error(error);
            });
    }, []);

    const handlePriceUpdate = (totalPrice) => {
        onUpdatePrice(totalPrice);
    };

    const handleCloseModal = () => {
        setModalMenusId(null);
    };

    return (
        <ListBox id="listBox">
            <List id="list">
                {/* 데이터 받기 */}
                {menuData.map((category) => (
                    <Item key={category.categoryId}>
                        <div style={{ padding: "10px 0" }}>
                            <CategoryTltleStyle>
                                {category.categoryName}
                            </CategoryTltleStyle>
                            <ul style={{ marginTop: "5px" }}>
                                {category.menusList.map((menu, index) => (
                                    <MenuStyle
                                        key={index}
                                        id="menuStyle"
                                        onClick={() => {
                                            if (!menu.soldOut) {
                                                handleMenuItemClick(
                                                    menu.menusId
                                                );
                                            }
                                        }}
                                        selected={
                                            cartMenu.includes(menu.menusName)
                                                ? true
                                                : false
                                        }
                                    >
                                        {menu.soldOut ? (
                                            <SoldOutStyle>
                                                <SoldOutLine />
                                                <SoldOutText>품절</SoldOutText>
                                                <div>{menu.menusName}</div>
                                                <div>{menu.menusPrice}원</div>
                                            </SoldOutStyle>
                                        ) : (
                                            <>
                                                <div>{menu.menusName}</div>
                                                <div>{menu.menusPrice}원</div>
                                            </>
                                        )}
                                    </MenuStyle>
                                ))}
                            </ul>
                        </div>
                    </Item>
                ))}
            </List>
            {modalMenusId && (
                <MenuModal
                    menusId={modalMenusId}
                    onCloseModal={handleCloseModal}
                    cartMenu={cartMenu}
                    setCartMenu={setCartMenu}
                    onUpdatePrice={handlePriceUpdate}
                />
            )}
        </ListBox>
    );
}
