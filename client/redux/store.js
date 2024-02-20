import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./slices/companiesSlice";
import contactsReducer from "./slices/contactsSlice";
import interviewsReducer from "./slices/interviewsSlice";
import jobsReducer from "./slices/jobsSlice";
import offersReducer from "./slices/offersSlice";
// import usersReducer from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    contacts: contactsReducer,
    interviews: interviewsReducer,
    offers: offersReducer,
  },
});

setupListeners(store.dispatch);
