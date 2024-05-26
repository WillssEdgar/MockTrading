
import { useState, useEffect, FormEvent } from "react";
import axios from 'axios';
import LineChart from "../../components/Charts/LineChart";
import { fetchCompanyInfo, handleSubmit as submitHandler } from '../../methods/StockMethods';

interface dataSet {
  message: number;
}

interface FormData {
  symbol: string;
}

interface CompanyInfo {
  message: any; // Adjust this type according to the structure of the data returned by your endpoint
}

function Home() {
  const [data, setData] = useState<number | null>(null); // State for fetched data
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [formData, setFormData] = useState<FormData>({ symbol: '' }); // State for form data

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/price');
        setData(response.data.message);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  useEffect(() => {
    // const fetchCompanyInfo = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8080/Info/${symbol}`);
    //     console.log("Response Data", response.data)
    //     setInfo(response.data);
    //
    //   } catch (error) {
    //
    //     setInfoError("Error fetching data");
    //     console.error('Error fetching company info:', error);
    //   }
    // };
    // fetchCompanyInfo();
    fetchCompanyInfo(formData.symbol, setInfo, setInfoError);
    console.log("hello world")
  }, [formData.symbol]);

  // Handle input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit event
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //
  //   try {
  //     const response = await axios.get(`http://localhost:8080/company/${formData.symbol}`);
  //     setData(response.data); // Set the fetched data
  //   } catch (err) {
  //     setError('Error fetching stock price');
  //     console.error('Error:', err);
  //   }
  // };
  const handleSubmit = (e: FormEvent) => {
    submitHandler(e, formData.symbol, setData, setError);
    console.log("data from handle submit", data)
  }

  return (
    <div className="container ">
      <div className="w-full flex flex-col items-center">
        <h1>Line Chart Example</h1>
        <div className="chart-container" style={{ width: '80%', height: '60%' }}>
          <LineChart />
        </div>
      </div>
      <div className="columns-1 flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="m-4">
            <label htmlFor="symbol">Stock Symbol:</label>
          </div>
          <div className="m-4">
            <input
              className="shadow bg-gray-200 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol} // Bind input value to formData state
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="m-4">

            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Get Price
            </button>

          </div>
        </form>
        {data !== null && <div><h2>Price: {data}</h2></div>} {/* Display the price */}
        {error && <h2>{error}</h2>} {/* Display error message if any */}

      </div>
      {infoError && <p>Error: {infoError}</p>}
      {info ? (
        <div className="container flex flex-col items-center justify-center">
          <h1 className="mb-8 text-2xl font-bold">Company Information</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold mb-4">Key Metrics</p>
              <p className="text-base">Regular Market Price: {info.message[0].meta.regularMarketPrice}</p>
              <p className="text-base">Fifty Two Week Low: {info.message[0].meta.fiftyTwoWeekLow}</p>
              <p className="text-base">Fifty Two Week High: {info.message[0].meta.fiftyTwoWeekHigh}</p>

            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold mb-4">Market Trends</p>
              <p className="text-base">First Trade Date: {info.message[0].meta.firstTradeDate}</p>

              <p className="text-base">Full Exchange Name: {info.message[0].meta.fullExchangeName}</p>
              <p className="text-base">Regular Market Day High: {info.message[0].meta.regularMarketDayHigh}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;

