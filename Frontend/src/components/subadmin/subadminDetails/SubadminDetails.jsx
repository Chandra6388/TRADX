import React, { useEffect, useState } from 'react';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { GetAllSubadmindDetails } from '../../CommonAPI/SubAdmin';

const SubadminDetails = () => {
    const [subAdminDetails, setSubAdminDetails] = useState([]);

    const fetchSubAdminDetails = async () => {
        try {
            const res = await GetAllSubadmindDetails();
            if (res.Status) {
                setSubAdminDetails(res.Data);
            } else {
                setSubAdminDetails([]);
            }
        } catch (err) {
            console.log('Error fetching subadmin details:', err);
        }
    };

    useEffect(() => {
        fetchSubAdminDetails();
    }, []); // fetch data on component mount

    console.log(subAdminDetails);

    const columns = [
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? value : '-')
            }
        },
        {
            label: 'Name',
            name: 'Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? value : '-')
            }
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? value : '-')
            }
        },
        {
            name: 'Mobile_No',
            label: 'Mobile No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? value : '-')
            }
        },
        {
            name: 'CreateDate',
            label: 'Create Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? value : '-')
            }
        },
        {
            label: 'Key',
            name: 'Key',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (value ? value : '-')
            }
        }
    ];

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Subadmin Details</h4>
                            </div>
                           
                        </div>
                        <div className="iq-card-body">
                          
                            {/* Ensure that FullDataTable safely handles empty or undefined values */}
                            <FullDataTable
                                columns={columns}
                                data={subAdminDetails}
                                checkBox={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubadminDetails;
