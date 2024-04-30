export interface Expense {
  id: number | string;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface ExpenseApiResponse {
  status: string;
  message: string;
  data: Expense[];
  current_page: number;
  next_page_url: string;
  prev_page_url: string;
  total_page: number;
  per_page: number;
}

export interface AddFormValues {
  title: string;
  description: string;
  date: string;
  amount: number;
}
