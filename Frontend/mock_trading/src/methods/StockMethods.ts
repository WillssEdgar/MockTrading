import axios from "axios";
import { FormEvent } from "react";

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
}

export async function purchaseStock(
  symbol: string,

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
    const response = await axios.post<Stock>("http://localhost:8080/purchase",
      {
        "Symbol": symbol,
        "PurchaseDate": formattedDate,
        "PurchasePrice": price,
        "AmountOfShares": amount,

      }
    )

    console.log(response)

  } catch (error) {
    console.error("Failed to Complete Purchase")
  }

}
