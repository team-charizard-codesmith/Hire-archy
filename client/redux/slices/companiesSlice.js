import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    data: {}, //id, name, address
    status: "idle", //status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      let companies = action.payload;
      console.log(`REDUCER: invoker ADD for ${companies.length} entries`);

      for (let company of companies) {
        state.companies.data[company.id] = company; //Expects all company data structure to be passed from an array of entries
      }
    },
    modify: (state, action) => {
      console.log("REDUCER: invoker Modify");
      state.companies.data.action.payload.id = action.payload; //Expects all company data structure to be passed
    },
    deleteOne: (state, action) => {
      console.log("REDUCER: invoker DeleteOne");
      delete state.companies.data.action.payload.id; //Expects company id to be passed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        console.log(`####### fetchCompanies.pending! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        console.log(`####### fetchCompanies.fulfilled! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        let companies = action.payload;
        for (let company of companies) {
          state.companies.data[company.id] = company; //Expects all company data structure to be passed from an array of entries
        }

        state.status = "succeeded";
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        console.log("(`####### state.data ", state?.data);
        console.log("(`####### state.status ", state?.status);
        console.log(`#### action `, action);
        state.error = action.error.message;
        console.log(`####### fetchCompanies.rejected! `, {
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

export const { add, modify, deleteOne } = companiesSlice.actions;

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const response = await fetch("http://localhost:8080/api/companies/");
    const data = await response.json();
    console.log("#### fetchCompanies ", data);
    return data;
  }
);

/*-------------------//     
//      SELECTORS    //     
//-------------------/*/

export const selectAllCompanies = (state) => {
  return state.companies.data;
};

export const selectCompaniesById = (state, companiesIdsObj) => {
  const selectedCompanies = [];
  for (let id in companiesIdsObj) {
    if (state.companies.companyIdsObj[id]) {
      selectedCompanies.push(state.companies.companiesIdsObj[id]);
    }
  }
  return selectedCompanies;
};

export default companiesSlice.reducer;
