import React, { useEffect, useState } from 'react';
import { AllReuests, ApprovwRequest } from '../../CommonAPI/Admin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Swal from 'sweetalert2';

const Clientservice = () => {
    const [getAllRequest, setAllRequest] = useState({ pending: [], rejected: [], Complete: [], data: [] });

    useEffect(() => {
        fetchClientService();
    }, []);

    const fetchClientService = async () => {
        try {
            const response = await AllReuests();
            if (response.Status) {
                const pending = response.Process.filter((item) => item.TransactionRequest === 'Process');
                const rejected = response.Process.filter((item) => item.TransactionRequest === 'Reject');
                const complete = response.Process.filter((item) => item.TransactionRequest === 'Complete');
                setAllRequest({ loading: false, pending: pending, rejected: rejected, Complete: complete, data: response.Process });
            } else {
                setAllRequest({ loading: false, pending: [], rejected: [], Complete: [], data: [] });
            }
        } catch (error) {
            console.log('Error in fetching client services', error);
        }
    };

    const columns = [
        {
            name: 'S.No',
            label: 'S.No',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: "money",
            label: "Amount",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, rowindex) => {
                    const Transactiontype = rowindex.rowData[4];
                    let color;
                    let sign;
                    if (Transactiontype === 'Withdrawal') {
                        color = 'red';
                        sign = '-';
                    } else if (Transactiontype === 'Purchase') {
                        color = 'blue';
                        sign = '-';
                    } else {
                        color = 'green';
                        sign = '+';
                    }

                    return (
                        <span style={{ color }}>
                            ₹ {sign}{value}
                        </span>
                    );
                }



            }
        },
        // {
        //     name: 'money',
        //     label: 'Amount',
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRender: (value) => value || '-',
        //     },
        // },
        {
            name: 'TotalTrasaction',
            label: 'Total Transaction',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'Transactiontype',
            label: 'Transaction Type',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    let style = {};
                    if (value === 'Deposit') {
                        style = { color: 'green', fontWeight: '800' };
                    } else if (value === 'Withdrawal') {
                        style = { color: 'red', fontWeight: '800' };
                    } else {
                        style = { color: 'black', fontWeight: '800' };
                    }

                    return <span style={style}>{value || '-'}</span>;
                },
            },
        },
        {
            name: 'TransactionRequest',
            label: 'Action',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <div>
                        {
                            value === "Process" ? (
                                <select
                                    className='form-control'
                                    onChange={(e) => { handleApprovalChange(e, tableMeta); }}
                                    value={value === "Process" ? '' : value === 'Reject' ? 'Reject' : ""}
                                >
                                    {value === 'Reject' ? "" : <option value='' disabled>Pending</option>}
                                    <option value='Complete'>Approve</option>
                                    <option value='Reject'>Reject</option>
                                </select>
                            ) : value === 'Reject' ?
                                <div style={{ color: 'red', fontWeight: '800' }}>Rejected</div>
                                :
                                <div style={{ color: 'green', fontWeight: '800' }}>Approved</div>
                        }
                    </div>
                ),
            },
        },
        {
            name: 'DateTime',
            label: 'Time',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => value || '-',
            },
        },
    ];



    const handleApprovalChange = async (e, row) => {
        const value = e.target.value;
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to change the status?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const rowIndex = row.rowIndex;
                    const data = getAllRequest.pending[rowIndex];
                    const req = {
                        datetime: data.DateTime,
                        Username: data.Username,
                        transactiontype: data.Transactiontype,
                        money: data.money,
                        Status: value,
                    };
                    const response = await ApprovwRequest(req);
                    if (response.Status) {
                        Swal.fire({
                            title: "Success",
                            text: response.message,
                            icon: "success",
                            confirmButtonText: "Ok",
                            timer: 1000,
                            timerProgressBar: true,
                        });

                        fetchClientService();
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: response.message,
                            icon: "error",
                            confirmButtonText: "Ok",
                        });
                    }
                } catch (error) {
                    console.error('Error in approval request:', error); // Log error for debugging
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while updating the status.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            }
        });
    };


    return (
        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>Transaction Request</h4>
                            </div>
                        </div>
                        <div className='iq-card-body'>
                            <div className="container mt-4">
                                <Tabs
                                    defaultActiveKey="PendingRequest"
                                    id="fill-tab-example"
                                    className="mb-3 custom-tabs"
                                    fill
                                >
                                    <Tab eventKey="PendingRequest" title="Pending">
                                        <div className="">
                                            <h5 className="mb-4">
                                                <FullDataTable
                                                    columns={columns}
                                                    data={getAllRequest.pending}
                                                    checkBox={false}
                                                />
                                            </h5>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="RejectRequest" title="Rejected">
                                        <div className="">
                                            <FullDataTable
                                                columns={columns}
                                                data={getAllRequest.rejected}
                                                checkBox={false}
                                            />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="AproveRequest" title="Approved">
                                        <div className="">
                                            <FullDataTable
                                                columns={columns}
                                                data={getAllRequest.Complete}
                                                checkBox={false}
                                            />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Clientservice;
