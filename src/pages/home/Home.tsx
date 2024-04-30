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
import { api, endPoints } from "../../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AddFormValues, Expense } from "../../types";
import { v4 as uuidv4 } from "uuid";
import {
  sortByDate,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
} from "../../utils";
import { AxiosResponse } from "axios";
import { Pagination } from "./components/Pagination";

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

  const filterExpensesByCategory = (
    expenses: Expense[],
    categories: string[]
  ): Expense[] => {
    return expenses.filter((expense) => categories.includes(expense.category));
  };

  const filterExpensesByAmountRanges = (
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

  const parseAmountRange = (
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
  const filterExpensesByDateRange = (
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

  const filterExpenses = (
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

  const fetchExpenses = async () => {
    console.log(`${endPoints.expanses.expanses}/${parseInt(page)}`);
    const expanses = await api.get(
      `${endPoints.expanses.expanses}/${parseInt(page)}`
    );
    return expanses;
  };
  const { isPending, data: expanseList } = useQuery({
    queryKey: [Strings.queryKeys.expanses, page],
    queryFn: fetchExpenses,
  });

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

  const handleCategoryCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleAmountCheckboxChange = (amount: string) => {
    if (selectedAmountRanges.includes(amount)) {
      setSelectedAmountRanges(
        selectedAmountRanges.filter((item) => item !== amount)
      );
    } else {
      setSelectedAmountRanges([...selectedAmountRanges, amount]);
    }
  };
  const handleEdit = (row: Expense) => {
    setSelectedExpenseId(row.id);
    setIsPopupOpen(true);
  };
  const handleDelete = (index: number) => {
    const confirmation = confirm(Strings.expenseDeleteStr);
    if (confirmation) {
      const updatedData: Expense[] = [...expenses];
      updatedData.splice(index, 1);
      queryClient.setQueryData(
        [Strings.queryKeys.expanses, page],
        (prevData: AxiosResponse) => {
          if (!prevData || !Array.isArray(prevData.data.data)) return null;

          return {
            ...prevData,
            data: {
              ...prevData.data,
              data: updatedData,
            },
          };
        }
      );
    }
  };
  const handleLogout = () => {
    logout();
    navigate(Routes.login, { replace: true });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openProfilePopup = () => {
    setIsProfilePopupOpen(true);
  };

  const closeProfilePopup = () => {
    setIsProfilePopupOpen(false);
  };

  const resetFilters = () => {
    setSelectedAmountRanges([]);
    setSelectedCategories([]);
    setDateFrom("");
    setDateTo("");
  };

  const onClickAddExpanse = () => {
    openPopup();
    setSelectedExpenseId(0);
  };

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

  /** Handle pagination */
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
        <Button className=" rounded-2xl ml-5 w-32" onClick={onClickAddExpanse}>
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
