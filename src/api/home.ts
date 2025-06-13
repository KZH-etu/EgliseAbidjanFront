import api from "./client";
import { HomePageDto } from "./types/homepage";


export const fetchHome = () => api.get<HomePageDto>('/home');