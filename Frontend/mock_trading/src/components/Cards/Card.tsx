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
    stockName: string;

  };
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ stockdata, onClick }) => {
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [data, setData] = useState<FinancialData>({ dates: [], value: [] });
  const [dataError, setDataError] = useState<string | null>(null);


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
    <div className="grid grid-rows-1 grid-cols-2 border border-black cursor-pointer   
      hover:bg-slate-200 rounded-lg px-0.5 shadow-lg items-center w-full"
      onClick={onClick}>
      <div className="text-lg text-start font-bold">
        {stockdata.stocksymbol}<br />
        <span className='text-sm font-normal'>
          ({stockdata.stockName})
        </span>

      </div>
      {dataError && <p className="error">Error: {dataError}</p>}
      <div >
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
