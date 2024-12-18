import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzasParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzasParams>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { sortBy, search, order, category, currentPage } = params;
    const { data } = await axios.get(
      `https://673b4458339a4ce4451b6ca1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
