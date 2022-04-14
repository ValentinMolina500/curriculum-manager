import { createSlice } from "@reduxjs/toolkit"

export const offeringsSlice = createSlice({
  name: "offering",
  initialState: {
    offerings: {
      "8aa25ed4-5e8f-41d9-a70a-b1b0f68dad2e": []
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    offeringsSuccess: (state, action) => {
      const { semesterId, offerings } = action.payload;
      state.offerings[semesterId] = offerings;
      state.status = 'success';
    },
    offeringsError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    setOfferingStatus: (state, action) => {
      state.status = action.payload;
    }
  }
})

export const { offeringsSuccess, offeringsError, setOfferingStatus } = offeringsSlice.actions;

export const selectOfferingsById = (state, semesterId) => {
  console.log(state[semesterId]);
  return {
    state: state.offerings.status,
    offerings: state.offerings.offerings[semesterId] ?? []
  }
}

export default offeringsSlice.reducer;