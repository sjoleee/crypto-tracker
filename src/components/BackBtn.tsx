import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledBackBtn = styled.button`
  position: relative;

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

interface Props {
  className?: string;
}

function BackBtn({ className }: Props) {
  return (
    <StyledBackBtn className={className}>
      <Link to="/crypto-tracker">
        <span>◀︎</span>
      </Link>
    </StyledBackBtn>
  );
}

export default BackBtn;
