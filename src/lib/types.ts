// Dropdown type
export interface FieldOption {
    key: string;
    label: string;
}

// Response from /api/average_salary
export interface AverageSalaryResponse {
    fieldValue: string,
    valueText: string;
    years: string[];
    values: number[];
}

// Response from /api/ai_summery
export interface AiSummaryResponse {
    summary: string;
}