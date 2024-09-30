import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";

export const getAllMovies = createAsyncThunk(
  "getAllMovies",
  async (params, { rejectWithValue }) => {
    console.log(params.params);

    try {
      const response = await apiClient.get("/getMovies", {
        params: params.params,
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);
