import axios from "axios";

const API_KEY = "qcvl1acoah0Lix4Z7HRdVazNrUhfh0bqNP2sPnxS";

const axiosInstance = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1",
});

export const searchFoods = async (query: string) => {
  const res = await axiosInstance.post(`/foods/search?api_key=${API_KEY}`, {
    query,
    pageSize: 5,
  });

  return res.data;
};
