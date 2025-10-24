import axios from 'axios';
import type { LeetCodeStats, CodeChefStats, HackerRankStats, CodeforcesStats } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// LeetCode API
export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/leetcode/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw error;
  }
};

// CodeChef API (Web Scraping)
export const fetchCodeChefStats = async (username: string): Promise<CodeChefStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/codechef/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    throw error;
  }
};

// HackerRank API (Web Scraping)
export const fetchHackerRankStats = async (username: string): Promise<HackerRankStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hackerrank/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching HackerRank stats:', error);
    throw error;
  }
};

// Codeforces API (Official)
export const fetchCodeforcesStats = async (username: string): Promise<CodeforcesStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/codeforces/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error);
    throw error;
  }
};
