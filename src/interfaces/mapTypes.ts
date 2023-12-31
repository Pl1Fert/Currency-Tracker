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
}

export interface INewFeature extends IFeature {
    currencies: [string, string];
}

export interface IBanks {
    type: string;
    features: IFeature[];
}
