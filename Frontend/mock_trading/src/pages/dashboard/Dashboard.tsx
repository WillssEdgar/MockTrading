
// Import necessary libraries and components
import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LineChart from '../../components/Charts/LineChart';
import { fetchCompanyInfo, fetchCompanyInfo1M, fetchCompanyInfoRange, purchaseStock } from '../../methods/StockMethods';
import Card from '../../components/Cards/Card';
import Carousel from '../../components/Carousel/Carousel';
import TimeSelector from '../../components/Time/TimeSelector';

interface CompanyInfo {
  message: any;
}

interface FinancialData {
  dates: string[];
  value: number[];
}

const defaultStockNames: string[] = ['AAPL', 'MSFT', 'IBM', 'GOOG', 'AMZN', 'TSLA', 'RDDT', 'INTC', 'RIVN', 'NVDA']

const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  console.log('Email', email);
  if (!email) {
    navigate("/");
  }

  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [data, setData] = useState<FinancialData>({ dates: [], value: [] });
  const [dataError, setDataError] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);



  useEffect(() => {
    console.log("Component loaded and useEffect triggered");

    const fetchCompanyData = async () => {
      try {
        await fetchCompanyInfo('AAPL', setInfo, setInfoError);
      } catch (error) {
        setInfoError('Error fetching company info');
      }
    };

    if (email) {
      fetchCompanyData();
    }
  }, [email]);

  useEffect(() => {
    if (info) {
      const chartData = info.message[0];
      console.log("chartData", chartData);

      const timestamps = chartData.timestamp;
      console.log("TimeStamps: ", timestamps);

      const values = chartData.indicators.quote[0].close;
      console.log("Values: ", values);

      const formattedDates = timestamps.map((timestamp: number) =>
        new Date(timestamp * 1000).toLocaleDateString()
      );

      setData({ dates: formattedDates, value: values });
      console.log("Data in fetchCompanyData: ", data);
    }
  }, [info]);

  const fetchChartData = async (range: string) => {
    try {

      await fetchCompanyInfoRange('AAPL', range, setInfo, setInfoError);
      if (info) {
        const chartData = info.message[0];
        console.log("chartData", chartData);

        const timestamps = chartData.timestamp;
        console.log("TimeStamps: ", timestamps);

        const values = chartData.indicators.quote[0].close;
        console.log("Values: ", values);

        const formattedDates = timestamps.map((timestamp: number) =>
          new Date(timestamp * 1000).toLocaleDateString()
        );

        setData({ dates: formattedDates, value: values });
        console.log("Data in fetchCompanyData: ", data);
      }

    } catch (error) {
      setDataError('Error fetching chart data');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = event.target.value;
    fetchChartData(selectedRange);
  };

  const handleTimeSelect = (option: string) => {
    setSelectedTime(option);
    fetchChartData(option);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto bg-slate-200 p-4 rounded-lg shadow-lg">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className='text-3xl'>Line Chart Example</h1>
          {dataError && <p>Error: {dataError}</p>}
          <div className="chart-container" style={{ width: '80%', height: '60%' }}>
            <LineChart data={data} />
          </div>
        </div>
        <div className='text-start'>
          <TimeSelector onSelect={handleTimeSelect} />
        </div>
      </div>
      <div>
        <Carousel stockNames={defaultStockNames} email={email} />
      </div>
    </div>
  );
};

export default Dashboard;

