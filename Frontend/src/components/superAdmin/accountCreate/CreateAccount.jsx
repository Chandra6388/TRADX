import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { createAdmin } from '../../CommonAPI/SuperAdmin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const Adduser = () => {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            SignuserName: "",
            mobile_no: "",
            Signpassword: "",
            ConfirmPassword: "",
            SignEmail: "",
            AmmountDetails: 0,
            Companyname: "",
            serverip: "",
            MongoUsername: "",
            MongoPass: "",
        },
        validate: (values) => {
            let errors = {};
            if (!values.SignuserName) {
                errors.SignuserName = "Please enter the username";
            }
            if (!values.mobile_no) {
                errors.mobile_no = "Please enter the mobile number";
            }
            if (!values.SignEmail) {
                errors.SignEmail = "Please enter the email";
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.SignEmail)) {
                errors.SignEmail = "Invalid email address";
            }
            if (!values.Signpassword) {
                errors.Signpassword = "Please enter the password";
            }
            if (!values.ConfirmPassword) {
                errors.ConfirmPassword = "Please enter the confirm password";
            }
            if (values.Signpassword !== values.ConfirmPassword) {
                errors.ConfirmPassword = "Password and confirm password should be same";
            }
            if (!values.AmmountDetails) {
                errors.AmmountDetails = "Please enter the amount";
            }
            if (!values.Companyname) {
                errors.Companyname = "Please enter the company name";
            }
            if (!values.serverip) {
                errors.serverip = "Please enter the server ip";
            }
            if (!values.MongoUsername) {
                errors.MongoUsername = "Please enter the mongodb username";
            }
            if (!values.MongoPass) {
                errors.MongoPass = "Please enter the mongodb password";
            }
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                SignuserName: values.SignuserName,
                mobile_no: values.mobile_no,
                Signpassword: values.Signpassword,
                ConfirmPassword: values.ConfirmPassword,
                SignEmail: values.SignEmail,
                AmmountDetails: values.AmmountDetails,
                Companyname: values.Companyname,
                serverip: values.serverip,
                MongoUsername: values.MongoUsername,
                MongoPass: values.MongoPass,
                permission: ["Charting Platform"]
            }
            await createAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Admin Created!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/clientservice')
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
            name: "SignuserName",
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
            name: "SignEmail",
            label: "Email ID",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Signpassword",
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
            name: "AmmountDetails",
            label: "Amount",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Companyname",
            label: "Company Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "serverip",
            label: "Server IP",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "MongoUsername",
            label: "Mongodb Username",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "MongoPass",
            label: "Mongodb Password",
            type: "text",

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
                page_title="Create Account"
                btn_name="Add"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/admin/clientservice"}
            />
        </>
    );
};

export default Adduser;
