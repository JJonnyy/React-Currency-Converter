import React from 'react';
import {useState} from 'react';
import useCurrencyRates from '../hooks/useCurrencyRates';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TouchAppIcon from '@mui/icons-material/TouchApp';
const CurencyTable = () => {
    const {currencyRates} = useCurrencyRates();
    const [editableCell, setEditableCell] = useState(null);
    const [newRates, setNewRates] = useState([]);
    const [cancelActive, setCancelActive] = useState(false);

    const startEditCell = (rowIndex ,originBuyValue, originSaleValue) => {
        setEditableCell({rowIndex, originBuyValue, originSaleValue});
        setCancelActive(true);
    };
    const editBuy = (newValue) => {
        setNewRates(newValue);
        const updatedRates = [...currencyRates];
        const { rowIndex } = editableCell;
        updatedRates[rowIndex].buy = newValue;
        setNewRates(updatedRates);
    };
    const editSale = (newValue) => {
        setNewRates(newValue);
        const updatedRates = [...currencyRates];
        const { rowIndex } = editableCell;
        updatedRates[rowIndex].sale = newValue;
        setNewRates(updatedRates);
    };

    const saveCell = () =>{
        setEditableCell(null);
        setCancelActive(false);
    }
    const handleCancelEdit = () => {
        const updatedRates = [...currencyRates];
        if(editableCell.originBuyValue){
            updatedRates[editableCell.rowIndex].buy = editableCell.originBuyValue;
        }
        if(editableCell.originSaleValue) {
            updatedRates[editableCell.rowIndex].sale = editableCell.originSaleValue;
        }
        setNewRates(updatedRates)
        setEditableCell(null);
        setCancelActive(false);
    };
    return (
        <>
            <table className="exchange mb-4 max-w-[500px] mx-auto">
                <thead>
                <tr>
                    <th>Currency / Current Date</th>
                    <th>Buy</th>
                    <th>Sell</th>
                </tr>
                </thead>
                <tbody>
                {!currencyRates || !Array.isArray(currencyRates) || currencyRates.length === 0 ? (
                    <tr>
                        <td>Loading...</td>
                    </tr>
                ) : (
                    currencyRates.map((row, rowIndex) => (
                        <tr key={rowIndex} className="">
                            <td>{row.ccy} / {row.base_ccy}</td>
                            <td>
                                <div className="cell-row">
                                    <p onClick={() => startEditCell(rowIndex, row.buy)}>
                                        {editableCell && editableCell.rowIndex === rowIndex ? (
                                            <input
                                                type="text"
                                                value={row.buy}
                                                onChange={(e) => editBuy(e.target.value)}
                                            />
                                        ) : (
                                            row.buy
                                        )}
                                    </p>
                                    <div className="flex">
                                        <CheckCircleOutlineRoundedIcon className={`button-cancel ${cancelActive ? "active" : ""}`} onClick={saveCell} />
                                        <CloseRoundedIcon  className={`button-cancel ${cancelActive ? "active" : ""}`} onClick={handleCancelEdit}/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="cell-row">
                                    <p onClick={() => startEditCell(rowIndex, row.buy , row.sale)}>
                                        {editableCell && editableCell.rowIndex === rowIndex ? (
                                            <input
                                                type="text"
                                                value={row.sale}
                                                onChange={(e) => editSale(e.target.value)}
                                            />
                                        ) : (
                                            row.sale
                                        )}
                                    </p>
                                    <div className="flex">
                                        <CheckCircleOutlineRoundedIcon className={`button-cancel ${cancelActive ? "active" : ""}`} onClick={saveCell} />
                                        <CloseRoundedIcon  className={`button-cancel ${cancelActive ? "active" : ""}`} onClick={handleCancelEdit}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <p className="mb-8">You can edit the currency table, just click on the cell <TouchAppIcon/></p>
        </>
    );
};

export default CurencyTable;