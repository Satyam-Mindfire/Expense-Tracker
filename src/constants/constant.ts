export const expenses = [
  {
    title: "Groceries",
    description: "Weekly grocery shopping",
    amount: 50.25,
    date: "2024-04-10",
    category: "Food",
  },
  {
    title: "Gasoline",
    description: "Refill car's fuel tank",
    amount: 40.8,
    date: "2024-04-09",
    category: "Transportation",
  },
  {
    title: "Office Supplies",
    description: "Purchase printer paper and ink",
    amount: 25.5,
    date: "2024-04-08",
    category: "Office",
  },
];

export const sortingObject = [
  { value: "date", label: "Date" },
  { value: "priceLowToHigh", label: "Price: Low to High" },
  { value: "priceHighToLow", label: "Price: High to Low" },
  { value: "category", label: "Category" },
];

export const categoriesObject = ["Food", "Travel", "Office", "Other"];

export const categoriesDropdownObject = [
  { value: "Food", label: "Food" },
  { value: "Travel", label: "Travel" },
  { value: "Office", label: "Office" },
  { value: "Other", label: "Other" },
];

export const amountRanges = [
  "Rs. 0 to Rs. 1000",
  "Rs. 1000 to Rs. 2000",
  "Rs. 2000 to Rs. 3000",
  "Rs. 3000 and above",
];
