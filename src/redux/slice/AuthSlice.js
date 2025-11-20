import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    profile: null,
    isLoading: false,
    error: null,
    token: localStorage.getItem('token') || null,
}

const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

if (initialState.token) {
    setAuthHeader(initialState.token)
}

export const register = createAsyncThunk(
    "auth/register",
    async (user, { rejectWithValue }) => {
        try {
            console.log("Data register:", user)
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
                fullname: user.full_name,
                email: user.email,
                password: user.password,
                role: 'user',
                image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg'
            })
            console.log("Respon register:", res.data)
            return res.data
        } catch (error) {
            console.error("Register error:", error.response?.data || error.message)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (form, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, form)
            console.log("Respon login:", res.data)

            const token = res.data.token
            if (!token) {
                throw new Error('No token received from server')
            }

            localStorage.setItem('token', token)
            setAuthHeader(token)

            const profileRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log("Profile data:", profileRes.data.result)

            return {
                user: profileRes.data.result,
                token: token
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message)
            localStorage.removeItem('token')
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState()
            const token = auth.token || localStorage.getItem('token')

            if (!token) {
                throw new Error('No token available')
            }

            setAuthHeader(token)

            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`)
            console.log("Profile data:", res.data.result)
            return res.data.result
        } catch (error) {
            console.error("Get profile error:", error.response?.data || error.message)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                setAuthHeader(token)
                await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`)
            }

            localStorage.removeItem('token')
            localStorage.removeItem('persist:root')
            setAuthHeader(null)

            return null
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message)
            localStorage.removeItem('token')
            localStorage.removeItem('persist:root')
            setAuthHeader(null)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        updateProfile: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.user = null
                state.token = null
            })

            .addCase(getProfile.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.user = null
                state.token = null
                localStorage.removeItem('token')
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.error = null
                state.isLoading = false
            })
            .addCase(logout.rejected, (state) => {
                state.user = null
                state.token = null
                state.error = null
                state.isLoading = false
            })
    }
})

export const { clearError, updateProfile } = authSlice.actions
export default authSlice.reducer