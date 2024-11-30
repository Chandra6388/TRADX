import React, { useEffect, useState } from 'react';
import { GetAllClient } from '../../CommonAPI/SubAdmin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import axios from 'axios';

const AllClients = () => {
    const [clients, setClients] = useState([]); // Clients data
    const [searchInput, setSearchInput] = useState(''); // Search input value
    const [error, setError] = useState(null); // Error handling
    const [loading, setLoading] = useState(true); // Loading state
     const Username = localStorage.getItem('name');

    useEffect(() => {
        fetchClients(); // Fetch clients on mount
    }, []);

    const fetchClients = async () => {
        const req = { userName: Username };
        try {
            const res = await GetAllClient(req);
            if (res.Status) {
                console.log('Fetched Clients:', res.Data);
                setClients(res.Data);
            } else {
                setClients([]);
            }
        } catch (err) {
            console.log('Error fetching Client details:', err);
            setError('Failed to fetch client data');
        }
    };
    

   
console.log( clients);

const columns = [
    {
        name: 'Username',
        label: 'Username',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-') // Handle undefined or null
        }
    },
    {
        label: 'Full Name',
        name: 'Full_Name',
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
        label: 'Mobile Number',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'Broker Name',
        name: 'BrokerName',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'License', // Fixed typo 'Licanse' to 'License'
        name: 'License', // Fixed typo 'Licanse' to 'License'
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'Create Date',
        name: 'CreateDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'License Start Date', // Fixed typo 'Licanse' to 'License'
        name: 'LicenseStartDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'Service Start Date',
        name: 'ServiceStartDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'Service End Date',
        name: 'ServiceEndDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'Service Count',
        name: 'ServiceCount',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
    {
        label: 'AutoLogin',
        name: 'AutoLogin',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : '-')
        }
    },
];

   

    return (


        <div className="container-fluid">
  <div className="row">
    <div className="iq-card">
      <div className="iq-card-header d-flex justify-content-between">
        <div className="iq-header-title">
          <h4 className="card-title">Client List</h4>
        </div>
        <div className="iq-card-header-toolbar d-flex align-items-center">
          <button type="button" className="btn btn-primary">
            Add New Group
          </button>
        </div>
      </div>
      <div className="iq-card-body">
        <div className="table-responsive customtable">
        <FullDataTable columns={columns} data={clients} checkBox={false} />
        </div>
      </div>
    </div>
  </div>
</div>

       
    );
};

export default AllClients;
