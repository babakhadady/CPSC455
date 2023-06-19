import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCardAsync,
  getCardsAsync,
  getCardAsync,
  addCardAsync,
} from "./thunks";

const INITIAL_STATE = {
  items: [],
  currentItem: {},
};

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsAsync.fulfilled, (state, action) => {
        return {
          items: action.payload,
          currentItem: state.currentItem,
        };
      })
      .addCase(getCardAsync.fulfilled, (state, action) => {
        return {
          items: state.items,
          currentItem: action.payload,
        };
      })
      .addCase(deleteCardAsync.fulfilled, (state, action) => {
        return {
          items: action.payload,
          currentItem: state.currentItem,
        };
      })
      .addCase(addCardAsync.fulfilled, (state, action) => {
        return {
          items: action.payload,
          currentItem: state.currentItem,
        };
      });
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
