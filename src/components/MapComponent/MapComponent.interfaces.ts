export interface ICoords {
    latitude: number;
    longitude: number;
}

export interface IFeature {
    type: string;
    id: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    properties: {
        xid: string;
        name: string;
        dist: number;
        rate: number;
        osm: string;
        kinds: string;
    };
    currencies: [string, string];
}

export interface IState {
    features: IFeature[];
    coords: ICoords;
}

export interface IProps {
    inputValue: string;
}
