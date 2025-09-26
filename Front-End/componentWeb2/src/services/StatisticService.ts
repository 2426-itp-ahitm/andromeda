import { Statistics } from '../interfaces/Statistics';

/**
 * Service for managing statistics
 * API Endpoints:
 * GET    /api/statistics              - Get statistics
 */
export class StatisticService {
    private static instance: StatisticService;
    private basicURL: string = 'http://localhost:9001/api/api';
    private constructor() {}

    public static getInstance(): StatisticService {
        if (!StatisticService.instance) {
            StatisticService.instance = new StatisticService();
        }
        return StatisticService.instance;
    }

    // GET /api/statistics
    public async getStatistics(): Promise<Statistics> {
        try {
            const response = await fetch(this.basicURL + '/andromeda/statistics/get');
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const data = await response.json();
            return data as Statistics;
        } catch (error) {
            console.error('Network error:', error);
            throw new Error('Network error: Could not fetch statistics. Is the backend running and the URL correct?');
        }
    }
}

