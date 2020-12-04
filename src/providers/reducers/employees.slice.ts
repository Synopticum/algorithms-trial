import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type Time = {
  id: string;
  clockedIn: string;
  clockedOut: string;
  unproductiveTime: string;
};

export type Employee = {
  id: string;
  name: string;
  times: Time[];
  active: boolean;
};

type State = Employee[];

export const asyncFetchEmployee = createAsyncThunk('asyncFetchEmployee', async (id: number, { rejectWithValue }) => {
  try {
    const employees: Employee[] = await fetch('/api/employees').then(res => res.json());
    return employees;
  } catch (e) {
    rejectWithValue(e);
  }
});

const initialState: State = [];

const employeesSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncFetchEmployee.pending, (state, action) => {
      // nothing
    });

    builder.addCase(asyncFetchEmployee.fulfilled, (state, action) => {
      const payload: Employee[] = action.payload ? action.payload : initialState;

      return payload;
    });

    builder.addCase(asyncFetchEmployee.rejected, (state, action) => {
      // nothing
    });
  },
});

export default employeesSlice.reducer;
