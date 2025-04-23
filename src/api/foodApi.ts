import axios from "axios";
import {  FoodSearchResponse } from "../types/Food";

const API_KEY = "qcvl1acoah0Lix4Z7HRdVazNrUhfh0bqNP2sPnxS";

const axiosInstance = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllFoods = async (): Promise<FoodSearchResponse> => {
  const res = await axiosInstance.get(`/foods/search?api_key=${API_KEY}`, {
    params: { pageSize: 50 },
  });
  console.log(res.data);
  return res.data;
};

export const getFoods = async (
  pageNumber = 1,
  pageSize = 25
): Promise<FoodSearchResponse> => {
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
): Promise<FoodSearchResponse> => {
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