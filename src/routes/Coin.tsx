import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Tab = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 40px;
  background-color: ${(props) => (props.isActive ? "#0000001d" : "#00000050")};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    width: 100%;
  }
`;
const TabWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const DivisionLine = styled.div`
  background-color: #ffffff5a;
  width: 50px;
  height: 1px;
  margin-bottom: 3px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background-color: ${(props) => props.bgColor};
  margin-bottom: 30px;
`;

const OverviewItem = styled.div`
  margin: 0px 10px;
  display: flex;
  width: 150px;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  span: first-child {
    font-size: 15px;
    margin-top: 8px;
  }
  span: last-child {
    font-size: 25px;
    margin-bottom: 3px;
  } ;
`;

const Description = styled.p`
  margin: 20px 0px;
  border-radius: 15px;
  background-color: #00000050;
  padding: 20px;
`;

interface LocationParams {
  state?: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as LocationParams;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );

  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    { refetchInterval: 5000 }
  );
  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Header>
        <Title>{state ? state : loading ? "Loading..." : infoData?.name}</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview bgColor="#00000050">
            <OverviewItem>
              <span>Rank</span>
              <DivisionLine />
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <DivisionLine />
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OpenSource</span>
              <DivisionLine />
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>
          <Overview bgColor="#00cecb7d">
            <OverviewItem>
              <span>RealTime Price</span>
              <DivisionLine />
              <span>{`$${priceData?.quotes.USD.price.toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>
          {infoData?.description ? (
            <Description>{infoData?.description}</Description>
          ) : null}
          <TabWrapper>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </TabWrapper>
          <Routes>
            <Route path={`price`} element={<Price />}></Route>
            <Route
              path={`chart`}
              element={<Chart coinId={coinId} name={infoData?.name} />}
            ></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
