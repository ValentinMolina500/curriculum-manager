import { createSlice } from "@reduxjs/toolkit"

export const offeringsSlice = createSlice({
  name: "offering",
  initialState: {
    offerings: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    offeringsSuccess: (state, action) => {
      state.offerings = action.payload;
      state.status =  'success';
    },
    offeringsError: (state, action) => {
      state.status = 'error';
    },
    setOfferingStatus: (state, action) => {
      state.status = action.payload;
    }
  }
})

export const { offeringsSuccess, offeringsError, setOfferingStatus } = offeringsSlice.actions;

export const selectOfferings = (state) => state.offerings.offerings;
export const selectOfferingsById = (state, id) => state.offerings.offerings.find((offering) => offering.id === id);

export default offeringsSlice.reducer;