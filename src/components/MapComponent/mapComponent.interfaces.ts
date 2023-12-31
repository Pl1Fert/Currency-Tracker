import { ICoords, INewFeature } from "@/interfaces/mapTypes";

export interface IState {
    features: INewFeature[];
    coords: ICoords;
}

export interface IProps {
    inputValue: string;
}
