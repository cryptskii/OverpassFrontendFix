// ./src/hooks/getPriceFeedsRealtime.ts
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface PriceFeed {
    name: string;
    price: number;
    change: number;
    changePercentage: number;
}

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const COIN_IDS = "bitcoin,ethereum,tether,the-open-network";
const VS_CURRENCY = "usd";
const FETCH_INTERVAL = 5000; // 5 seconds

const getPriceFeeds = async (): Promise<PriceFeed[]> => {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}?ids=${COIN_IDS}&vs_currencies=${VS_CURRENCY}`);
        const data = response.data;

        return [
            { name: "Bitcoin", price: data.bitcoin.usd, change: 0, changePercentage: 0 },
            { name: "Ethereum", price: data.ethereum.usd, change: 0, changePercentage: 0 },
            { name: "USDT", price: data.tether.usd, change: 0, changePercentage: 0 },
            { name: "TON", price: data["the-open-network"].usd, change: 0, changePercentage: 0 }
        ];
    } catch (error) {
        console.error("Error fetching price feeds:", error);
        throw error;
    }
};

export const usePriceFeedsRealtime = () => {
    const [priceFeeds, setPriceFeeds] = useState<PriceFeed[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const fetchPriceFeeds = useCallback(async () => {
        try {
            const feeds = await getPriceFeeds();
            setPriceFeeds(feeds);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
    }, []);

    useEffect(() => {
        fetchPriceFeeds();

        const interval = setInterval(fetchPriceFeeds, FETCH_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchPriceFeeds]);

    return { priceFeeds, error };
};