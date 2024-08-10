import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    keyword: '',
    date: '',
    category: '',
    source: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
