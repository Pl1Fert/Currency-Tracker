import axios from "axios";

import { ENV_VARS } from "@/constants";

import { CurrencyService } from "./currencyService";

interface ICoords {
    latitude: number;
    longitude: number;
}

interface IFeature {
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

interface INewFeature extends IFeature {
    currencies: [string, string];
}

interface IBanks {
    type: string;
    features: IFeature[];
}

const getBanks = async (coords: ICoords): Promise<INewFeature[] | undefined> => {
    try {
        const { data } = await axios.get<IBanks>(
            `${ENV_VARS.TRIPMAP_API_URL}&lon=${coords.longitude}&lat=${coords.latitude}&kinds=bank&apikey=${ENV_VARS.TRIPMAP_API_KEY}`
        );

        return data?.features.map(
            (feature: IFeature): INewFeature => ({
                ...feature,
                currencies: CurrencyService.getRandomCurrencies(),
            })
        );
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const MapService = {
    getBanks,
};
