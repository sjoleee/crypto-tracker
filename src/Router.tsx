import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  themeToggle: () => void;
  isDark: boolean;
}

function Router({ themeToggle, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/crypto-tracker"
          element={<Coins themeToggle={themeToggle} />}
        />
        <Route
          path="/crypto-tracker/:coinId/*"
          element={<Coin isDark={isDark} themeToggle={themeToggle} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
