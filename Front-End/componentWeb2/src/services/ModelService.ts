import { Model } from '../interfaces/Model';

/**
 * Service for managing voice recognition models
 * API Endpoints:
 * GET    /api/models              - Get all models
 */
export class ModelService {
    private static instance: ModelService;
    private models: Model[] = [
        { id: 1, name: 'Vosk1', size: '1.2GB', status: 'active', language: 'English', percision: 0.95 },
        { id: 2, name: 'Vosk2', size: '1.5GB', status: 'inactive', language: 'German', percision: 0.92 },
        { id: 3, name: 'Vosk3', size: '1.8GB', status: 'inactive', language: 'French', percision: 0.91 },
        { id: 4, name: 'Vosk4', size: '2.0GB', status: 'inactive', language: 'Spanish', percision: 0.93 },
        { id: 5, name: 'Vosk5', size: '1.6GB', status: 'inactive', language: 'Italian', percision: 0.90 },
        { id: 6, name: 'Vosk6', size: '1.9GB', status: 'inactive', language: 'Portuguese', percision: 0.89 },
        { id: 7, name: 'Vosk7', size: '1.7GB', status: 'inactive', language: 'Russian', percision: 0.88 },
        { id: 8, name: 'Vosk8', size: '2.1GB', status: 'inactive', language: 'Chinese', percision: 0.87 },
        { id: 9, name: 'Vosk9', size: '1.4GB', status: 'inactive', language: 'Japanese', percision: 0.86 },
        { id: 10, name: 'Vosk10', size: '1.3GB', status: 'inactive', language: 'Korean', percision: 0.85 }
    ];
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
                return data as Model[];
            } catch (error) {
                console.error('Network error:', error);
                throw new Error('Network error: Could not fetch commands. Is the backend running and the URL correct?');
            }
        }
} 