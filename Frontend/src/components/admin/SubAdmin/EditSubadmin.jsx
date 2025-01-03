import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AddSubadminbyAdmin } from '../../CommonAPI/Admin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../ExtraComponent/Loader';
import { Get_All_Plans } from "../../CommonAPI/User";

const EditSubadmin = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const { rowData } = location.state || {}
    

    const Name_regex = (name) => {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    };

  

    const formik = useFormik({
        initialValues: {
            Username: rowData.Username || "",
            Name:  rowData.Name ||"",
            SignEmail:  rowData.EmailId || "",
            mobile_no:  rowData.Mobile_No ||"",
           
        },
        validate: (values) => {
            let errors = {};
            if (!values.Username) {
                errors.Username = "Please Enter Username"
            }
            else if (!Name_regex(values.username)) {
                errors.username = "Please Enter Valid Username"
            }
            if (!values.Name) {
                errors.Name = "Please Enter Name"
            }
            else if (!Name_regex(values.Name)) {
                errors.Name = "Please Enter Valid Name"
            }
            if (!values.SignEmail) {
                errors.SignEmail = "Please Enter Email ID";
            }
            else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
                if (!emailRegex.test(values.SignEmail)) {
                    errors.SignEmail = "Please Enter valid Email ID";
                }
            }
            if (!values.mobile_no) {
                errors.mobile_no = "Please Enter Mobile Number"
            }
        
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Username: values.Username,
                Name: values.Name,
                SignEmail: values.SignEmail,
                mobile_no: values.mobile_no
        
              
            }
            await AddSubadminbyAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "User Created!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/allSubadmin')
                        }, 1500)
                    }
                    else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in adding the Edit Subadmin", err)
                })
        },
    });

    const fields = [
        {
            name: "Name",
            label: "Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Username",
            label: "UserName",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "SignEmail",
            label: "Email ID",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "mobile_no",
            label: "Mobile Number",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        
        

    ];


    return (
        <>
           
                    <AddForm
                        fields={fields.filter(
                            (field) => !field.showWhen || field.showWhen(formik.values)
                        )}
                        page_title="Edit SubAdmin"
                        btn_name="Edit"
                        btn_name1="Cancel"
                        formik={formik}
                        btn_name1_route={"/admin/allSubadmin"}
                        
                    />
            
        </>
    );
};

export default EditSubadmin;
