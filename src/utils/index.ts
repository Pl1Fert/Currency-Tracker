export const getFilteredSymbols = (symbols: string[], inputValue: string): string[] =>
    symbols
        .filter((symbol) => symbol.toLowerCase().includes(inputValue.toLowerCase()))
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

export const calculateDateDiff = (startDate: string, endDate: string): number => {
    const diff = Date.parse(endDate) - Date.parse(startDate);
    return diff / 1000 / 3600 / 24;
};
