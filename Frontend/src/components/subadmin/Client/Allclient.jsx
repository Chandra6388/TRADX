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
        const req= {userName : Username}
       
            await GetAllClient(req)
            .then((res) => {
               if(res.Status){
                console.log(res);
                
                setClients(res.Data);
               }
               else{
                setClients([]);
               }
            }).catch((err) => {
                console.log(err);
                
            });

          
            
    };

   
console.log( clients);

const columns = [
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
        label: 'FullName',
        name: 'Full_Name',
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
        label: 'Broker Name',
        label: 'BrokerName',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        label: 'Licanse',
        name: 'Licanse',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        label: 'Create Date',
        name: 'CreateDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        label: 'Licanse Start Date',
        name: 'LicanseStartDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        label: 'Service Start Date',
        name: 'ServiceStartDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        label: 'Service End Date',
        name: 'ServiceEndDate',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        label: 'Service Count',
        name: 'ServiceCount',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
        }
    },
    {
        Label: 'AutoLogin',
        name: 'AutoLogin',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || '-'
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
