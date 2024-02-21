import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const offersSlice = createSlice({
  name: "offers",
  initialState: {
    data: {}, //id, company, job_id, salary, deadline, user_id,
    status: "idle", //status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      let offers = action.payload;
      console.log(`REDUCER: invoker ADD for ${offers.length} entries`);

      for (let offer of offers) {
        state.offers.data[offer.id] = offer; //Expects all offer data structure to be passed from an array of entries
      }
    },
    modify: (state, action) => {
      console.log("REDUCER: invoker Modify");
      state.offers.data.action.payload.id = action.payload; //Expects all offer data structure to be passed
    },
    deleteOne: (state, action) => {
      console.log("REDUCER: invoker DeleteOne");
      delete state.offers.data.action.payload.id; //Expects offer id to be passed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state, action) => {
        console.log(`####### fetchOffers.pending! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        state.status = "loading";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        console.log(`####### fetchOffers.fulfilled! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        let offers = action.payload;
        for (let offer of offers) {
          state.offers.data[offer.id] = offer; //Expects all offer data structure to be passed from an array of entries
        }

        state.status = "succeeded";
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        console.log("(`####### state.data ", state?.data);
        console.log("(`####### state.status ", state?.status);
        console.log(`#### action `, action);
        state.error = action.error.message;
        console.log(`####### fetchOffers.rejected! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
          error_name: action.error.name,
          error_message: action.error.message,
          error_stack: action.error.stack,
        });
        state.status = "failed";
      });
  },
});

export const { add, modify, deleteOne } = offersSlice.actions;

export const fetchOffers = createAsyncThunk("offers/fetchOffers", async () => {
  const response = await fetch("http://localhost:8080/api/offers/");
  const data = await response.json();
  console.log("#### fetchOffers ", data);
  return data;
});

/*-------------------//     
//      SELECTORS    //     
//-------------------/*/

export const selectAllOffers = (state) => {
  return state.offers.data;
};

export const selectOffersById = (state, offersIdsObj) => {
  const selectedOffers = [];
  for (let id in offersIdsObj) {
    if (state.offers.offerIdsObj[id]) {
      selectedOffers.push(state.offers.offersIdsObj[id]);
    }
  }
  return selectedOffers;
};

export default offersSlice.reducer;
