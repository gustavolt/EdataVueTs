export interface IServiceResponse {
    Code: number;
    Title: string;
    Message: string;
    Success: boolean;
    Warning: boolean;
    Data?: any;
}

export function getServiceResponse(response: any): IServiceResponse {
    if (!response) {
        return {
            Code: -1,
            Title: "Not Found",
            Message: "Response not found",
            Success: false,
            Warning: false
        };
    }

    if (!response.error) {
        return {
            Code: 0,
            Title: "Success",
            Message: response.message ?? 'OK',
            Success: true,
            Warning: false,
            Data: response
        };
    } else {
        return {
            Code: 1,
            Title: "Error",
            Message: response.error,
            Success: false,
            Warning: false,
            Data: response
        };
    }
}