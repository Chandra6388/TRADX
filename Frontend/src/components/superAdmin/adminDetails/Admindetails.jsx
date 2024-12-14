import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { adminDetails, addFund, closePanel, updateAdmin, pm2Reload } from '../../CommonAPI/SuperAdmin';
import GridExample from '../../../ExtraComponent/CommanDataTable'
import { SquarePen, RotateCcw } from 'lucide-react';
import { useFormik } from "formik";
import AddForm from "../../../ExtraComponent/FormData";



const Strategygroup = () => {
    const [getAdminDetails, setAdminDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState('');
    const [amount, setAmount] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);
    const [singleAdminData, setSingleAdminData] = useState([]);
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

        const index = row.rowIndex;
        let Companyname = getAdminDetails[index].Companyname;

        Swal.fire({
            title: "Are you sure?",
            text: "You want to change the status?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req = { Companyname: Companyname, status: status ? "On" : "Off" }

                await closePanel(req)
                    .then((response) => {
                        if (response.Status) {
                            adminDetailsData();
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
                adminDetailsData();
            }
        });
    };

    const handleChangePm2Reload = (row, e, status) => {
        const index = row.rowIndex;
        let Companyname = getAdminDetails[index].Companyname;

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Reload server",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req = { Companyname: Companyname }

                await pm2Reload(req)
                    .then((response) => {
                        if (response.Status) {
                            adminDetailsData();

                            Swal.fire({
                                title: "Changed!",
                                text: "Your Server has been Reloaded.",
                                icon: "success",
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating charge basis", error);
                    })
            } else {

                adminDetailsData();
            }
        })
    }


    console.log("singleAdminData", singleAdminData)

    const handleUpdate = (tableMeta) => {
        setShowUpdate(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
    }


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
            name: "Update",
            label: "Update",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <SquarePen size={20} style={{ cursor: "pointer" }} onClick={() => handleUpdate(tableMeta)} />;
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
                            style={{ cursor: "pointer", width: "61px", height: "27px" }}
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            defaultChecked={value == "On" ? true : false}
                            onClick={(e) => handleChangeStatus(tableMeta, e, e.target.checked)}
                        />
                    </div>
                }

            }
        },
        {
            name: "Status",
            label: "PM2 Reload",
            options: {
                filter: true,
                sort: false,
                width: '20%',
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <RotateCcw onClick={(e) => handleChangePm2Reload(tableMeta, e, e.target.checked)} />
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

    useEffect(() => {
        formik.setValues({
            Companyname: singleAdminData?.Companyname,
            Username: singleAdminData?.username,
            mobile_no: singleAdminData?.SignMobileNo,
            SignEmail: singleAdminData?.SignEmail,
            Url: "",
        })
    }, [singleAdminData])


    const formik = useFormik({
        initialValues: {
            Companyname: '',
            Username: '',
            mobile_no: '',
            SignEmail: '',
            Url: '',
        },
        validate: (values) => {
            let errors = {};

            if (!values.mobile_no) {
                errors.mobile_no = "Please enter mobile number";
            }
            if (!values.SignEmail) {
                errors.SignEmail = "Please enter email";
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.SignEmail)) {
                errors.SignEmail = "Invalid email address";
            }

            return errors;
        },
        onSubmit: async (values) => {

            const req = {
                Companyname: singleAdminData?.Companyname,
                Username: singleAdminData?.username,
                mobile_no: values.mobile_no,
                SignEmail: values.SignEmail,
                Url: "",
            }

            await updateAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Admin Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowUpdate(false);
                        formik.resetForm();
                    }
                    else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((err) => {

                    console.log("Error in fatching the Dashboard Details", err)
                })
        },
    });

    const fields = [
        {
            name: "mobile_no",
            label: "Mobile Number",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 12,
            disable: false,
        },
        {
            name: "SignEmail",
            label: "Email",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 12,
            disable: false,
        },


    ]


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

            {
                showUpdate && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Admin : {singleAdminData?.Companyname}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setShowUpdate(false); formik.resetForm() }}
                                />
                            </div>
                            <div>
                                <AddForm
                                    fields={fields}
                                    btn_name="Update"
                                    formik={formik}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }




        </div>
    );
};

export default Strategygroup;
