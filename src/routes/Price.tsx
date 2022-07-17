import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atoms";

interface HistoryData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
  error?: string;
}

interface ChartProps {
  coinId?: string;
  name?: string;
}

const Oops = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  align-items: center;
  font-size: 50px;
  span {
    font-size: 15px;
  }
`;

const Loading = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  align-items: center;
  font-size: 50px;
`;

function Price({ coinId, name }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data, isError, error } = useQuery<HistoryData[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );

  return (
    <div>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : data?.hasOwnProperty("error") ? (
        <Oops>
          Oops!<span>sorry, there is no price information. </span>
        </Oops>
      ) : (
        <ApexChart
          type="candlestick"
          options={{
            tooltip: {
              enabled: true,
            },

            grid: { show: false },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: { labels: { show: false } },
            chart: {
              background: "transparent",
              toolbar: { show: false },
              id: `${name}`,
              height: 300,
              width: 500,
            },
          }}
          series={[
            {
              data: data?.map((item) => {
                let dataArr = [];
                let priceArr = [];
                dataArr.push(item.time_close * 1000);
                priceArr.push(item.open);
                priceArr.push(item.high);
                priceArr.push(item.low);
                priceArr.push(item.close);
                dataArr.push(priceArr);

                return dataArr;
              }) as any,
            },
          ]}
        ></ApexChart>
      )}
    </div>
  );
}

export default Price;
