import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { createAdmin } from '../../CommonAPI/SuperAdmin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const AddClient = () => {


    const formik = useFormik({
        initialValues: {
            Username: "",
            mobile_no: "",
            Password: "",
            ConfirmPassword: "",
            Email: "",
            BName: "",
            Group: "",
            PlanName: "",
            ClientAmount: "0",
            Subadmin: "",
        },
        validate: (values) => {
            let errors = {};
            if (!values.Username) {
                errors.Username = "Please enter the username";
            }
            if (!values.mobile_no) {
                errors.mobile_no = "Please enter the mobile number";
            }
            if (!values.Email) {
                errors.Email = "Please enter the email";
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.SignEmail)) {
                errors.SignEmail = "Invalid email address";
            }
            if (!values.Password) {
                errors.Password = "Please enter the password";
            }
            if (!values.ConfirmPassword) {
                errors.ConfirmPassword = "Please enter the confirm password";
            }
            if (values.Password !== values.ConfirmPassword) {
                errors.ConfirmPassword = "Password and confirm password should be same";
            }
            if (!values.BName) {
                errors.BName = "Please enter the BName";
            }
            if (!values.PlanName) {
                errors.PlanName = "Please enter the plan name";
            }
            if (!values.ClientAmount) {
                errors.ClientAmount = "Please enter the client amount";
            }
            if (!values.Group) {
                errors.Group = "Please enter the group";
            }
            if (!values.ClientAmount) {
                errors.ClientAmount = "Please enter the client amount";
            }
            if (!values.Subadmin) {
                errors.Subadmin = "Please enter the subadmin";
            }
           
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Username: values.Username,
                mobile_no: values.mobile_no,
                Password: values.Password,
                ConfirmPassword: values.ConfirmPassword,
                Email: values.Email,
                BName: values.BName,
                Group: values.Group,
                PlanName: values.PlanName,
                ClientAmount: values.ClientAmount,
                Subadmin: values.Subadmin,
                
            }
            await createAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Client Created!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/subadmin/addclient')
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
                    console.log("Error in adding the new user", err)
                })
        },
    });

    const fields = [
        {
            name: "Username",
            label: "Username",
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
        {
            name: "Email",
            label: "Email ID",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Password",
            label: "Password",
            type: "password",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "ConfirmPassword",
            label: "Confirm Password",
            type: "password",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "BName",
            label: "B Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Group",
            label: "Group",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "PlanName",
            label: "Plan Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "ClientAmount",
            label: "Client Amount",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Subadmin",
            label: "Subadmin",
            type: "text",

            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
    ];

  return (
    <div>
        
        <AddForm
    fields={fields}
    page_title="Create Client"
    btn_name="Add"
    btn_name1="Cancel"
    formik={formik}
   
/></div>
  )
}

export default AddClient