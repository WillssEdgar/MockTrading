
export default function Services() {
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <div className=" w-full max-w-4xl mx-auto p-10 mb-10">
        <h1 className="text-5xl font-bold text-start text-blue-600 mb-6">Our Services</h1>
        <p className="text-lg text-gray-700 mb-6 text-start font-semibold">
          At StockSim, we offer a range of services designed to help you master the stock market. Whether you are a beginner looking to learn the basics or an experienced trader aiming to refine your skills, we have something for everyone.
        </p>

        {/* Service Sections */}
        <div className="space-y-10">
          {/* Service 1 */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Real-Time Market Data</h2>
            <p className="text-lg text-gray-700">
              Access up-to-the-minute data on stock prices, market trends, and trading volumes. Our real-time data service ensures that you have the latest information at your fingertips to make informed trading decisions.
            </p>
          </div>

          {/* Service 2 */}
          <div >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Educational Resources</h2>
            <p className="text-lg text-gray-700">
              Dive into our extensive library of educational materials, including articles, tutorials, videos, and webinars. Learn about trading strategies, market analysis, risk management, and more from industry experts.
            </p>
          </div>

          {/* Service 3 */}
          <div >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Virtual Trading Simulator</h2>
            <p className="text-lg text-gray-700">
              Practice trading in a risk-free environment with our virtual trading simulator. Build and manage a simulated portfolio, execute trades in real-time, and track your performance with detailed analytics.
            </p>
          </div>

          {/* Service 4 */}
          <div >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Performance Analytics</h2>
            <p className="text-lg text-gray-700">
              Use our advanced analytics tools to monitor your trading performance. Analyze your trades, track your portfolio growth, and gain insights to improve your trading strategies.
            </p>
          </div>

          {/* Service 5 */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Interactive Tutorials and Webinars</h2>
            <p className="text-lg text-gray-700">
              Participate in interactive tutorials and live webinars hosted by trading professionals. Engage with instructors, ask questions, and gain practical knowledge to enhance your trading skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

