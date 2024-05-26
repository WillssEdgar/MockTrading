import axios from "axios";

export async function fetchUser(
  email: string,
  setUser: (data: any) => void,
) {
  try {
    const response = await axios.get(`http://localhost:8080/userinfo/${email}`);
    console.log("Response ", response.data)
    setUser(response.data)
  } catch (error) {
    console.error("Error fetching User Info: ", error);
  }
}
