import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AddSubadminbyAdmin, Get_Broker_Name, GetGroupNames } from '../../CommonAPI/Admin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../ExtraComponent/Loader';
import { Get_All_Plans } from "../../CommonAPI/User";

const AddSubadmin = () => {
    const navigate = useNavigate()
    const Name_regex = (name) => {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    };

    const [optionsArray, setOptionsArray] = useState([
        { "value": "AddClient", "label": "AddClient" },
        { "value": "ViewClient", "label": "ViewClient" },
        { "value": "EditClient", "label": "EditClient" },
        { "value": "TradeHistory", "label": "TradeHistory" },
        { "value": "TradeReport", "label": "TradeReport" },
        { "value": "UpdateApiKey", "label": "UpdateApiKey" },
    ])



    const formik = useFormik({
        initialValues: {
            Username: "",
            Name: "",
            SignEmail: "",
            mobile_no: "",
            Signpassword: "",
            ConfirmPassword: "",
            permission: [],

        },
        validate: (values) => {
            let errors = {};

            // Username validation
            if (!values.Username) {
                errors.Username = "Please Enter Username";
            } else if (!Name_regex(values.Username)) {
                errors.Username = "Please Enter Valid Username";  // Fixed error key to match the field name
            }

            // Name validation (Allow spaces)
            const nameRegex = /^[a-zA-Z ]+$/; // Updated regex to allow letters and spaces
            if (!values.Name) {
                errors.Name = "Please Enter Name";
            } else if (!nameRegex.test(values.Name)) {
                errors.Name = "Please Enter Valid Name (Only letters and spaces allowed)";
            }

            // Email validation
            if (!values.SignEmail) {
                errors.SignEmail = "Please Enter Email ID";
            } else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
                if (!emailRegex.test(values.SignEmail)) {
                    errors.SignEmail = "Please Enter valid Email ID";
                }
            }

            // Password validation
            if (!values.Signpassword) {
                errors.Signpassword = "Please Enter Password";
            } else if (values.Signpassword.length < 8 || values.Signpassword.length > 15) {
                errors.Signpassword = "Password must be between 8 and 15 characters";
            } else if (!/(?=.*[a-z])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one lowercase letter";
            } else if (!/(?=.*[A-Z])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one uppercase letter";
            } else if (!/(?=.*[0-9])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one number";
            } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one special character";
            }

            // Confirm Password validation
            if (!values.ConfirmPassword) {
                errors.ConfirmPassword = "Please Enter Confirm Password";
            } else if (values.ConfirmPassword !== values.Signpassword) {
                errors.ConfirmPassword = "Passwords do not match";
            }

            // Mobile number validation
            if (!values.mobile_no) {
                errors.mobile_no = "Please Enter Mobile Number";
            } else if (values.mobile_no.length !== 10) { // Check for length not equal to 10
                errors.mobile_no = "Mobile number length must be 10 characters";
            }

            return errors;
        },

        onSubmit: async (values) => {
            const req = {
                Username: values.Username,
                Name: values.Name,
                SignEmail: values.SignEmail,
                mobile_no: values.mobile_no,
                Signpassword: values.Signpassword,
                ConfirmPassword: values.ConfirmPassword,
                permission: values.permission,
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
                    console.log("Error in adding the new user", err)
                })
        },
    });

;

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
            name: "permission",
            label: "Permission",
            type: "select2", // Custom dropdown for brokers
            label_size: 12,
            col_size: 6,
            disable: false,
            options: optionsArray
        },



    ];


    return (
        <>
            <AddForm
                fields={fields}
                page_title="Create Sub_Admin Account"
                btn_name="Add"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/admin/allSubadmin"}

            />

        </>
    );
};

export default AddSubadmin;
