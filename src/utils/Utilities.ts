import { Expense } from "../types";

export const sortByDate = (a: Expense, b: Expense): number => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
};

// Sort by price high to low
export const sortByPriceHighToLow = (a: Expense, b: Expense): number => {
  return b.amount - a.amount;
};

// Sort by price low to high
export const sortByPriceLowToHigh = (a: Expense, b: Expense): number => {
  return a.amount - b.amount;
};

// Find elements by id
export const findElementById = (array: Expense[], id: number) => {
  return array.find((item) => item.id === id) || {};
};
