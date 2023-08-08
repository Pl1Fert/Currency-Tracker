/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface INotification {
    diff: number;
    subscribers: any[];
    subscribe(functionToSubscribe: any): void;
    unsubscribe(functionToUnsubscribe: any): void;
    setDiff(newDiff: number): void;
}

export class Notification implements INotification {
    diff = 30;

    subscribers: any = [];

    subscribe = (functionToSubscribe: any): void => {
        this.subscribers.push(functionToSubscribe);

        functionToSubscribe(this.diff);
    };

    unsubscribe = (functionToUnsubscribe: any): void => {
        this.subscribers = this.subscribers.filter((func: any) => func !== functionToUnsubscribe);
    };

    setDiff = (newDiff: number): void => {
        this.diff = newDiff;

        this.subscribers.forEach((subscriber: any) => subscriber(this.diff));
    };
}
