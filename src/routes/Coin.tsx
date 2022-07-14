import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const DivisionLine = styled.div`
  background-color: #ffffff5a;
  width: 50px;
  height: 1px;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OverviewItem = styled.div`
  border-radius: 15px;
  background-color: #6c5ce750;
  display: flex;
  width: 120px;
  height: 120px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  span: first-child {
    font-size: 15px;
    margin-top: 8px;
  }
  span: last-child {
    font-size: 30px;
    margin
  }
`;

const Description = styled.p`
  margin-top: 30px;
  border-radius: 10px;
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
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as LocationParams;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state ? state : loading ? "Loading..." : info?.name}</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <DivisionLine />
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <DivisionLine />
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OpenSource</span>
              <DivisionLine />
              <span>{info?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>
          {info?.description ? (
            <Description>{info?.description}</Description>
          ) : null}
        </>
      )}
    </Container>
  );
}

export default Coin;
