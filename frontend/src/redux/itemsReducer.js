import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = [];

const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {
    addItem: (state, action) => {
      if (itemExists(state, action.payload)) return;
      return [...state, action.payload];
    },
    clearItems: (state, action) => {
      return [];
    },
    removeItem: (state, action) => {
      const index = getIndex(state, action.payload);
      const new_state = [...state];
      new_state.splice(index, 1);
      return new_state;
    },
    increaseCount: (state, action) => {
      const item = { ...state[getIndex(state, action.payload)] };
      item.count++;
      const index = getIndex(state, item);
      const new_state = [...state];
      new_state.splice(index, 1);
      new_state.splice(index, 0, item);
      return new_state;
    },
    decreaseCount: (state, action) => {
      const item = { ...state[getIndex(state, action.payload)] };
      if (item.count === 1) return;
      item.count--;
      const index = getIndex(state, item);
      const new_state = [...state];
      new_state.splice(index, 1);
      new_state.splice(index, 0, item);
      return new_state;
    },
  },
});

function itemExists(state, item) {
  for (let i of state) {
    if (areIdentical(i, item.name, item.price, item.description, item.url)) {
      return true;
    }
  }
  return false;
}

export function getIndex(state, item) {
  for (let i = 0; i < state.length; i++) {
    if (
      areIdentical(state[i], item.name, item.price, item.description, item.url)
    )
      return i;
  }
  return -1;
}

function areIdentical(item, name, price, description, url) {
  return (
    item.name === name &&
    item.price === price &&
    item.description === description &&
    item.url === url
  );
}

function updateCount(state, item) {
  for (let i of state) {
    if (areIdentical(i, item.name, item.price, item.description, item.url)) {
      return i;
    }
  }
  return null;
}

export const { addItem, clearItems, removeItem, increaseCount, decreaseCount } =
  itemsSlice.actions;

export default itemsSlice.reducer;
