const getPreviousDates = (): string[] => {
    const date = new Date();
    const datesArray: Date[] = [];
    for (let i = 1; i < 31; i += 1) {
        const prevDate = date.getDate() - i;
        const bufDate: Date = new Date(new Date().setDate(prevDate));
        datesArray.push(bufDate);
    }

    const padTo2Digits = (num: number): string => num.toString().padStart(2, "0");

    const formatDate = (dateToFormat: Date): string =>
        [
            dateToFormat.getFullYear(),
            padTo2Digits(dateToFormat.getMonth() + 1),
            padTo2Digits(dateToFormat.getDate()),
        ].join("-");

    return datesArray.map((dateItem) => formatDate(dateItem));
};

const calculateDateDiff = (startDate: string, endDate: string): number => {
    const diff = Date.parse(endDate) - Date.parse(startDate);
    return diff / 1000 / 3600 / 24;
};

export const DateService = {
    getPreviousDates,
    calculateDateDiff,
};
