import React, { useState, useEffect } from "react";
import { Get_Broker_Name , viewBrokerDetails } from '../../CommonAPI/Admin';
import { Eye, Trash2, BarChart2 } from 'lucide-react';

const ApiCreateInfo = () => {
    const [brokers, setBrokers] = useState([]);
    const [show, setShow] = useState(false);
    const [brokerName, setBrokerName] = useState('');
    const [brokerDetails, setBrokerDetails] = useState([]);


    console.log('brokerName', brokerName);
    console.log('brokerDetails', brokerDetails);

    useEffect(() => {
        fetchBrokerName();
    },[]);

    const fetchBrokerName = async () => {
        try {
            const response = await Get_Broker_Name();
            if (response.Status) {
                const brokerList = response?.Brokernamelist?.filter(item => item.BrokerName !== 'DEMO');
                setBrokers(brokerList);
            } else {
                setBrokers([]);
            }
        } catch (error) {
            console.log('Error in fetching brokers', error);
        }
    };

    useEffect(() => {
        getBrokerAlldetails()
    }, [brokerName]);

    
    const getBrokerAlldetails = async () => {
        const req = { BrokerName: brokerName };
        console.log('req', req);
        try {
             await viewBrokerDetails(req)
            .then((response) => {
                if (response.Status) {
                    setBrokerDetails(response.BrokerDetails);
                } else {
                    setBrokerDetails([]);
                }
            });
          
        } catch (error) {
            console.log('Error in fetching brokers', error);
    }
    };
        

    const handleShow = () => {
        setShow(true);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {brokers.map((item, index) => (
                        <div className="col" key={index}>
                            <div className="card broker-card">
                                <div className="trading-icon">
                                    <BarChart2 size={20} />
                                </div>

                                <div className="card-body text-center">
                                    <h5 className="card-title">{item.BrokerName}</h5>
                                    <div className="card-actions mt-3">
                                        <Eye size={24} className="action-icon edit-icon" onClick={()=>{handleShow(); setBrokerName(item.BrokerName)}} />
                                        <Trash2 size={24} className="action-icon delete-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                show && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Add Broker
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setShow(false) }}
                                />
                            </div>
                            <div>
                                <div className='mx-4'>
                                    <label className='mt-4'>Broker Name</label>
                                    <input type="text"
                                        className='form-control mb-4'
                                        placeholder='Enter Broker Name'

                                    />
                                </div>
                                <div className='d-flex justify-content-end mb-4 mx-4'>
                                    <button className='btn btn-primary'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>

    );
};

export default ApiCreateInfo;
