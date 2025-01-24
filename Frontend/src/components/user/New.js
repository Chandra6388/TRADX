import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { PenLine, Trash2 } from 'lucide-react';
import  Datatable  from "../../ExtraComponent/NewTable";

const AllQuotes = () => {

  const columns = [
    {
      name: "Subject",
      selector: (row) => row?.subject,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => row?.client_id,
      sortable: true,
    },
    {
      name: "Yearly Cost",
      selector: (row) => row?.yearly_cost,
      sortable: true,
    },
    {
      name: "createdAt",
      selector: (row) => row?.createdAt,
      sortable: true,
    },
  
  ];

  const data =[
    {
        id: 1,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 2,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 3,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 4,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 5,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 6,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 7,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 8,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 9,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 10,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 11,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 12,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 13,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
        },
        {
        id: 14,
        subject: "Test",
        client_id: "Test",
        yearly_cost: "Test",
        createdAt: "Test",
    }

  ]





  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h4 className="page-title">
            <Link to="/admin/quote/quotes-dashboard">
              <i className='bx bx-arrow-back text-pink'></i>
            </Link> All Quotes
          </h4>
        </div>
        <div className="col-auto align-self-center">
          <Link to="/admin/quote/create-quote" className="btn btn-pink" id="Dash_Date">
            <span className="ay-name" id="Day_Name">Add New Quote</span>
          </Link>
        </div>
      </div>

      <section className="section dashboard">
     
        
        <div className="row">

          <Datatable
            columns={columns}
            data={data}
            filter={false}
          />

        </div>
      </section>
    </div>
  );
};

export default AllQuotes;
