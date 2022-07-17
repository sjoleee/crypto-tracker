import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

const ToggleWrapper = styled.div``;

const StyledToggleBtn = styled.button`
  position: relative;

  border: none;
  width: 70px;
  height: 35px;
  border-radius: 17.5px;
  font-size: 20px;
  padding: 1px;
  display: flex;
  background-color: ${(props) => props.theme.accentColor};
  align-items: center;
`;

const Circle = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => props.theme.bgColor};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  left: 4%;
  transform: ${({ isDark }) => (isDark ? "translateX(35px)" : null)};
  transition: ${({ isDark }) =>
    isDark ? "all 0.2s ease-in-out" : "all 0.2s ease-in-out"};
`;

function ToggleBtn() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <ToggleWrapper>
      <StyledToggleBtn onClick={toggleDarkAtom}>
        <Circle isDark={isDark}></Circle>
      </StyledToggleBtn>
    </ToggleWrapper>
  );
}

export default ToggleBtn;
