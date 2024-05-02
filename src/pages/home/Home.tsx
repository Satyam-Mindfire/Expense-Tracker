import { useEffect, useState } from "react";
import { Navbar, Table, FormPopup, ProfilePopup } from "../../components";
import { Routes, Strings } from "../../constants";
import { sortingObject } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts";
import { useQueryClient } from "@tanstack/react-query";
import { AddFormValues, Expense } from "../../types";
import { v4 as uuidv4 } from "uuid";
import {
  filterExpenses,
  sortByDate,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  updateExpenses,
} from "../../utils";
import { AxiosResponse } from "axios";
import { Pagination } from "./components/Pagination";
import { useExpenseQuery } from "../../queries";
import FilterView from "./components/FilterView";
import SortingAddExpenseView from "./components/SortingAddExpenseView";

/**
 * Home Component
 *
 * Renders the main page of the expense tracker application.
 * Allows users to view, filter, sort, add, edit, and delete expenses.
 */
const Home = () => {
  // Navigation hooks
  const { page = "1" } = useParams();
  const [selectedSorting, setSelectedSorting] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAmountRanges, setSelectedAmountRanges] = useState<string[]>(
    []
  );
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | string>(
    0
  );
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const queryClient = useQueryClient();
  const { isPending, data: expanseList } = useExpenseQuery(page);

  // Update expenseData state variable when data is received
  useEffect(() => {
    if (expanseList) {
      setExpenses(expanseList.data.data);
    }
  }, [expanseList]);

  // Update expense data after filtering
  useEffect(() => {
    if (expanseList?.data.data) {
      const filteredExpenses = filterExpenses(
        expanseList?.data.data,
        selectedCategories,
        selectedAmountRanges,
        dateFrom,
        dateTo
      );
      setExpenses(filteredExpenses);
    }
  }, [
    dateFrom,
    dateTo,
    expanseList?.data.data,
    selectedAmountRanges,
    selectedCategories,
  ]);

  // Update expense data after sorting
  useEffect(() => {
    let sortedExpenses = [];
    switch (selectedSorting) {
      case sortingObject[3].value:
        sortedExpenses = expenses.slice().sort(sortByDate);
        setExpenses(sortedExpenses);
        break;
      case sortingObject[1].value:
        sortedExpenses = expenses.slice().sort(sortByPriceLowToHigh);
        setExpenses(sortedExpenses);
        break;
      case sortingObject[2].value:
        sortedExpenses = expenses.slice().sort(sortByPriceHighToLow);
        setExpenses(sortedExpenses);
        break;
      case sortingObject[0].value:
        setExpenses(expanseList?.data.data);
        break;
    }
  }, [selectedSorting]);

  /**
   * Handle checkbox change for category filter
   * @param category The category to toggle
   */
  const handleCategoryCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevValue) =>
        prevValue.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories((prevValue) => [...prevValue, category]);
    }
  };

  /**
   * Handle checkbox change for amount filter
   * @param amount The amount range to toggle
   */
  const handleAmountCheckboxChange = (amount: string) => {
    if (selectedAmountRanges.includes(amount)) {
      setSelectedAmountRanges((prevValue) =>
        prevValue.filter((item) => item !== amount)
      );
    } else {
      setSelectedAmountRanges((prevValue) => [...prevValue, amount]);
    }
  };

  /**
   * Open the expense form popup for editing an expense
   * @param row The expense data to edit
   */
  const handleEdit = (row: Expense) => {
    setSelectedExpenseId(row.id);
    setIsPopupOpen(true);
  };

  /**
   * Handle deletion of an expense
   * @param index The index of the expense to delete
   */
  const handleDelete = (index: number) => {
    const confirmation = confirm(Strings.expenseDeleteStr);
    if (confirmation) {
      const updatedData: Expense[] = [...expenses];
      updatedData.splice(index, 1);
      updateExpenses(updatedData, page, queryClient);
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    navigate(Routes.login, { replace: true });
  };

  /**
   * Open the expense form popup for adding a new expense
   */
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  /**
   * Close the expense form popup
   */
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  /**
   * Open the profile popup
   */
  const openProfilePopup = () => {
    setIsProfilePopupOpen(true);
  };

  /**
   * Close the profile popup
   */
  const closeProfilePopup = () => {
    setIsProfilePopupOpen(false);
  };

  /**
   * Reset all filter settings
   */
  const resetFilters = () => {
    setSelectedAmountRanges([]);
    setSelectedCategories([]);
    setDateFrom("");
    setDateTo("");
  };

  /**
   * Handle click event for adding a new expense
   */
  const onClickAddExpanse = () => {
    openPopup();
    setSelectedExpenseId(0);
  };

  /**
   * Handle form submission for adding/editing an expense
   * @param values The form values
   * @param category The expense category
   */
  const handleAddExpanseSubmit = (values: AddFormValues, category: string) => {
    if (selectedExpenseId) {
      const updatedExpenses = expenses.map((item) => {
        if (item.id === selectedExpenseId) {
          return {
            ...item,
            ...values,
            category: category,
          };
        }
        return item;
      });
      updateExpenses(updatedExpenses, page, queryClient);
    } else {
      queryClient.setQueryData(
        [Strings.queryKeys.expanses, page],
        (prevData: AxiosResponse) => {
          if (!prevData || !Array.isArray(prevData.data.data)) return null;

          return {
            ...prevData,
            data: {
              ...prevData.data,
              data: [
                {
                  ...values,
                  category: category,
                  id: uuidv4(),
                },
                ...expenses,
              ],
            },
          };
        }
      );
    }
    closePopup();
  };

  /**
   * Handle pagination click event
   * @param page The page number to navigate to
   */
  const handlePagination = (page: number) => {
    resetFilters();
    navigate(`/${page}`);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar onClick={openProfilePopup} />

      {/* Sorting and Add Expense View */}
      <SortingAddExpenseView
        onClickAddExpanse={onClickAddExpanse}
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
      />

      <div className="flex border">
        {/* Filter View */}
        <FilterView
          resetFilters={resetFilters}
          selectedCategories={selectedCategories}
          selectedAmountRanges={selectedAmountRanges}
          dateFrom={dateFrom}
          dateTo={dateTo}
          handleCategoryCheckboxChange={handleCategoryCheckboxChange}
          handleAmountCheckboxChange={handleAmountCheckboxChange}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
        {/* Expense table */}
        <div className="overflow-x-auto w-full">
          {/* Loader */}
          {isPending ? (
            <div className="flex justify-center items-center h-full">
              {Strings.loading}
            </div>
          ) : (
            <Table
              data={expenses ? expenses : []}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
      <Pagination
        currentPage={parseInt(page)}
        totalPages={expanseList?.data.total_page ?? 1}
        onPageChange={handlePagination}
      />
      <FormPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        handleAddExpanseSubmit={handleAddExpanseSubmit}
        id={selectedExpenseId}
        page={page}
      />
      <ProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={closeProfilePopup}
        onLogOut={handleLogout}
      />
    </div>
  );
};

export default Home;
