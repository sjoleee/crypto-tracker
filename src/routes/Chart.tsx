import { useQuery } from "react-query";
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
}

interface ChartProps {
  coinId?: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<HistoryData>(["history", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return <div>chart</div>;
}

export default Chart;
