import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import BackBtn from "../components/BackBtn";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import ToggleBtn from "../components/ToggleBtn";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.1s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
`;

const Loading = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  align-items: center;
  font-size: 50px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <Container>
        <Helmet>
          <title>코인</title>
        </Helmet>
        <Header>
          <div></div>
          <Title>코인</Title>
          <ToggleBtn />
        </Header>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/crypto-tracker/${coin.id}`,
                  }}
                  state={coin.name}
                >
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  ></Img>
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </>
  );
}

export default Coins;
