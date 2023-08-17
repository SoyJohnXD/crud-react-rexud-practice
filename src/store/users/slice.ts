import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const DEFAULT_STATE: UserWithId[] = [
  {
    id: "1",
    name: "Peter Doe",
    email: "Peter@gmail.com",
    github: "peter",
  },
  {
    id: "2",
    name: "Andres Camilo Contreras",
    email: "adcamtreras@gmail.com",
    github: "acc_xd",
  },
  {
    id: "3",
    name: "Diana Catalina",
    email: "dianacat@gmail.com",
    github: "diacat",
  },
  {
    id: "4",
    name: "John Londoño",
    email: "johnjulin2@gmail.com",
    github: "soyjohnxd",
  },
];

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) return JSON.parse(persistedState).users;
  return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      return [...state, { id, ...action.payload }];
    },
    editUserWithId: (state, action: PayloadAction<UserWithId>) => {
      const { name, email, github } = action.payload;
      const newState = state.map((user) => ({
        ...user,
        ...(user.id === action.payload?.id && { name, email, github }),
      }));
      return newState;
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export default usersSlice.reducer;
export const { deleteUserById, addNewUser, editUserWithId } =
  usersSlice.actions;
