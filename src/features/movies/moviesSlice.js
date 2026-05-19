import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMovieDetailsApi,
  getPopularMovies,
  searchMoviesApi,
} from "../../services/tmdbApi";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (_, thunkAPI) => {
    try {
      const data = await getPopularMovies();
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query, thunkAPI) => {
    try {
      const data = await searchMoviesApi(query);
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId, thunkAPI) => {
    try {
      const data = await getMovieDetailsApi(movieId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  popularMovies: [],
  searchResults: [],
  selectedMovie: null,

  popularStatus: "idle",
  searchStatus: "idle",
  detailsStatus: "idle",

  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = "idle";
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.detailsStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popularStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularStatus = "succeeded";
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popularStatus = "failed";
        state.error = action.payload;
      })

      .addCase(searchMovies.pending, (state) => {
        state.searchStatus = "loading";
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.payload;
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.detailsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults, clearSelectedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;