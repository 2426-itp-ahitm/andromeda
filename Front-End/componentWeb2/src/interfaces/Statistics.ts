export interface Statistics {
    responseTime: number;
    latestCommandsExecuted: [{
        id: string;
        name: string;
        timestamp: string;
    }];
} 