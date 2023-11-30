import React from 'react';
import {useState, useEffect} from "react";
import useCurrencyRates from '../hooks/useCurrencyRates';
import TextField from "@mui/material/TextField";
import {CurrencyExchange} from "@mui/icons-material";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const CurrencyConverter = () => {
    const { currencyRates } = useCurrencyRates();
    const [optionsDefault, setOptionsDefault] = useState(['UAH']);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState(null);
    const [currencySet, setCurrencySet] = useState('JPY');
    const [currencyGet, setCurrencyGet] = useState('UAH');
    const [currencyValueGet, setCurrencyValueGet] = useState('');

    useEffect(()=>{
        changeSet();
    });
    useEffect(()=>{
        changeSet();
    }, [currencyRates]);
    useEffect(()=>{
        if(currencyRates){
            const list = currencyRates.map(item => item.ccy);
            setOptions(list)
        }
    },[currencyRates])

    const handleChangeSet = (event) => {
        setCurrencySet(event.value);
    };
    const handleChangeGet = (event) => {
        setCurrencyGet(event.value);
    };
    const changeSet = () =>{
        if(currencyRates){
            currencyRates.map(e => {
                if(currencySet === e.ccy){
                    setCurrencyValueGet((inputValue * e.buy).toFixed(2));
                }
                else if(currencyGet === e.ccy){
                    setCurrencyValueGet((inputValue / e.sale).toFixed(2));
                }
            })
        }
    }

    const flip = () =>{
        let temp = options;
        setOptions(optionsDefault)
        setOptionsDefault(temp)

        let tempCyrrency = currencySet
        setCurrencySet(currencyGet)
        setCurrencyGet( tempCyrrency)
    }

    return(
        <div className="flex justify-around items-center md:w-[80%] mx-auto mb-20">
            <div className="flex flex-wrap items-center justify-center">
                <TextField
                    id="outlined-number"
                    label="Change"
                    type="number"
                    onChange={(e)=> setInputValue(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Dropdown options={options}
                          className="mx-4 my-4"
                          onChange={handleChangeSet}
                          value={currencySet} placeholder="JPY" />
            </div>

            <div className="px-20">
                <CurrencyExchange onClick={() => flip()}/>
            </div>
            <div className="flex flex-wrap items-center justify-center">
                <TextField
                    id="outlined-number"
                    label="Get"
                    type="number"
                    value={currencyValueGet}
                    onChange={(e)=> setCurrencyValueGet(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Dropdown options={optionsDefault}
                          className="mx-4 my-4"
                          onChange={handleChangeGet}
                          value={currencyGet} placeholder={'UAH'} />
            </div>
        </div>
    )
};

export default CurrencyConverter;