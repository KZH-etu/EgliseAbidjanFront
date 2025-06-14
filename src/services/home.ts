import api from "./clientService";
import { HomePageDto } from "../types/homepage";


export const fetchHome = () => api.get<HomePageDto>('/home');