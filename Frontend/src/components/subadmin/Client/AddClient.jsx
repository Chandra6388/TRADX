import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createClient } from '../../CommonAPI/SubAdmin';
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  const navigate = useNavigate();
  
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
      ClientAmount: "",
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
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
        errors.Email = "Invalid email address";
      }
      if (!values.Password) {
        errors.Password = "Please enter the password";
      }
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "Please enter the confirm password";
      }
      if (values.Password !== values.ConfirmPassword) {
        errors.ConfirmPassword = "Password and confirm password should be the same";
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
      if (!values.Subadmin) {
        errors.Subadmin = "Please enter the subadmin";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        username: values.Username,
        mobile_no: values.mobile_no,
        password: values.Password,
        cpassword: values.ConfirmPassword,
        email: values.Email,
        bname: values.BName,
        group: values.Group,
        planname: values.PlanName,
        ClientAmmount: values.ClientAmount,
        SubAdmin: values.Subadmin,
      };

      // API call
      await createClient(req)
        .then((response) => {
          console.log("API Response:", response); // Log response for debugging
          if (response?.Status) {
            Swal.fire({
              title: "Client Created!",
              text: response.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              navigate('/subadmin/addclient'); // Navigate after success
            }, 1500);
          } else {
            Swal.fire({
              title: "Error!",
              text: response?.message || "Something went wrong.",
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
        .catch((err) => {
          console.error("Error in adding the new user", err); // Handle error
          Swal.fire({
            title: "Error!",
            text: "There was an error while adding the client.",
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        });
    },
  });

  const fields = [
    { name: "Username", label: "Username", type: "text", col_size: 6 },
    { name: "mobile_no", label: "Mobile Number", type: "text", col_size: 6 },
    { name: "Email", label: "Email ID", type: "text", col_size: 6 },
    { name: "Password", label: "Password", type: "password", col_size: 6 },
    { name: "ConfirmPassword", label: "Confirm Password", type: "password", col_size: 6 },
    { name: "BName", label: "B Name", type: "text", col_size: 6 },
    { name: "Group", label: "Group", type: "text", col_size: 6 },
    { name: "PlanName", label: "Plan Name", type: "text", col_size: 6 },
    { name: "ClientAmount", label: "Client Amount", type: "text", col_size: 6 },
    { name: "Subadmin", label: "Subadmin", type: "text", col_size: 6 },
  ];

  return (
    <div>
      <AddForm
        fields={fields}
        page_title="Create Client"
        btn_name="Add"
        btn_name1="Cancel"
        formik={formik}
      />
    </div>
  );
};

export default AddClient;
