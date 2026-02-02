import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return res.data;
};