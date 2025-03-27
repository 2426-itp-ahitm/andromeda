import { Model } from '../interfaces/Model';

/**
 * Service for managing voice recognition models
 * API Endpoints:
 * GET    /api/models              - Get all models
 */
export class ModelService {
    private static instance: ModelService;
    private models: Model[] = [
        { name: 'Vosk1', size: '1.2GB', status: 'active', language: 'English' },
        { name: 'Vosk2', size: '1.5GB', status: 'inactive', language: 'German' },
        { name: 'Vosk3', size: '1.8GB', status: 'inactive', language: 'French' },
        { name: 'Vosk4', size: '2.0GB', status: 'inactive', language: 'Spanish' },
        { name: 'Vosk5', size: '1.6GB', status: 'inactive', language: 'Italian' },
        { name: 'Vosk6', size: '1.9GB', status: 'inactive', language: 'Portuguese' },
        { name: 'Vosk7', size: '1.7GB', status: 'inactive', language: 'Russian' },
        { name: 'Vosk8', size: '2.1GB', status: 'inactive', language: 'Chinese' },
        { name: 'Vosk9', size: '1.4GB', status: 'inactive', language: 'Japanese' },
        { name: 'Vosk10', size: '1.3GB', status: 'inactive', language: 'Korean' }
    ];

    private constructor() {}

    public static getInstance(): ModelService {
        if (!ModelService.instance) {
            ModelService.instance = new ModelService();
        }
        return ModelService.instance;
    }

    // GET /api/models
    public async getModels(): Promise<Model[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.models);
            }, 500);
        });
    }
} 