import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './slices/counter'
import { citizensListReducer, fetchCitizensList } from './slices/citizensSlice';
import {increment, decrement, incrementByAmount} from './slices/counter';

const store = configureStore({
  reducer: {
   counter: counterReducer,
   citizensList: citizensListReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export {store, increment, decrement, incrementByAmount, fetchCitizensList};