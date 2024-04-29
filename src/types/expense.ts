export interface Expense {
  id: number;
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
}
