import axios from "axios";
import { FormEvent } from "react";

export async function fetchCompanyInfo(
  symbol: string,
  setInfo: (data: any) => void,
  setInfoError: (message: string) => void
) {
  try {
    const response = await axios.get(`http://localhost:8080/Info/${symbol}`);
    console.log("Response Data: ", response.data)
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
