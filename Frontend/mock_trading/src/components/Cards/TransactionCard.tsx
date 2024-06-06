import React from 'react'

interface OwnedStock {
  stockdata: {
    AmountOfShares: number
    Id: number
    PortfolioID: number
    PurchaseDate: string
    PurchasePrice: number
    Symbol: string
  }
}


function formatDate(dateString: string): string | null {
  if (dateString.length !== 6) {
    return null; // Handle invalid date format
  }
  console.log(dateString);
  const month = dateString.slice(0, 2);
  const day = dateString.slice(2, 4);
  const year = dateString.slice(4);

  return `${month}/${day}/${year}`;
}

const TransactionCard: React.FC<OwnedStock> = ({ stockdata }) => {

  const newDate = formatDate(stockdata.PurchaseDate);
  return (
    <div className="flex mb-4 bg-gray-100 rounded-lg p-4 shadow-md">
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800">
          {stockdata.Symbol}
          <br />
          <span className="text-base text-gray-500">
            Number of Shares: {stockdata.AmountOfShares}
          </span>
        </h3>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">
          {newDate}

        </p>
        <p className="text-sm font-medium text-gray-800">
          ${stockdata.PurchasePrice}
        </p>
      </div>
    </div>)
}

export default TransactionCard
