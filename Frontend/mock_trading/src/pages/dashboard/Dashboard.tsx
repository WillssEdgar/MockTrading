import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import LineChart from "../../components/Charts/LineChart";
import { fetchCompanyInfo } from "../../methods/StockMethods";


interface CompanyInfo {
  message: any; // Adjust this type according to the structure of the data returned by your endpoint
}
export default function Dashboard() {
  const location = useLocation();
  const email = location.state.email;
  console.log("Email", email);
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);

  useEffect(() => {
    if (email) {
      fetchCompanyInfo("AAPL", setInfo, setInfoError)
    }
  }, [email]);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto bg-red-50 p-4 rounded-lg shadow-lg">
        <div className="w-full flex flex-col justify-center items-center">
          <h1>Line Chart Example</h1>
          <div className="chart-container" style={{ width: '80%', height: '60%' }}>
            <LineChart />
          </div>
        </div>
      </div>
      <div className="container mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col bg-blue-100 rounded-lg p-4 shadow-lg items-center">
          {infoError && <p>Error: {infoError}</p>}
          {info && (
            <>
              <div className="m-2">
                <p className="text-lg font-semibold mb-4">Key Metrics</p>
                <p className="text-base">Regular Market Price: {info.message[0].meta.regularMarketPrice}</p>
                <p className="text-base">Fifty Two Week Low: {info.message[0].meta.fiftyTwoWeekLow}</p>
                <p className="text-base">Fifty Two Week High: {info.message[0].meta.fiftyTwoWeekHigh}</p>
              </div>
              <div className="m-2">
                <p className="text-lg font-semibold mb-4">Market Trends</p>
                <p className="text-base">First Trade Date: {info.message[0].meta.firstTradeDate}</p>
                <p className="text-base">Full Exchange Name: {info.message[0].meta.fullExchangeName}</p>
                <p className="text-base">Regular Market Day High: {info.message[0].meta.regularMarketDayHigh}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col bg-blue-100 rounded-lg p-4 shadow-lg items-center">
          <p>User Portfolio</p>
        </div>
      </div>
    </div >
  )
}

