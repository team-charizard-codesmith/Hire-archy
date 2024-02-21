import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const interviewsSlice = createSlice({
  name: "interviews",
  initialState: {
    data: {}, //id, company (id), job_id, notes, round, user_id
    status: "idle", //status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      let interviews = action.payload;
      console.log(`REDUCER: invoker ADD for ${interviews.length} entries`);

      for (let interview of interviews) {
        state.interviews.data[interview.id] = interview; //Expects all interview data structure to be passed from an array of entries
      }
    },
    modify: (state, action) => {
      console.log("REDUCER: invoker Modify");
      state.interviews.data.action.payload.id = action.payload; //Expects all interview data structure to be passed
    },
    deleteOne: (state, action) => {
      console.log("REDUCER: invoker DeleteOne");
      delete state.interviews.data.action.payload.id; //Expects interview id to be passed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInterviews.pending, (state, action) => {
        console.log(`####### fetchInterviews.pending! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        state.status = "loading";
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        console.log(`####### fetchInterviews.fulfilled! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        let interviews = action.payload;
        for (let interview of interviews) {
          state.interviews.data[interview.id] = interview; //Expects all interview data structure to be passed from an array of entries
        }

        state.status = "succeeded";
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        console.log("(`####### state.data ", state?.data);
        console.log("(`####### state.status ", state?.status);
        console.log(`#### action `, action);
        state.error = action.error.message;
        console.log(`####### fetchInterviews.rejected! `, {
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

export const { add, modify, deleteOne } = interviewsSlice.actions;

export const fetchInterviews = createAsyncThunk(
  "interviews/fetchInterviews",
  async () => {
    const response = await fetch("http://localhost:8080/api/interviews/");
    const data = await response.json();
    console.log("#### fetchInterviews ", data);
    return data;
  }
);

/*-------------------//     
//      SELECTORS    //     
//-------------------/*/

export const selectAllInterviews = (state) => {
  return state.interviews.data;
};

export const selectInterviewsById = (state, interviewsIdsObj) => {
  const selectedInterviews = [];
  for (let id in interviewsIdsObj) {
    if (state.interviews.interviewIdsObj[id]) {
      selectedInterviews.push(state.interviews.interviewsIdsObj[id]);
    }
  }
  return selectedInterviews;
};

export default interviewsSlice.reducer;
