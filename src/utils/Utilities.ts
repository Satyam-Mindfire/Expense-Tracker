import { QueryClient } from "@tanstack/react-query";
import { Expense } from "../types";
import { Strings } from "../constants";
import { AxiosResponse } from "axios";

/**
 * Sorts an array of expenses by date in ascending order.
 * @param a - The first expense object.
 * @param b - The second expense object.
 * @returns A number indicating the comparison result.
 */
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

/**
 * Sorts an array of expenses by price from high to low.
 * @param a - The first expense object.
 * @param b - The second expense object.
 * @returns A number indicating the comparison result.
 */
export const sortByPriceHighToLow = (a: Expense, b: Expense): number => {
  return b.amount - a.amount;
};

/**
 * Sorts an array of expenses by price from low to high.
 * @param a - The first expense object.
 * @param b - The second expense object.
 * @returns A number indicating the comparison result.
 */
export const sortByPriceLowToHigh = (a: Expense, b: Expense): number => {
  return a.amount - b.amount;
};

/**
 * Finds an element in an array of expenses by its id.
 * @param array - The array of expenses to search.
 * @param id - The id of the expense to find.
 * @returns The expense object if found, otherwise an empty object.
 */
export const findElementById = (array: Expense[], id: number | string) => {
  return array.find((item) => item.id === id) || {};
};

/**
 * Filters an array of expenses by specified categories.
 * @param expenses - The array of expenses to filter.
 * @param categories - The array of categories to filter by.
 * @returns The filtered array of expenses.
 */
export const filterExpensesByCategory = (
  expenses: Expense[],
  categories: string[]
): Expense[] => {
  return expenses.filter((expense) => categories.includes(expense.category));
};

/**
 * Filters an array of expenses by specified amount ranges.
 * @param expenses - The array of expenses to filter.
 * @param amountRanges - The array of amount ranges to filter by.
 * @returns The filtered array of expenses.
 */
export const filterExpensesByAmountRanges = (
  expenses: Expense[],
  amountRanges: string[]
): Expense[] => {
  return expenses.filter((expense) => {
    return amountRanges.some((range) => {
      const [minAmount, maxAmount] = parseAmountRange(range);
      if (maxAmount === null) {
        // Handle "3000 and above" case
        return minAmount === null || expense.amount >= minAmount;
      } else {
        return (
          (minAmount === null || expense.amount >= minAmount) &&
          expense.amount < maxAmount
        );
      }
    });
  });
};

/**
 * Parses a string representing an amount range into two numeric values.
 * @param amountRange - The string representing the amount range.
 * @returns An array containing the minimum and maximum amount values.
 */
export const parseAmountRange = (
  amountRange: string
): [number | null, number | null] => {
  const ranges = amountRange.split(" to ");
  let minAmount: number | null = null;
  let maxAmount: number | null = null;

  if (ranges[0] !== "Rs. 0") {
    minAmount = parseFloat(ranges[0].substring(4));
  }

  if (ranges[1] !== "More") {
    maxAmount = parseFloat(ranges[1].substring(4));
  }

  return [minAmount, maxAmount];
};

/**
 * Filters an array of expenses by a specified date range.
 * @param expenses - The array of expenses to filter.
 * @param startDate - The start date of the date range.
 * @param endDate - The end date of the date range.
 * @returns The filtered array of expenses.
 */
export const filterExpensesByDateRange = (
  expenses: Expense[],
  startDate: string,
  endDate: string
): Expense[] => {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return parsedStartDate <= expenseDate && expenseDate <= parsedEndDate;
  });
};

/**
 * Filters an array of expenses based on specified criteria.
 * @param expenses - The array of expenses to filter.
 * @param categories - The categories to filter by.
 * @param amountRanges - The amount ranges to filter by.
 * @param startDate - The start date of the date range.
 * @param endDate - The end date of the date range.
 * @returns The filtered array of expenses.
 */
export const filterExpenses = (
  expenses: Expense[],
  categories: string[],
  amountRanges: string[],
  startDate: string,
  endDate: string
): Expense[] => {
  let filteredExpenses = [...expenses];

  if (categories.length > 0) {
    filteredExpenses = filterExpensesByCategory(filteredExpenses, categories);
  }

  if (amountRanges.length > 0) {
    filteredExpenses = filterExpensesByAmountRanges(
      filteredExpenses,
      amountRanges
    );
  }

  if (startDate !== "" && endDate !== "") {
    filteredExpenses = filterExpensesByDateRange(
      filteredExpenses,
      startDate,
      endDate
    );
  }

  return filteredExpenses;
};

/**
 * Updates the data of expenses in the query cache.
 * @param updatedExpenses - The updated array of expenses.
 * @param page - The page identifier for the expenses.
 * @param queryClient - The query client used to access and update the cache.
 */
export const updateExpenses = (
  updatedExpenses: Expense[],
  page: string,
  queryClient: QueryClient
) => {
  queryClient.setQueryData(
    [Strings.queryKeys.expanses, page],
    (prevData: AxiosResponse) => {
      if (!prevData || !Array.isArray(prevData.data.data)) return null;

      return {
        ...prevData,
        data: {
          ...prevData.data,
          data: updatedExpenses,
        },
      };
    }
  );
};

