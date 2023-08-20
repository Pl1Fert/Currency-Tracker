import axios from "axios";

import { ENV_VARS } from "@/constants";
import { IBanks, ICoords, IFeature, INewFeature } from "@/interfaces/mapTypes";

import { CurrencyService } from "./currencyService";

const getBanks = async (coords: ICoords): Promise<INewFeature[]> => {
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
        return [];
    }
};

export const MapService = {
    getBanks,
};
