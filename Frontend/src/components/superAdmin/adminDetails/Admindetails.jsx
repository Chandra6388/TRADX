import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { adminDetails, addFund } from '../../CommonAPI/SuperAdmin';
import GridExample from '../../../ExtraComponent/CommanDataTable'


const Strategygroup = () => {
    const [getAdminDetails, setAdminDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState('');
    const [amount, setAmount] = useState('');
    useEffect(() => {
        adminDetailsData();
    }, []);

    const adminDetailsData = async () => {
        await adminDetails()
            .then((response) => {
                if (response.Status) {
                    setAdminDetails(response.AdminDetails)
                }
                else {
                    setAdminDetails([])
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    };


    const handleChangeStatus = (row, e, status) => {
        e.preventDefault();
        Swal.fire({
          title: "Are you sure?",
          text: "You want to change the status?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ff00aa",
          cancelButtonColor: "#616161",
          confirmButtonText: "Yes, change it!"
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(updateStatus({ id: row.id, status: status ? "1" : "0" }))
              .unwrap()
              .then((response) => {
                if (response.status) {
                  getChargeBasisData();
                  e.target.checked = status;
                  Swal.fire({
                    title: "Changed!",
                    text: "Your status has been changed.",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                  });
                }
              })
              .catch((error) => {
                console.error("Error updating charge basis:", error);
              });
          } else {
            e.target.checked = !status;
            getChargeBasisData();
          }
        });
      };

    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "AddFund",
            label: "Add Fund",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <button className="btn btn-primary" onClick={() => handleAddFound(tableMeta)}>AddFund</button>;
                }

            }
        },
        {
            name: "Companyname",
            label: "Company Name",
            options: {
                filter: true,
                sort: false,
                width: '20%'
            }
        },
        {
            name: "username",
            label: "Username",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "password",
            label: "Password",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return "********";
                }

            }
        },
        {
            name: "SignEmail",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "SignMobileNo",
            label: "Mobile No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Create Date",
            label: "Created Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "AmountDetails",
            label: "Amount Details",
            options: {
                filter: true,
                sort: false,
                width: '20%'
            }
        },
        {
            name: "IP Detail",
            label: "IP Address",
            options: {
                filter: true,
                sort: false,
                width: '20%'
            }
        },
        {
            name: "Status",
            label: "Temporary Close Panel",
            options: {
                filter: true,
                sort: false,
                width: '20%',
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div className="form-switch">
                        <input
                            className="form-check-input"
                            style={{ cursor: "pointer" , width: "61px", height: "27px"}}
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            defaultChecked={value == "On" ? true : false}
                          onClick={(e) => handleChangeStatus(value, e, e.target.checked)}
                        />
                    </div>
                }

            }
        },
    ];

    const handleAddFound = (index) => {
        console.log("index", getAdminDetails[index.rowIndex].Companyname)
        setIndex(index.rowIndex);
        setShowModal(true);
    }

    const handleSubmitFund = async () => {
        if (amount === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the amount',
            })
        }
        else {
            console.log(amount)
            setAmount('');
            setShowModal(false);
        }
        const req = { Companyname: getAdminDetails?.[index]?.Companyname, AmmountDetails: amount }

        await addFund(req)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.Message,
                    })
                    adminDetailsData();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.Message,
                    })
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }



    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Admin Detail</h4>
                            </div>

                        </div>

                        <div className="iq-card-body">
                            <div className="table-responsive customtable">
                                <GridExample
                                    columns={columns}
                                    data={getAdminDetails}
                                    checkBox={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                showModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Add Fund
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setAmount(''); setShowModal(false) }}
                                />
                            </div>
                            <div>
                                <div className='mx-4'>
                                    <label className='mt-4'>Enter Fund</label>
                                    <input type="number"
                                        className='form-control mb-4'
                                        placeholder='Enter Fund'
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
                                    />
                                </div>
                                <div className='d-flex justify-content-end mb-4 mx-4'>
                                    <button className='btn btn-primary' onClick={handleSubmitFund}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>
    );
};

export default Strategygroup;
