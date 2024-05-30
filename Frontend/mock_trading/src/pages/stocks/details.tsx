
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCompanyInfo, fetchCompanyInfoRange, purchaseStock } from "../../methods/StockMethods";
import LineChart from "../../components/Charts/LineChart";
import TimeSelector from "../../components/Time/TimeSelector";
interface CompanyInfo {
  message: any;
}

interface FinancialData {
  dates: string[];
  value: number[];
}
function Details() {
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
  const [symbol, setSymbol] = useState<string>("MSFT");
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

  useEffect(() => {
    if (location.state) {
      setSymbol(location.state.symbol);
      console.log("Email in Details", email);
    }
  }, [location.state]);


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
  const handleTimeSelect = (option: string) => {
    fetchChartData(option);
  };
  const handlePurchase = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const purchaseAmountElement = form.elements.namedItem("amountOfShare") as HTMLInputElement;
    const purchaseAmount = parseInt(purchaseAmountElement.value, 10);
    if (info) {


      if (!isNaN(purchaseAmount)) {
        const response = await purchaseStock(symbol, info.message[0].meta.regularMarketPrice, purchaseAmount);
        console.log(response);
      }
    }
  }
  return (
    <div>
      <header className="bg-white mb-6">
        <div className="container mx-auto py-6 px-4 flex flex-col items-center md:flex-row md:justify-between">
          <h1 className="text-5xl font-bold text-center md:text-left">
            {symbol && <span>{symbol}</span>}
          </h1>
        </div>
      </header>
      <div className="container mx-auto bg-red-50 p-4 rounded-lg shadow-lg">
        <div className="w-full flex flex-col justify-center items-center">
          <h1>Line Chart Example</h1>
          {dataError && <p>Error: {dataError}</p>}
          <div className="chart-container" style={{ width: '80%', height: '60%' }}>

            <LineChart data={data} />
            <div className='text-start'>
              <TimeSelector onSelect={handleTimeSelect} />
            </div>

          </div>

        </div>
      </div>
      <div className="container mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col bg-blue-100 rounded-lg p-4 shadow-lg ">
          {infoError && <p>Error: {infoError}</p>}
          {info && (
            <>
              <div className="m-2">
                <p className="text-lg font-semibold mb-4">Key Metrics</p>
                <p className="text-base">
                  Regular Market Price: {info.message[0].meta.regularMarketPrice}
                </p>
                <p className="text-base">
                  Fifty Two Week Low: {info.message[0].meta.fiftyTwoWeekLow}
                </p>
                <p className="text-base">
                  Fifty Two Week High: {info.message[0].meta.fiftyTwoWeekHigh}
                </p>
              </div>
              <div className="m-2">
                <p className="text-lg font-semibold mb-4">Market Trends</p>
                <p className="text-base">
                  First Trade Date: {info.message[0].meta.firstTradeDate}
                </p>
                <p className="text-base">
                  Full Exchange Name: {info.message[0].meta.fullExchangeName}
                </p>
                <p className="text-base">
                  Regular Market Day High: {info.message[0].meta.regularMarketDayHigh}
                </p>
              </div>
              <form onSubmit={handlePurchase}>
                <label className="block text-gray-700 text-sm font-bold " htmlFor="amountOfShare">
                  Number of Shares
                </label>
                <input
                  type="number"
                  className="bg-gray-50 appearance-none border-2 rounded-lg w-1/4 py-2
                  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amountOfShare"
                  name='amountOfShare'
                  required
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                  rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit">
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;

