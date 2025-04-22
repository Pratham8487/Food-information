import axios from "axios";

const API_KEY = "qcvl1acoah0Lix4Z7HRdVazNrUhfh0bqNP2sPnxS";

const axiosInstance = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllFoods = async () => {
  const res = await axiosInstance.get(`/foods/search?api_key=${API_KEY}`, {
    params: { pageSize: 50 },
  });
  console.log(res.data);
  return res.data;
};

interface Food {
  fdcId: string;
  description?: string;
  brandOwner?: string;
  foodCategory?: string;
}

interface ApiResponse {
  foods: Food[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export const getFoods = async (
  pageNumber = 1,
  pageSize = 25
): Promise<ApiResponse> => {
  const res = await axiosInstance.get(`/foods/search?api_key=${API_KEY}`, {
    params: {
      pageSize,
      pageNumber,
    },
  });

  return {
    foods: res.data.foods,
    totalHits: res.data.totalHits,
    currentPage: pageNumber,
    totalPages: Math.ceil(res.data.totalHits / pageSize),
    pageSize,
  };
};

export const searchFoods = async (
  query: string,
  pageNumber = 1,
  pageSize = 25
): Promise<ApiResponse> => {
  const res = await axiosInstance.get(`/foods/search?api_key=${API_KEY}`, {
    params: {
      query,
      pageSize,
      pageNumber,
    },
  });

  return {
    foods: res.data.foods,
    totalHits: res.data.totalHits,
    currentPage: pageNumber,
    totalPages: Math.ceil(res.data.totalHits / pageSize),
    pageSize,
  };
};
