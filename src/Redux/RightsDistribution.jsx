import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../ApiServices/ApiServices";

// Fetch roles
export const fetchRoles = createAsyncThunk("rights/fetchRoles", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get("/role/ComboRole");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch roles");
  }
});

// Fetch menu rights for a selected role
export const fetchMenuRights = createAsyncThunk("rights/fetchMenuRights", async (roleId, { rejectWithValue }) => {
  try {
    const response = await apiService.get(`/Menu/GetMenuForRights/${roleId}`);
    return Array.isArray(response.data.Table) ? response.data.Table : [];
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch menu rights");
  }
});

// Save role rights
export const saveRights = createAsyncThunk("rights/saveRights", async ({ roleId, rightsData }, { rejectWithValue }) => {
  try {
    await apiService.post(`/Role/CreateRoleDetails`, rightsData);
    return "Rights updated successfully!";
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update rights");
  }
});

const rightsSlice = createSlice({
  name: "rights",
  initialState: {
    roles: [],
    selectedRole: "",
    menuRights: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    updateRights: (state, action) => {
      const { index, field, value } = action.payload;
      state.menuRights = state.menuRights.map((menu, i) =>
        i === index ? { ...menu, [field]: value ? 1 : 0 } : menu
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch menu rights
      .addCase(fetchMenuRights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuRights.fulfilled, (state, action) => {
        state.loading = false;
        state.menuRights = action.payload;
      })
      .addCase(fetchMenuRights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save rights
      .addCase(saveRights.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveRights.fulfilled, (state, action) => {
        state.loading = false;
        alert(action.payload); // Show success message
      })
      .addCase(saveRights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedRole, updateRights } = rightsSlice.actions;
export default rightsSlice.reducer;
