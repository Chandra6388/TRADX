import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createClient } from '../../CommonAPI/SubAdmin';
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { Get_Broker_Name , GetGroupNames  } from '../../CommonAPI/Admin'
import { Get_All_Plans } from "../../CommonAPI/User";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";


const AddClient = () => {
  const navigate = useNavigate();
  const [getBroker, setBroker] = useState({ loading: true, data: [] })
  const [optionsArray, setoptionsArray] = useState([]);
  const [getGroupData, setGroupData] = useState({ loading: true, data: [] })
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [GetAllPlans, setAllPlans] = useState({ LivePlanName: [], DemoPlanName: [], data: [] });


  useEffect(() => {
    getBrokerName();
    GetAllGroupDetails();
    GetAllPlansData();
  }, [])

  const getBrokerName = async () => {
    await Get_Broker_Name()
      .then((response) => {
        if (response.Status) {
          const filterOutBroker = response.Brokernamelist.filter((item) => {
            return item.BrokerName != 'DEMO'
          })
          setBroker({
            loading: false,
            data: filterOutBroker
          })
        }
        else {
          setBroker({
            loading: false,
            data: []
          })
        }
      })
      .catch((err) => {
        console.log("Error in finding the broker", err)
      })
  }


  const GetAllGroupDetails = async () => {
    try {
        await GetGroupNames()
            .then((response) => {
                if (response.Status) {
                    const arr = response.Data.map(item => ({
                        label: item.GroupName,
                        key: item.GroupName
                    }));
                    setoptionsArray(arr);


                    setGroupData({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setGroupData({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in data fetch", err)
            })
    }
    catch {
        console.log("Error group data fetch")
    }
}

const GetAllPlansData = async () => {
  await Get_All_Plans()
      .then((response) => {
          if (response.Status) {
              const LivePlanName = response.Admin.filter((item) => item.PlanName !== 'One Week Demo' && item.PlanName !== 'Two Days Demo');
              const DemoPlanName = response.Admin.filter((item) => item.PlanName === 'One Week Demo' || item.PlanName === 'Two Days Demo');
              setAllPlans({ DemoPlanName: DemoPlanName, LivePlanName: LivePlanName, data: response.Admin });
          }
          else {
              setAllPlans({ DemoPlanName: [], LivePlanName: [], data: [] });
          }
      })
      .catch((err) => {
          console.log("Error in fetching the plans", err)
      })
};


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
      Select_License : '2'
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

  // const fields = [
  //   { 
  //     name: "Username", 
  //     label: "Username",
  //      type: "text",
  //       col_size: 6
  //      },
  //   { name: "Email", label: "Email ID", type: "text", col_size: 6 },
  //   { name: "Password", label: "Password", type: "password", col_size: 6 },
  //   { name: "ConfirmPassword", label: "Confirm Password", type: "password", col_size: 6 },
  //   { name: "mobile_no", label: "Mobile Number", type: "text", col_size: 6 },
  //   { name: "Group", label: "Group", type: "text", col_size: 6 },
  //   { name: "PlanName", label: "Plan Name", type: "text", col_size: 6 },
  //   { name: "ClientAmount", label: "Client Amount", type: "text", col_size: 6 },
  //   { name: "Subadmin", label: "Subadmin", type: "text", col_size: 6 },
  //   {
  //     name: "Select_License",
  //     label: "License Type",
  //     type: "select1",
  //     options: [
  //       { label: "Demo", value: "1" },
  //       { label: "Live", value: "2" },

  //     ],
  //     label_size: 12,
  //     hiding: false,
  //     col_size: 6,
  //     disable: false,
  //   },
  //   {
  //     name: "BName",
  //     label: "Broker",
  //     type: "select1",
  //     options: getBroker.data && getBroker.data.map((item) => ({
  //       label: item.BrokerName,
  //       value: item.BrokerName
  //     })),
  //     showWhen: (values) => formik.values.Select_License == '2',
  //     label_size: 12,
  //     hiding: false,
  //     col_size: 6,
  //     disable: false,
  //   },
  // ];


  const fields = [
    {
        name: "username",
        label: "Username",
        type: "text",
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },
    {
        name: "email",
        label: "Email ID",
        type: "text",
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },
    {
        name: "cpassword",
        label: "Confirm Password",
        type: "password",
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

       
        name: "Select_License",
        label: "License Type",
        type: "select1",
        options: [
            { label: "Demo", value: "1" },
            { label: "Live", value: "2" },

        ],
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },
    {
        name: "ClientAmmount",
        label: "Amount",
        type: "text3",
        showWhen: (values) => formik.values.Select_License == '2',
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },
    {
        name: "planname",
        label: "Plan Name",
        type: "select1",
        options: formik.values.Select_License == '' ? [] : formik.values.Select_License == 1 ? GetAllPlans.DemoPlanName && GetAllPlans.DemoPlanName.map((item) => ({
            label: item.PlanName,
            value: item.PlanName
        })) :
            GetAllPlans.LivePlanName && GetAllPlans.LivePlanName.map((item) => ({
                label: item.PlanName,
                value: item.PlanName
            })),
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },
    {
        name: "bname",
        label: "Broker",
        type: "select1",
        options: getBroker.data && getBroker.data.map((item) => ({
            label: item.BrokerName,
            value: item.BrokerName
        })),
        showWhen: (values) => formik.values.Select_License == '2',
        label_size: 12,
        hiding: false,
        col_size: 6,
        disable: false,
    },



];

  return (
    <div>
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        page_title="Create Client"
        btn_name="Add"
        btn_name1="Cancel"
        formik={formik}
        additional_field={
          <div className='col-lg-6 mt-2 dropdownuser' >
              <h6>Select Group</h6>
              <DropdownMultiselect
                  options={optionsArray}
                  name="groupName"
                  handleOnChange={(selected) => {
                      setSelectedOptions(selected)
                  }}
              />
          </div>
      }
      />
    </div>
  );
};

export default AddClient;
