import { create } from 'zustand';
import {useEffect} from "react";
import useSWR from 'swr';
import {fetcher} from "../helpers/fetcher";

const useStore = create((set) => ({
    currencyRates: [],
    setCurrencyRates: (rates) => set({ currencyRates: rates }),
}))

const useCurrencyRates = () => {
    const { currencyRates, setCurrencyRates } = useStore();
    const { data: fetchedRates, mutate} = useSWR('/p24api/pubinfo?json&exchange&coursid=4', fetcher,
        {
            shouldRetryOnError: false,
        }
    );

    useEffect(() => {
        if (fetchedRates) {
            setCurrencyRates(fetchedRates);
        }
    }, [fetchedRates, setCurrencyRates]);

    return { currencyRates, mutateCurrencyRates: mutate };
}

export default useCurrencyRates;
