import axios from "axios";
import { Chapter } from "../types/Chapter";

const API_BASE_URL = "http://localhost:5000/api";

export const getChapters = async (): Promise<Chapter[]> => {
  const response = await axios.get(`${API_BASE_URL}/chapters`);
  return response.data;
};
