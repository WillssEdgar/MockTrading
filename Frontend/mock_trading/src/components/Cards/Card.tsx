import { useEffect, useState } from 'react'
import { fetchCompanyInfo } from '../../methods/StockMethods';
import CardChart from '../Charts/CardChart';
import { useNavigate } from 'react-router-dom';

interface CompanyInfo {
  message: any;
}

interface FinancialData {
  dates: string[];
  value: number[];
}

interface CardProps {
  stockdata: {
    stocksymbol: string;

  };
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ stockdata, onClick }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [data, setData] = useState<FinancialData>({ dates: [], value: [] });
  const [dataError, setDataError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>("AAPL");


  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        await fetchCompanyInfo(stockdata.stocksymbol, setInfo, setInfoError);
      } catch (error) {
        setInfoError('Error fetching company info');
      }
    };
    fetchCompanyData();
  }, [stockdata.stocksymbol]);

  useEffect(() => {
    if (info) {
      const chartData = info.message[0];
      const timestamps = chartData.timestamp;
      const values = chartData.indicators.quote[0].close;
      const formattedDates = timestamps.map((timestamp: number) =>
        new Date(timestamp * 1000).toLocaleDateString()
      );

      setData({ dates: formattedDates, value: values });
    }
  }, [info]);

  return (
    <div className=" cursor-pointer container bg-blue-100 hover:bg-blue-200 rounded-lg p-4 mb-4 shadow-lg items-center"
      onClick={onClick}>
      <h1 className="title">{stockdata.stocksymbol}</h1>
      {dataError && <p className="error">Error: {dataError}</p>}
      <div className="chart-container">
        {data ? (
          <CardChart data={data} />
        ) : (
          <p className="loading">Loading chart...</p>
        )}
      </div>
    </div>
  );

}

export default Card; 
