export interface INotification {
    diff: number;
    subscribers: any[];
    subscribe(functionToSubscribe: any): void;
    unsubscribe(functionToUnsubscribe: any): void;
    setDiff(newDiff: number): void;
}
