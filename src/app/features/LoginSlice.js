import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from '../../api/axios.config'

const initialState = {
  loading: false, // ** Pending
  data: null, // ** success => fulfilled
  error: null // ** Error => rejected
}

export const userLogin = createAsyncThunk("login/userLogin", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await axiosInstance.post(`/api/auth/local`, user)
    return data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {},
  extraReducers: {
    [userLogin.pending]: state => {
      state.loading = true
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false,
      state.data = action.payload,
      state.error = null
    },
    [userLogin.pending]: (state, action) => {
      state.loading = false,
      state.data = [],
      state.error = action.payload
    },
  }
})

export const selectLogin = ({ login }) => login
export default loginSlice.reducer