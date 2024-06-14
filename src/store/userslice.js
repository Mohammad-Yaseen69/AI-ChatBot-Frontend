import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "../constant"
import toast from "react-hot-toast"


const API = axios.create({
    baseURL: `${BASE_URL}/api/v1/`,
})

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: true
}

export const createAccount = createAsyncThunk("register", async (data) => {
    try {
        const response = await API.post("users", data)
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

export const loginUser = createAsyncThunk("login", async (data) => {
    try {
        const response = await API.post("users/login", data)
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

export const getUser = createAsyncThunk("getUser", async () => {
    console.log("no error")
    try {
        const response = await API.get("users")
        console.log(response.data)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data
                state.isLoggedIn = true
            })
            .addCase(createAccount.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data
                state.isLoggedIn = true
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data
                state.isLoggedIn = true
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
    }
})


export default userSlice.reducer