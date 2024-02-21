import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    data: {}, //id, title, salary, open_Date, address, company_id user_id
    status: "idle", //status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      let jobs = action.payload;
      console.log(`REDUCER: invoker ADD for ${jobs.length} entries`);

      for (let job of jobs) {
        state.jobs.data[job.id] = job; //Expects all job data structure to be passed from an array of entries
      }
    },
    modify: (state, action) => {
      console.log("REDUCER: invoker Modify");
      state.jobs.data.action.payload.id = action.payload; //Expects all job data structure to be passed
    },
    deleteOne: (state, action) => {
      console.log("REDUCER: invoker DeleteOne");
      delete state.jobs.data.action.payload.id; //Expects job id to be passed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        console.log(`####### fetchJobs.pending! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log(`####### fetchJobs.fulfilled! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        let jobs = action.payload;
        for (let job of jobs) {
          state.jobs.data[job.id] = job; //Expects all job data structure to be passed from an array of entries
        }

        state.status = "succeeded";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        console.log("(`####### state.data ", state?.data);
        console.log("(`####### state.status ", state?.status);
        console.log(`#### action `, action);
        state.error = action.error.message;
        console.log(`####### fetchJobs.rejected! `, {
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

export const { add, modify, deleteOne } = jobsSlice.actions;

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch("http://localhost:8080/api/jobs/");
  const data = await response.json();
  console.log("#### fetchJobs ", data);
  return data;
});

/*-------------------//     
//      SELECTORS    //     
//-------------------/*/

export const selectAllJobs = (state) => {
  return state.jobs.data;
};

export const selectJobsById = (state, jobsIdsObj) => {
  const selectedJobs = [];
  for (let id in jobsIdsObj) {
    if (state.jobs.jobIdsObj[id]) {
      selectedJobs.push(state.jobs.jobsIdsObj[id]);
    }
  }
  return selectedJobs;
};

export default jobsSlice.reducer;
