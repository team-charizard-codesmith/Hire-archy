import { configureStore } from "@reduxjs/toolkit";
// import companiesReducer from "./slices/companiesSlice";
// import contactsReducer from "./slices/contactsSlice";
// import interviewsReducer from "./slices/interviewsSlice";
// import jobsReducer from "./slices/jobsSlice";
// import offersReducer from "./slices/offersSlice";
// import usersReducer from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    chores: choresReducer,
    [choresApi.reducerPath]: choresApi.reducer, // Add the generated reducer as a specific top-level slice
    groups: groupsReducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([choresApi.middleware, groupsApi.middleware]),
});

setupListeners(store.dispatch);
