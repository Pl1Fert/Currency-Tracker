import { ICoords, INewFeature } from "@/types/mapTypes";

export interface IState {
    features: INewFeature[];
    coords: ICoords;
}

export interface IProps {
    inputValue: string;
}
