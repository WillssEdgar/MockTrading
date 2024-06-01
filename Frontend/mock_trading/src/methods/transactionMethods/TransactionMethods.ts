import axios from "axios";

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
