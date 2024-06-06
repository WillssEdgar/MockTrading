import axios from "axios";
import { useState } from "react";

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

interface Stock {
  Id: number,
  Symbol: string,
  PurchaseDate: string,
  PurchasePrice: number,
  AmountOfShares: number,
  PortfolioID: number
}

interface List {
  stockList: Stock[]
}



export async function getStock(
  email: string,
  setStock: (data: any) => void,

) {

  try {
    const portfolio = await getPortfolio(email);
    const portfolioID = portfolio.ID;
    const response = await axios.get(`http://localhost:8080/getStocks/${portfolioID}`);

    console.log("Response of Stock List", response.data);
    setStock(response.data);


  } catch (error) {
    console.error("Error", error);
  }
}
