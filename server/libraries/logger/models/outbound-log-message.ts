type OutboundType = 'request' | 'response';

export type OutboundLogMessage = {
    outbound: {
        [key in OutboundType]?: {
            method: string;
            traceId: string;
            url: string;
            status?: number;
            payload?: any;
            responseTimeInMs?: number;
            error?: string;
            clientId?: string;
        };
    };
};
