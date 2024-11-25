import React, { useState, useEffect } from 'react'
import { getCompanyName, clientThreadeReport, getClientName } from '../../CommonAPI/SuperAdmin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'

const ClientThreadResponse = () => {

    const [getAllClientThreadeResponse, setAllClientThreadeResponse] = useState([])
    const [comapnyName, setCompanyName] = useState('')
    const [getAllComapny, setAllComapny] = useState([])
    const [scriptType, setScriptType] = useState('')
    const [getAllClientName, setAllClientName] = useState([])
    const [clientName, setClientName] = useState('')


    console.log('clientName', clientName)
 	
    useEffect(() => {
        ComapnyDetails()
    }, [])

    useEffect(() => {
        ClientName()

        

    }, [comapnyName])

  
    const ComapnyDetails = async () => {
        await getCompanyName()
            .then((response) => {
                if (response.Status) {
                    setAllComapny(response.Data)
                }
                else {
                    setAllComapny([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }

    const ClientName = async () => {  
        if (comapnyName == '') {
            return
        }  
        const req = { comapnyName: comapnyName }
        await getClientName(req)
            .then((response) => {
                if (response.Status) {
                    setAllClientName(response.Data)
                }
                else {
                    setAllClientName([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }


    // {
    //     "Companyname":"Pnp",
    //     "MainStrategy": "Scalping",
    //     "Strategy": "Multi Directional",
    //     "Symbol": "BANKNIFTY24NOVFUT",
    //     "Username": "komal",
    //     "ETPattern": "",
    //     "Timeframe": "",
    //     "From_date": "2024.11.19 00:00:00",
    //     "To_date": "2024.11.20 00:00:00",
    //     "TradePattern": "",
    //     "PatternName":"",
    //     "Group":""
    //     }

    const getClientThreadeReport = async () => {
        if (comapnyName == '' || clientName == '' || scriptType == '') {
            return
        }
        const req = { comapnyName: comapnyName }
        await clientThreadeReport(req)
            .then((response) => {
                if (response.Status) {
                    setAllClientThreadeResponse(response.Data)
                }
                else {
                    setAllClientThreadeResponse([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }


    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "Thread",
            label: "Thread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Username",
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ScalpType",
            label: "Scalping Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Targettype",
            label: "Target Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Threading Status",
            label: "Threading Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ThreadName",
            label: "ThreadName",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Time",
            label: "Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ProjectName",
            label: "ProjectName",
            options: {
                filter: true,
                sort: true,
            }
        },

    ];

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Client Thread Response</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="was-validated ">
                                <div className='d-flex'>
                                    <div className="form-group col-md-4 ms-2">
                                        <label>Select Panel Name</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            value={comapnyName}
                                        >
                                            {getAllComapny && getAllComapny.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4 ms-2">
                                        <label>Select Username</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => setClientName(e.target.value)}
                                            value={clientName}
                                        >
                                            <option value="">Please Select Username</option>
                                            {getAllClientName && getAllClientName.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4 ms-2">
                                        <label>Select Script Type</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => setScriptType(e.target.value)}
                                            value={scriptType}
                                        >
                                            <option value={'scalping'}>Scalping</option>
                                            <option value={'option'}>Option</option>
                                            <option value={'pattern'}>Pattern</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <FullDataTable
                                columns={columns}
                                data={getAllClientThreadeResponse}
                                checkBox={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientThreadResponse
