import { useQuery } from "@tanstack/react-query";
import { api, endPoints } from "../api";
import { Strings } from "../constants";

/**
 * Custom hook to fetch expense data from the API.
 * 
 * @param page The page number for pagination
 * @returns An object containing the data, isLoading, error, and other query-related information
 */
const useExpenseQuery = (page: string) => {
  /**
   * Function to fetch expenses from the API
   * @returns Promise containing the fetched expenses
   */
  const fetchExpenses = async () => {
    const expenses = await api.get(
      `${endPoints.expanses.expanses}/${parseInt(page)}`
    );
    return expenses;
  };

  // Using useQuery hook to fetch data and handle caching, loading, and error states
  return useQuery({
    queryKey: [Strings.queryKeys.expanses, page],
    queryFn: fetchExpenses,
  });
};

export { useExpenseQuery };
