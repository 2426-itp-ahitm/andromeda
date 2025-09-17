import { Model } from '../interfaces/Model';

/**
 * Service for managing voice recognition models
 * API Endpoints:
 * GET    /api/models              - Get all models
 */
export class ModelService {
    private static instance: ModelService;

    private basicURL : string = 'http://localhost:9001/api/api';
    private constructor() {}

    public static getInstance(): ModelService {
        if (!ModelService.instance) {
            ModelService.instance = new ModelService();
        }
        return ModelService.instance;
    }

    // GET /api/models
    public async getModels(): Promise<Model[]> {
            try {
                const response = await fetch(this.basicURL + '/andromeda/model/getModels');
                if (!response.ok) {
                    throw new Error('Failed to fetch commands');
                }

                const data = await response.json();

                  const response2 = await fetch('http://localhost:65323/get-json');
                if (!response.ok) {
                    throw new Error('Failed to fetch commands');
                }
                const data2 = await response2.json();
                console.log(data2);

                

                return data as Model[];
            } catch (error) {
                console.error('Network error:', error);
                throw new Error('Network error: Could not fetch commands. Is the backend running and the URL correct?');
            }
        }
} 