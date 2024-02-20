import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    data: {}, //id, contact (id), first_name, last_name, email, title, phone
    status: "idle", //status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      let contacts = action.payload;
      console.log(`REDUCER: invoker ADD for ${contacts.length} entries`);

      for (let contact of contacts) {
        state.contacts.data[contact.id] = contact; //Expects all contact data structure to be passed from an array of entries
      }
    },
    modify: (state, action) => {
      console.log("REDUCER: invoker Modify");
      state.contacts.data.action.payload.id = action.payload; //Expects all contact data structure to be passed
    },
    deleteOne: (state, action) => {
      console.log("REDUCER: invoker DeleteOne");
      delete state.contacts.data.action.payload.id; //Expects contact id to be passed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        console.log(`####### fetchContacts.pending! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        console.log(`####### fetchContacts.fulfilled! `, {
          state_data: state?.data,
          status: state?.status,
          action_type: action.type,
          payload: action.payload,
        });
        let contacts = action.payload;
        for (let contact of contacts) {
          state.contacts.data[contact.id] = contact; //Expects all contact data structure to be passed from an array of entries
        }

        state.status = "succeeded";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        console.log("(`####### state.data ", state?.data);
        console.log("(`####### state.status ", state?.status);
        console.log(`#### action `, action);
        state.error = action.error.message;
        console.log(`####### fetchContacts.rejected! `, {
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

export const { add, modify, deleteOne } = contactsSlice.actions;

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await fetch("http://localhost:8080/api/contacts/");
    const data = await response.json();
    console.log("#### fetchContacts ", data);
    return data;
  }
);

/*-------------------//     
//      SELECTORS    //     
//-------------------/*/

export const selectAllContacts = (state) => {
  return state.contacts.data;
};

export const selectContactsById = (state, contactsIdsObj) => {
  const selectedContacts = [];
  for (let id in contactsIdsObj) {
    if (state.contacts.contactIdsObj[id]) {
      selectedContacts.push(state.contacts.contactsIdsObj[id]);
    }
  }
  return selectedContacts;
};

export default contactsSlice.reducer;
