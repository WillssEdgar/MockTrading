

function Home() {





  return (
    <>
      <div className="container flex flex-col items-center justify-center min-h-screen  py-10">
        <div className=" w-full max-w-6xl  mb-20">
          <h1 className="text-3xl font-bold text-start text-black mb-1">Welcome to
            <span className="text-blue-600"> StockSim</span></h1>
          {/* <p className="text-lg text-gray-700 mb-6 font-semibold"> */}
          {/*   Welcome to StockSim, your ultimate platform to master the art of trading without any financial risk. */}
          {/*   Dive into the world of stock markets with real-time data, comprehensive educational resources, and a */}
          {/*   seamless, intuitive interface designed for both beginners and experienced traders. With StockSim, you */}
          {/*   can practice trading, build your virtual portfolio, and track your performance with advanced analytics. */}
          {/*   Whether you aim to sharpen your trading skills or understand market dynamics, our app offers a safe and */}
          {/*   engaging environment to achieve your goals. Sign up today and start your journey towards becoming a confident */}
          {/*   and informed trader. */}
          {/* </p> */}
          <p className="text-lg text-gray-700 mb-6 font-semibold">
            Master the art of trading with real-time data and risk-free simulations
          </p>

        </div>
      </div>
      <div className="container flex flex-col items-center justify-center min-h-screen  py-10">
        <div>
          <p className="text-lg text-gray-700 mb-6 font-semibold">
            Welcome to StockSim, your ultimate platform to master the art of trading without any financial risk.
            Dive into the world of stock markets with real-time data, comprehensive educational resources, and a
            seamless, intuitive interface designed for both beginners and experienced traders. With StockSim, you
            can practice trading, build your virtual portfolio, and track your performance with advanced analytics.
            Whether you aim to sharpen your trading skills or understand market dynamics, our app offers a safe and
            engaging environment to achieve your goals. Sign up today and start your journey towards becoming a confident
            and informed trader.
          </p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" w-full  mb-10">
            <h2 className="text-2xl font-bold text-start text-blue-600 mb-6">Key Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Real-time Market Data</li>
              <li>Comprehensive Educational Resources</li>
              <li>Advanced Portfolio Management</li>
              <li>Performance Tracking and Analytics</li>
              <li>Interactive Tutorials and Webinars</li>
            </ul>
          </div>

          <div className="w-full mb-16">
            <h2 className="text-2xl font-bold text-start text-blue-600 mb-6">How It Works</h2>
            <div className="text-lg text-gray-700 space-y-4">
              <p><span className="font-semibold">1. Sign Up:</span> Create your free account to get started.</p>
              <p><span className="font-semibold">2. Practice:</span> Use real-time market data to practice trading without financial risk.</p>
              <p><span className="font-semibold">3. Track:</span> Monitor your performance with advanced analytics and improve your strategies.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

