import React, { useState, useEffect } from "react";
import { addChartingScript } from '../../CommonAPI/User'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


const AddChartingScript = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('name')

    const [chartingData, setChartingData] = useState([
        { name: "Cash", status: false, fund: "", tradeCount: "" },
        { name: "Future", status: false, fund: "", tradeCount: "" },
        { name: "Option", status: false, fund: "", tradeCount: "" }
    ]);


    const cards = [{ name: "Cash", type: "cash", status: false, fund: "", tradeCount: "" }, { name: "Future", type: "future", status: true, lot: "", tradeCount: "" }, { name: "Option", type: "option", status: false, fund: "", tradeCount: "" }];


    const handleAddCharting = async (index) => {
        const data = chartingData[index]
        const req = {
            Username: userName,
            Status: data.status ? "On" : "Off",
            Fund: index == 0 ? Number(data.fund) : 0,
            Lot: index == 0 ? 0 : Number(data.fund),
            Segment: data.name,
            TradeCount: Number(data.tradeCount)
        }
        await addChartingScript(req)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.message,
                        timer: 1500,
                        timerProgressBar: true,
                    })
                    setTimeout(() => {
                        navigate('/user/dashboard')
                    }, 1500)

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message,
                        timer: 1500,
                        timerProgressBar: true,
                    })
                }
            })
            .catch((err) => {
                console.log("Error in adding the charting data", err)
            })
    }

    return (
        <div className="iq-card">
            <div className="d-flex justify-content-end">

             <button className="btn btn-primary m-3" onClick={()=> navigate('/user/dashboard')}>Back</button>
            </div>
            <div className="row">
                {cards.map((item, index) => {
                    return (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="card">
                                <div className="card-header text-center">
                                    <h5>{item.name}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="col-sm-7 d-flex">
                                        <span className="me-3">
                                            Status:
                                        </span>
                                        <div className="form-switch">
                                            <input
                                                className="form-check-input"
                                                style={{
                                                    width: "50px",
                                                    height: "20px",
                                                }}
                                                type="checkbox"
                                                id="flexSwitchCheckChecked"
                                                name={`status-${index}`}
                                                onChange={(e) => {
                                                    const data = [
                                                        ...chartingData,
                                                    ];
                                                    data[index].status =
                                                        e.target.checked;
                                                    setChartingData(data);
                                                }}
                                                value={
                                                    chartingData[index].status
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>
                                            {item.type === "cash"
                                                ? "Fund"
                                                : "Lot"}
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter funds"
                                            onChange={(e) => {
                                                const data = {
                                                    ...chartingData,
                                                };
                                                data[index].fund =
                                                    e.target.value;
                                                setChartingData(data);
                                            }}
                                            value={chartingData[index].fund}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Trade Count</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter trade count"
                                            onChange={(e) => {
                                                const data = {
                                                    ...chartingData,
                                                };
                                                data[index].tradeCount =
                                                    e.target.value;
                                                setChartingData(data);
                                            }}
                                            value={
                                                chartingData[index].tradeCount
                                            }
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                handleAddCharting(index)
                                            }>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
           
        </div>
    );
}

export default AddChartingScript;