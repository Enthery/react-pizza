export type SearchPizzasParams = {
  sortBy: string;
  search: string;
  order: string;
  category: string;
  currentPage: string;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
