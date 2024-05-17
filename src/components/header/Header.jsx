import { styled } from "styled-components";
import logo from './headerLogo.svg';
import { Link } from 'react-router-dom';

const HeaderBox = styled.header`
  width: 100%;
  height: 14vh;
  background-color: white;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0px;
  /* z-index: 9999; */
`
const LogoBox = styled.img`
    width: 4rem;
    height: auto;
`
const TitleBox=styled.div`
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title=styled.div`
    color: var(--primary-color);
    font-size: xx-large;
    font-weight: bolder;
    padding-bottom: 10px;
`
const Subtitle=styled.div`
    font-size: var(--font-big);
    font-weight: bold;
`

export default function Header({title, subtitle, link}){
    return(
        <HeaderBox>
          <Link 
            to={link} 
            style={{ marginLeft: "20px",position: "absolute"}}>
            <LogoBox src={logo} alt="Logo"/>
          </Link>
          <TitleBox>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </TitleBox>
        </HeaderBox>
    )
}