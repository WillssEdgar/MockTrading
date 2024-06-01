import axios from "axios";
import { FormEvent } from "react";

export async function fetchPortfolioInfo(
  email: string,
  setInfo: (data: any) => void,
  setInfoError: (message: string) => void
) {
  try {
    const response = await axios.get(`http://localhost:8080/portfolio/${email}`);
    console.log("Fetch Portfolio Info ", response.data)
    setInfo(response.data);
  } catch (error) {
    setInfoError("Error fetching data");
  }
}

export async function fetchCompanyInfo(
  symbol: string,
  setInfo: (data: any) => void,
  setInfoError: (message: string) => void
) {
  try {
    const response = await axios.get(`http://localhost:8080/Info/${symbol}`);
    setInfo(response.data);
  } catch (error) {
    setInfoError("Error fetching data");
  }
}

export async function fetchCompanyInfoRange(
  symbol: string,
  range: string,
  setInfo: (data: any) => void,
  setInfoError: (message: string) => void
) {
  try {
    const response = await axios.get(`http://localhost:8080/Info/?symbol=${symbol}&range=${range}`);
    console.log("Response Data for a manth: ", response.data)
    setInfo(response.data);
  } catch (error) {
    setInfoError("Error fetching data");
  }
}


export async function handleSubmit(
  e: FormEvent,
  symbol: string,
  setData: (data: any) => void,
  setError: (message: string | null) => void
) {
  e.preventDefault();
  setError(null);
  try {
    const response = await axios.get(`http://localhost:8080/company/${symbol}`);
    console.log("response for handleSubmit: ", response.data)
    setData(response.data.message);
  } catch (err) {
    setError('Error fetching stock price');
    console.error('Error: ', err);
  }
}

interface Stock {
  symbol: string;
  purchaseDate: string;
  purchasePrice: number;
  amountOfShares: number;
  portfolioID: number;

}

export async function getPortfolio(
  email: string
) {
  try {
    const response = await axios.get(`http://localhost:8080/portfolio/${email}`);
    console.log("Response", response)
    return response.data;
  } catch (error) {
    console.error("error fetching portfolio", error);
  }
}

interface UpdateBalance {
  email: string;
  balance: number;
}

export async function updateBalance(
  email: string,
  balance: number
) {
  try {
    const response = await axios.post<UpdateBalance>(`http://localhost:8080/updateBalance`,
      {
        "Email": email,
        "Balance": balance
      });
    console.log("Response", response)
    return response.data;
  } catch (error) {
    console.error("error fetching portfolio", error);
  }
}

interface Transaction {
  TransactionDate: string;
  TransactionType: string;
  NewBalance: number;
  PortfolioID: number;
}


export async function purchaseStock(
  symbol: string,
  email: string,
  price: number,
  amount: number,
) {
  const currentDate = new Date();

  // Extract the month, day, and year
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = String(currentDate.getFullYear()).slice(-2); // Get the last two digits of the year

  // Combine them into the desired format
  const formattedDate = month + day + year;
  console.log("Date", formattedDate);
  console.log("Price", price);
  console.log("amount", amount);



  try {
    const portfolio = await getPortfolio(email);
    if (!portfolio || !portfolio.ID) {
      throw new Error("Portfolio not found or invalid ID");
    }
    const balance = portfolio.Balance;
    const amountSpent = amount * price;
    const newBalance = amountSpent + balance;
    const response = await axios.post<Transaction>("http://localhost:8080/purchase",
      {
        "Symbol": symbol,
        "PurchaseDate": formattedDate,
        "PurchasePrice": price,
        "AmountOfShares": amount,
        "PortfolioID": portfolio.ID

      }
    )
    const transactionResponse = await axios.post<Stock>("http://localhost:8080/addTransaction",
      {
        "TransactionDate": formattedDate,
        "TransactionType": "BOUGHT",
        "NewBalance": newBalance,
        "PortfolioID": portfolio.ID

      }
    )
    updateBalance(email, newBalance);

    console.log("Stock Response", response.data)
    console.log("Transaction Response", transactionResponse.data)

  } catch (error) {
    console.error("Failed to Complete Purchase")
  }

}
