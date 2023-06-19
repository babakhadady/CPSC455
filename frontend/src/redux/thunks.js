import { createAsyncThunk } from "@reduxjs/toolkit";
import CardService from "./service";

export const getCardsAsync = createAsyncThunk("cards/getCards", async () => {
  return await CardService.getCards();
});

export const getCardAsync = createAsyncThunk("cards/getCard", async (name) => {
  return await CardService.getCard(name);
});
export const addCardAsync = createAsyncThunk("cards/addCard", async (card) => {
  return await CardService.addCard(card);
});

export const deleteCardAsync = createAsyncThunk(
  "cards/deleteCard",
  async (name) => {
    return await CardService.deleteCard(name);
  }
);
