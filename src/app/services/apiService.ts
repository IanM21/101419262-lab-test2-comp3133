import axios from 'axios';
import { SpaceXApiResponse } from '../models/API';

const API_URL = 'https://api.spacexdata.com/v3/launches';

export const fetchSpaceXData = async (): Promise<SpaceXApiResponse[]> => {
    try {
        const response = await axios.get<SpaceXApiResponse[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching SpaceX data:', error);
        throw new Error('Failed to fetch SpaceX launch data');
    }
};

export const fetchSpaceXDataById = async (id: string): Promise<SpaceXApiResponse> => {
    try {
        const response = await axios.get<SpaceXApiResponse>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching SpaceX data for mission ${id}:`, error);
        throw new Error(`Failed to fetch SpaceX mission with ID: ${id}`);
    }
};

export const fetchSpaceXDataByYear = async (year: string): Promise<SpaceXApiResponse[]> => {
    try {
        const response = await axios.get<SpaceXApiResponse[]>(`${API_URL}?launch_year=${year}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching SpaceX data for year ${year}:`, error);
        throw new Error(`Failed to fetch SpaceX missions for year: ${year}`);
    }
};