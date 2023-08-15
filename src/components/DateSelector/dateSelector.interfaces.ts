export interface IProps {
    name: string;
    defaultValue: number;
    handleChange: (str: string) => void;
}

export interface IState {
    dates: string[];
}
