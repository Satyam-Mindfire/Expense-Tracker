/**
 * Represents an expense entity.
 */
export interface Expense {
  /** The unique identifier of the expense. */
  id: number | string;
  /** The title of the expense. */
  title: string;
  /** The description of the expense. */
  description: string;
  /** The amount of the expense. */
  amount: number;
  /** The date of the expense. */
  date: string;
  /** The category of the expense. */
  category: string;
}

/**
 * Represents the structure of the response from the API when fetching expenses.
 */
export interface ExpenseApiResponse {
  /** The status of the API response. */
  status: string;
  /** A message associated with the API response. */
  message: string;
  /** An array of expense objects returned by the API. */
  data: Expense[];
  /** The current page number. */
  current_page: number;
  /** The URL for the next page of results. */
  next_page_url: string;
  /** The URL for the previous page of results. */
  prev_page_url: string;
  /** The total number of pages available. */
  total_page: number;
  /** The number of expenses per page. */
  per_page: number;
}

/**
 * Represents the values submitted in the add expense form.
 */
export interface AddFormValues {
  /** The title of the expense. */
  title: string;
  /** The description of the expense. */
  description: string;
  /** The date of the expense. */
  date: string;
  /** The amount of the expense. */
  amount: number;
}
