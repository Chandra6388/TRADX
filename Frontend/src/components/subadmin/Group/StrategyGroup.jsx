import React from 'react'
import { useFormik } from 'formik';
import AddForm from '../../../ExtraComponent/FormData';
import { CreateAdminstrategiesgroup } from '../../CommonAPI/SubAdmin';
import Swal from 'sweetalert2';


const StrategyGroup = () => {

    const formik = useFormik({
        initialValues: {
            strategyGroupName: "",
            FundReuirement: "1000",
            Risk: "",
            TimeOrigin: "",
            ProductType: "",
            Message: "",
            SubAdmin: "",
           
        },
        validate: (values) => {
            let errors = {};
            if (!values.strategyGroupName) {
                errors.strategyGroupName = "Please Enter strategy Group Name"
            }
            // else if (!Name_regex(values.strategyGroupName)) {
            //     errors.username = "Please Enter Valid strategy Group Name"
            // }
            
            if (!values.FundReuirement) {
                errors.FundReuirement = "Please Enter Fund Reuirement"
            }
            if (!values.Risk) {
                errors.Risk = "Please Enter Risk"
            }
            if (!values.TimeOrigin) {
                errors.TimeOrigin = "Please EnterTime Origin"
            }
           
            if (!values.ProductType) {
                errors.ProductType = "Please Select Product Type"
            }
            if (!values.Message) {
                errors.Message = "Please Select Message"
            }
            if (!values.SubAdmin) {
                errors.SubAdmin = "Please Select SubAdmin"
            }
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                strategyGroupName: values.strategyGroupName,
                FundReuirement: values.FundReuirement,
                Risk: values.Risk,
                TimeOrigin: values.TimeOrigin,
                ProductType: values.ProductType,
                Message: values.Message,
                SubAdmin: values.SubAdmin,
            };
        
        
            try {
                const response = await CreateAdminstrategiesgroup(req);
                console.log("API Response:", response); // Log response data
        
                if (response.Status) {
                    Swal.fire({
                        title: "User Created!",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            } catch (err) {
                console.error("Error in API Call:", err); // Log API errors
            }
        }
        
    });

const fields = [

    {
        name: 'strategyGroupName',
        label: 'Strategy Group Name',
        type: 'text',
        col_size: 6,
        required: true,
    },
    {
        name: 'FundReuirement',
        label: 'Fund Reuirement',
        type: 'text',
        col_size: 6,
        required: true,
    },
    {
        name: 'Risk',
        label: 'Risk',
        type: 'text',
        col_size: 6,
        required: true,
    },
    {
        name: 'TimeOrigin',
        label: 'Time Origin',
        type: 'text',
        col_size: 6,
        required: true,
    },
    {
        name: 'ProductType',
        label: 'Product Type',
        type: 'text',
        col_size: 6,
        required: true,
    },
    {
        name: 'Message',
        label: 'Message',
        type: 'text',
        col_size: 6,
        required: true,
    },
    {
        name: 'SubAdmin',
        label: 'SubAdmin',
        type: 'text',
        col_size: 6,
        required: true,
    }
]

console.log(fields, formik.values);


  return (
    <div>  <AddForm
    fields={fields.filter(
        (field) => !field.showWhen || field.showWhen(formik.values)
    )}
    page_title="Strategy Group"
    btn_name="Add"
    btn_name1="Cancel"
    formik={formik}
   
    
/></div>
  )
}

export default StrategyGroup