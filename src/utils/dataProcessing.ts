import { ITApplication, CategoryCosts } from '../types';

export const calculateCategoryTotals = (applications: ITApplication[]): CategoryCosts[] => {
    const categoryMap = new Map<string, CategoryCosts>();
    
    applications.forEach(app => {
        const totalCost = app.infrastructureCost + app.supportCost;
        const existing = categoryMap.get(app.category);
        
        if (existing) {
            categoryMap.set(app.category, {
                category: app.category,
                totalCost: existing.totalCost + totalCost,
                applicationCount: existing.applicationCount + 1
            });
        } else {
            categoryMap.set(app.category, {
                category: app.category,
                totalCost: totalCost,
                applicationCount: 1
            });
        }
    });
    
    return Array.from(categoryMap.values());
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}; 