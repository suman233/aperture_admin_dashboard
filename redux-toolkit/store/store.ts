import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/rootReducer";

// ...

// const middleware = [logger];

export const store = configureStore({
  reducer: rootReducer,
  // middleware,
  devTools: process.env.NODE_ENV === "development"
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
