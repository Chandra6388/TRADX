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

