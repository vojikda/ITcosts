export type Category = 'Digital' | 'Branch Network' | 'Operations' | 'Financial Markets';

export interface ITApplication {
    id: string;
    name: string;
    category: Category;
    infrastructureCost: number;
    supportCost: number;
    vendor: string;
}

export interface CategoryCosts {
    category: Category;
    totalCost: number;
    applicationCount: number;
} 