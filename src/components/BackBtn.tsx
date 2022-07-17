import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBackBtn = styled.button`
  left: 0;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 15px;
  font-size: 20px;
  opacity: 0.3;
  transition: opacity 0.1s linear;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

function BackBtn() {
  const navigate = useNavigate();

  return (
    <StyledBackBtn onClick={() => navigate(-1)}>
      <span>🔙</span>
    </StyledBackBtn>
  );
}

export default BackBtn;
