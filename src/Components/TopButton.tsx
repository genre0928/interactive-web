import styled from "styled-components";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  font-weight: bold;
  position: fixed;
  border-radius: 50%;
  right: 10px;
  bottom: 20px;
  cursor: pointer;
`;

function TopButton() {
  const onMovedTop = () => {
    window.scrollTo(0, 0);
  };
  return <Wrapper onClick={onMovedTop}>Top</Wrapper>;
}

export default TopButton;
