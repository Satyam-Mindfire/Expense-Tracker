import { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  Table,
  Dropdown,
  Checkbox,
  CustomInput,
  FormPopup,
  ProfilePopup,
} from "../../components";
import { Routes, Strings } from "../../constants";
import {
  sortingObject,
  categoriesObject,
  amountRanges,
} from "../../constants/constant";
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

  useEffect(() => {
    let sortedExpenses = [];
    switch (selectedSorting) {
      case "date":
        sortedExpenses = expenses.slice().sort(sortByDate);
        setExpenses(sortedExpenses);
        break;
      case "priceLowToHigh":
        sortedExpenses = expenses.slice().sort(sortByPriceLowToHigh);
        setExpenses(sortedExpenses);
        break;
      case "priceHighToLow":
        sortedExpenses = expenses.slice().sort(sortByPriceHighToLow);
        setExpenses(sortedExpenses);
        break;
      case "none":
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
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  /**
   * Handle checkbox change for amount filter
   * @param amount The amount range to toggle
   */
  const handleAmountCheckboxChange = (amount: string) => {
    if (selectedAmountRanges.includes(amount)) {
      setSelectedAmountRanges(
        selectedAmountRanges.filter((item) => item !== amount)
      );
    } else {
      setSelectedAmountRanges([...selectedAmountRanges, amount]);
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

      {/* Sorting and Add Expense section */}
      <div className="mb-2 flex justify-between items-center">
        <Button className="rounded-2xl ml-5 w-32" onClick={onClickAddExpanse}>
          {Strings.addExpense}
        </Button>
        <div className="flex mr-5 border p-2">
          <Dropdown
            options={sortingObject}
            selectedValue={selectedSorting}
            onChange={(e) => setSelectedSorting(e.target.value)}
            label="Sort by :"
            selectClassName="font-semibold text-sm"
          />
        </div>
      </div>

      <div className="flex border">
        {/* Filter checkboxes */}
        <div className="pt-2 w-60 border">
          <div className="flex justify-between items-center">
            <label className="font-semibold ml-5">{Strings.filters}</label>
            <Button className="mr-2 py-1" onClick={resetFilters}>
              {Strings.reset}
            </Button>
          </div>
          {/* Categories */}
          <div className="mt-2 border-t">
            <label className="font-semibold mb-2 ml-5 text-sm">
              {Strings.categories}
            </label>
            {categoriesObject.map((category) => (
              <Checkbox
                key={category}
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryCheckboxChange(category)}
              />
            ))}
          </div>

          {/* Amount */}
          <div className="mt-2 border-t">
            <label className="font-semibold mb-2 ml-5 text-sm">
              {Strings.amount}
            </label>
            {amountRanges.map((amount) => (
              <Checkbox
                key={amount}
                label={amount}
                checked={selectedAmountRanges.includes(amount)}
                onChange={() => handleAmountCheckboxChange(amount)}
              />
            ))}
          </div>

          {/* Date */}
          <div className="mt-2 border-t">
            <label className="font-semibold mb-2 ml-5 text-sm">
              {Strings.date}
            </label>
            <CustomInput
              label={Strings.from}
              id="from"
              type="Date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              inputClassName="px-1 ml-1"
              labelClassName="w-8"
              minDate="2000-01-01"
            />

            <CustomInput
              label={Strings.to}
              id="to"
              type="Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              inputClassName="px-1 ml-1"
              labelClassName="w-8"
              minDate={dateFrom}
            />
          </div>
        </div>
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
