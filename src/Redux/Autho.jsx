import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../ApiServices/ApiServices";

// Async thunk for handling login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ MastName, password }, { rejectWithValue }) => {
  try {
    const response = await apiService.post("/User/Login", { MastName, password });
    if (response.data && response.data.Token) {
      // Store data in sessionStorage
      sessionStorage.setItem("EmployeeId", response.data.EmployeeId);
      sessionStorage.setItem("EmployeeName", response.data.EmployeeName);
      sessionStorage.setItem("Token", response.data.Token);
      sessionStorage.setItem("Usercode", response.data.MastCode);
      sessionStorage.setItem("RoleCode", response.data.RoleCode);
      sessionStorage.setItem("isAuthenticated", "true");
      return response.data;
    } else {
      return rejectWithValue("Invalid username or password");
    }
  } catch (error) {
    return rejectWithValue("Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: sessionStorage.getItem("isAuthenticated") === "true" || false,
    user: {
      EmployeeId: sessionStorage.getItem("EmployeeId") || "",
      EmployeeName: sessionStorage.getItem("EmployeeName") || "",
      Token: sessionStorage.getItem("Token") || "",
      Usercode: sessionStorage.getItem("Usercode") || "",
      RoleCode: sessionStorage.getItem("RoleCode") || "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      sessionStorage.clear();
      state.isAuthenticated = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
