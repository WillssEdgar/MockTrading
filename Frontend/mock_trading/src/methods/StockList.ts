import axios from "axios";

export async function getStockList(
  setStockList: (data: any) => void,

) {
  try {
    const response = await axios.get("http://localhost:8080/getStockList");

    console.log("Response of Stock List", response.data);
    setStockList(response.data);
  } catch (error) {
    console.error("Error", error);
  }
}
