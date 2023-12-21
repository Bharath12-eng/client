import axios from "axios"
// export const deleteEmployee = async(id) =>{
//         return await axios.delete(`/api/deleteEmployee/${id}`)
// }
const BaseURL = "http://localhost:5400";

// export const allemployee = async(search,gender,sort,page) =>{
//         return await axios.get(`/api/allemployee?search=${search}&gender=${gender}&sort=${sort}&page=${page}`,"")
// }

export const allemployee = async(sort,search,page)=>{
        return await axios.get(`${BaseURL}/apis/allemployees?sort=${sort}&search=${search}&page=${page}`,"")
}


export const addEmployeedata = async(employee) =>{
        return await axios.post(`${BaseURL}/apis/addEmployees`,employee);
}

export const singleEmployee  = async(id)=>{
        return await axios.get(`${BaseURL}/apis/singleEmployee/${id}`)
}

export const qualificactionDetails = async (qualificaction) =>{
        return await axios .post(`${BaseURL}/apis/qualification`,qualificaction)
}

export const qualificationdata = async(id)=>{
        return await axios.put(`${BaseURL}/apis/edit/${id}`)
}