import React from 'react'
import { useFormik } from 'formik';
import AddForm from '../../../ExtraComponent/FormData';


const StrategyGroup = () => {

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
            mobile_no: "",
            Select_License: "",
            ClientAmmount: 0,
            planname: "",
            bname: "",
            group: [],
        },
        validate: (values) => {
            let errors = {};
            if (!values.username) {
                errors.username = "Please Enter Username"
            }
            else if (!Name_regex(values.username)) {
                errors.username = "Please Enter Valid Username"
            }
            if (!values.email) {
                errors.email = "Please Enter Email ID";
            }
            else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
                if (!emailRegex.test(values.email)) {
                    errors.email = "Please Enter valid Email ID";
                }
            }
            if (!values.password) {
                errors.password = "Please Enter Password"
            }
            if (!values.cpassword) {
                errors.cpassword = "Please Enter Confirm Password"
            }
            if (!values.mobile_no) {
                errors.mobile_no = "Please Enter Mobile Number"
            }
            if (!values.Select_License) {
                errors.Select_License = "Please Select License"
            }
            if (!values.ClientAmmount && formik.values.Select_License == '2') {
                errors.ClientAmmount = "Please Enter Amount"
            }
            if (!values.planname) {
                errors.planname = "Please Select Plan"
            }

            if (!values.bname && formik.values.Select_License == '2') {
                errors.bname = "Please Select Broker"
            }
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                username: values.username,
                email: values.email,
                password: values.password,
                cpassword: values.cpassword,
                mobile_no: values.mobile_no,
                bname: formik.values.Select_License==1 ? "Demo" : values.bname,
                ClientAmmount: formik.values.Select_License == 1 ? 0 : Number(values.ClientAmmount),
                planname: values.planname,
                group: selectedOptions && selectedOptions
            }

            const FilterPlanAmount = GetAllPlans.data.filter((item) => item.PlanName === values.planname);
            if (FilterPlanAmount[0].payment > values.ClientAmmount && FilterPlanAmount[0].payment !== '') {
                Swal.fire({
                    title: "Invalid Amount",
                    text: `The plan amount is ${FilterPlanAmount[0].payment}, but you've entered ${values.ClientAmmount}. Please enter an amount greater than the plan amount.`,
                    icon: "error",
                    timer: 3000,
                    timerProgressBar: true
                });
                return 
                
            } 
            await CreateAccount(req)
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
        name: 'strategyGroupName',
        label: 'Strategy Group Name',
        type: 'text',
        required: true,
    },
    {
        name: 'strategyGroupDescription',
        label: 'Strategy Group Description',
        type: 'text',
        required: true,
    }
]



  return (
    <div>  <AddForm
    fields={fields.filter(
        (field) => !field.showWhen || field.showWhen(formik.values)
    )}
    page_title="Create Account"
    btn_name="Add"
    btn_name1="Cancel"
    formik={formik}
   
    
/></div>
  )
}

export default StrategyGroup