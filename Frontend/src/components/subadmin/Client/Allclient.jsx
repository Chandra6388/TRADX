import React, { useEffect, useState } from 'react';
import { GetAllSubadminClient } from '../../CommonAPI/SubAdmin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link, useNavigate } from 'react-router-dom';
import { SquarePen } from 'lucide-react';




const AllSubadmin = () => {
   const userName = localStorage.getItem('name');

    const navigate = useNavigate();

    const [clientService, setClientService] = useState({ loading: true, data: [] });

    const [searchInput, setSearchInput] = useState('')



    useEffect(() => {
        fetchAllSubadmin();
    }, [searchInput]);




    const fetchAllSubadmin = async () => {
        const req = {userName: userName}
        try {
            const response = await GetAllSubadminClient(req);
            if (response.Status) {
                const filteredData = response.Data.filter(item => {
                    const searchInputMatch =
                        searchInput === '' ||
                        item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.BrokerName.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase())
                    return searchInputMatch
                })

                setClientService({
                    loading: false,
                    data: searchInput ? filteredData : response.Data,
                });
            } else {
                setClientService({ loading: false, data: [] });
            }
        } catch (error) {
            console.log('Error in fetching Subadmin', error);
        }
    };


    const EditSubadmindetail = (value, tableMeta) => {
        const rowData = clientService.data[tableMeta.rowIndex];
        navigate(`/admin/editSubadmin`, {
            state: { rowData },
        });
    };



    const columns = [
        {
            name: 'S.No',
            label: 'S.No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: 'Edit',
            label: 'Edit',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <SquarePen
                        onClick={() => EditSubadmindetail(value, tableMeta)} />

                ),
            },
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Mobile_No',
            label: 'Mobile Number',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'BrokerName',
            label: 'Broker Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Licanse',
            label: 'Licanse',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'CreateDate',
            label: 'Create Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceStartDate',
            label: 'Service Start Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceEndDate',
            label: 'Service End Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Group',
            label: 'Group',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value?.join(', ') || '-'
            }
        },
        {
            name: 'Planname',
            label: 'Plan Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value?.join(', ') || '-'
            }
        },
        

    ];



    return (
        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>All Client</h4>
                            </div>
                            <Link to='/subadmin/addclient' className='btn btn-primary rounded'>
                                Add Client
                            </Link>
                        </div>
                        <div className='iq-card-body'>
                            <div className='mb-3 col-lg-3'>
                                <input type="text" className=' form-control rounded p-1 px-2' placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                            </div>
                            <FullDataTable columns={columns} data={clientService.data} checkBox={false} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AllSubadmin;
