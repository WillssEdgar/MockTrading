import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LineChart from "../../components/Charts/LineChart";
import { fetchPortfolioInfo } from "../../methods/StockMethods";
import Card from "../../components/Cards/Card";
import PieChart from "../../components/Charts/PieChart";
import { getStockList } from "../../methods/StockList";
import { getStock } from "../../methods/transactionMethods/TransactionMethods";
import TransactionCard from "../../components/Cards/TransactionCard";

interface CompanyInfo {
  message: any;
}

interface FinancialData {
  dates: string[];
  value: number[];
}

interface Stock {
  Symbol: string;
  Name: string;
}

interface OwnedStock {
  AmountOfShares: number;
  Id: number;
  PortfolioID: number;
  PurchaseDate: string;
  PurchasePrice: number;
  Symbol: string;
}

type OwnedStockList = OwnedStock[];

interface StockList {
  stocks: Stock[];
}

interface PieData {
  labels: string[];
  values: number[];
}

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  if (!email) {
    navigate("/");
  }

  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [data, setData] = useState<FinancialData>({ dates: [], value: [] });
  const [stockList, setStockList] = useState<StockList | null>(null);
  const [stock, setStock] = useState<OwnedStockList | null>(null);
  const [pieData, setPieData] = useState<PieData | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        await fetchPortfolioInfo(email, setInfo, setInfoError);
      } catch (error) {
        setInfoError("Error fetching company info");
      }
    };

    const fetchStockList = async () => {
      try {
        await getStockList(setStockList);
        console.log("THis is the stock list in dashboard: ", stockList);
      } catch (error) {
        console.log("Error", error);
      }
    };

    const fetchStock = async () => {
      try {
        await getStock(email, setStock);
      } catch (error) {
        console.log("Error fetching stock", error);
      }
    };

    if (email) {
      fetchPortfolioData();
      fetchStockList();
      fetchStock();
    }
  }, [email]);

  useEffect(() => {
    const updatePieData = () => {
      const PieMap = new Map<string, number>();

      if (stock) {
        for (let i = 0; i < stock.length; i++) {
          const amount = stock[i].AmountOfShares;
          const newSymbol = stock[i].Symbol;

          if (PieMap.has(newSymbol)) {
            const existingAmount = PieMap.get(newSymbol) ?? 0;
            const newAmount = existingAmount + amount;

            PieMap.set(newSymbol, newAmount);
          } else {
            PieMap.set(newSymbol, amount);
          }
        }

        setPieData({
          labels: Array.from(PieMap.keys()),
          values: Array.from(PieMap.values()),
        });
      }
    };

    updatePieData();
  }, [stock]);

  const lineData = {
    dates: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    value: [12, 19, 3, 5, 2, 3],
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <div className="p-4 mb-4 w-full">
            <div className="flex flex-row gap-2 justify-center items-center">
              <div className="container mx-auto bg-slate-200 p-4 rounded-lg shadow-lg h-60">
                <div className="text-xl">
                  Current Balance:{" "}
                  <span className="font-bold">$1,832,022.23</span>
                  <div className="scroll-smooth overflow-auto m-4 h-40">
                    {stock &&
                      stock.map((stockItem, index) => (
                        <TransactionCard
                          key={index}
                          stockdata={{
                            AmountOfShares: stockItem.AmountOfShares,
                            Id: stockItem.Id,
                            PortfolioID: stockItem.PortfolioID,
                            PurchaseDate: stockItem.PurchaseDate,
                            PurchasePrice: stockItem.PurchasePrice,
                            Symbol: stockItem.Symbol,
                          }}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="container mx-auto bg-slate-200 p-4 rounded-lg shadow-lg h-60">
                <div>
                  <h1> Pie Chart Data </h1>
                  <PieChart data={pieData ?? { labels: [], values: [] }} />
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 m-3 w-full">
            <LineChart data={lineData} />
          </div>
        </div>
        <div className="p-4">
          {stockList?.map(
            (stock: { Symbol: string; Name: string }, index: number) => (
              <div
                key={index}
                className="flex justify-center items-center mb-4"
              >
                <Card
                  key={index}
                  stockdata={{
                    stocksymbol: stock.Symbol,
                    stockName: stock.Name,
                  }}
                  onClick={() =>
                    navigate("/Details", {
                      state: { symbol: stock.Symbol, email: email },
                    })
                  }
                />
              </div>
            ),
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
