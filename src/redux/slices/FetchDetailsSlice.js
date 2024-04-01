import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
export const fetchInternAttendanceRecords = createAsyncThunk("fetchInternAttendanceRecords", async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/attendance_records",{
            headers:{
                Accept: "application/json",
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        return response.data.attendanceRecords;
    } catch (error) {
        console.log("error while fetching data from api ", error);
    }
});

const fetchDetails = createSlice({
    name: "data",
    initialState: {
        AttendanceRecords: [],
        iserror: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInternAttendanceRecords.pending, (state) => {
            state.iserror = false;
        })
        builder.addCase(fetchInternAttendanceRecords.fulfilled, (state, action) => {
            state.AttendanceRecords = action.payload;
            state.iserror = false;
        })
        builder.addCase(fetchInternAttendanceRecords.rejected, (state) => {
            state.iserror = true;
        })
    }
})

export default fetchDetails.reducer;