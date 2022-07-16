import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

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

function Chart({ coinId, name }: ChartProps) {
  const { isLoading, data, isError, error } = useQuery<HistoryData[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );

  console.log(error, isError);

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
          type="line"
          options={{
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },

            grid: { show: false },
            stroke: {
              colors: ["#00cec9"],
              width: 3,
              curve: "smooth",
            },
            theme: {
              mode: "dark",
            },
            xaxis: {
              categories: data?.map((item) => {
                let date = new Date(Number(item.time_close) * 1000);
                var year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
                var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
                var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
                var returnDate = year + "." + month + "." + day + ". ";
                return returnDate;
              }),
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
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
              name: `${name}`,
              data: data?.map((item) => Number(item.close)) as number[],
            },
          ]}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
