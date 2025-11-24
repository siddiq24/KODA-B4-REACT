import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: {
        image: ""
    },
    profile: null,
    role: null,
    isLoading: false,
    loading: false,
    uploading: false,
    error: null,
    success: false,
    token: localStorage.getItem('token') || null,
    expToken: null
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
                token: token,
                role: res.data.result.role
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
            const token = auth.token

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

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ userData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/profile`,
                userData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.result;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);

export const updateProfileImage = createAsyncThunk(
    'auth/updateProfileImage',
    async ({ imageFile, token }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/profile/image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data.result;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        clearUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // register
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

            // login
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.role = action.payload.role
                state.error = null
                state.expToken = new Date().getTime() + 60 * 5 * 1000
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.user = null
                state.token = null
            })

            // get profile
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

            // logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.role = null
                state.error = null
                state.isLoading = false
                state.success = false // reset success state
            })
            .addCase(logout.rejected, (state) => {
                state.user = null
                state.token = null
                state.error = null
                state.role = null
                state.isLoading = false
                state.success = false // reset success state
            })

            // update profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = { ...state.user, ...action.payload };
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // update gambar
            .addCase(updateProfileImage.pending, (state) => {
                state.uploading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfileImage.fulfilled, (state, action) => {
                state.uploading = false;
                state.success = true;
                state.user.image = action.payload;
                state.error = null;
            })
            .addCase(updateProfileImage.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
})

export const { clearError, clearSuccess, clearUser } = authSlice.actions
export default authSlice.reducer