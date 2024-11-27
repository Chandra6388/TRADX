import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { adminDetails } from '../../CommonAPI/SuperAdmin';
import GridExample from '../../../ExtraComponent/CommanDataTable'


const Strategygroup = () => {
    const [getAdminDetails, setAdminDetails] = useState([]);
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
            name: "username",
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "password",
            label: "Password",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return "********";
                }
                
            }
        },
        {
            name: "SignEmail",
            label: "Sign Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SignMobileNo",
            label: "Sign Mobile No",
            options: {
                filter: true,
                sort: true,
            }
        },
        
        {
            name: "Createdate",
            label: "Created Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Companyname",
            label: "Company Name",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },
        {
            name: "AmountDetails",
            label: "Ammount Details",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },
        {
            name: "IP Detail",
            label: "Ip Address",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },
    ];

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

            
        </div>
    );
};

export default Strategygroup;
