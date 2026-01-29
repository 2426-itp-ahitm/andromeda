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
                // Get models from main API
                const response = await fetch(this.basicURL + '/andromeda/model/getModels');
                if (!response.ok) {
                    throw new Error('Failed to fetch models');
                }
                const models = await response.json() as Model[];

                // Get download status from local API
                const statusResponse = await fetch('http://localhost:65323/get-json');
                if (!statusResponse.ok) {
                    throw new Error('Failed to fetch download status');
                }
                const statusData = await statusResponse.json();

                // Update model status based on download information
                return models.map(model => ({
                    ...model,
                    status: statusData.active_speach_module === model.name ? 'active' :
                            statusData.downloaded_modules.includes(model.name) ? 'inactive' :
                            'not downloaded'
                }));
            } catch (error) {
                console.error('Network error:', error);
                throw new Error('Network error: Could not fetch models. Is the backend running and the URL correct?');
            }
        }
} 