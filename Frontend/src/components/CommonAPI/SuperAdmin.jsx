import axios from "axios"
import * as Config from "../../Utils/Config";

export const superAdminDashboard = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Superadmindashboard`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}

export const adminDetails = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AdminDetails`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}

export const createAdmin = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CreateAdmin`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}

export const getCompanyName = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Companynames`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }

}

export const companyDetails = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AmmountDetails/${data.comapnyName}`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }

}

