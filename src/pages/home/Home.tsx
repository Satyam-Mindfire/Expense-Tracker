import { useState } from "react";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { Strings } from "../../constants";
import {
  sortingObject,
  expenses,
  categoriesObject,
  amountRanges,
} from "../../constants/constant";
import Dropdown from "../../components/dropdown/Dropdown";
import Checkbox from "../../components/checkbox/Checkbox";
import CustomInput from "../../components/CustomInput/CustomInput";
import FormPopup from "../../components/form_popup/FormPopup";

const Home = () => {
  const [selectedSorting, setSelectedSorting] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAmountRanges, setSelectedAmountRanges] = useState<string[]>(
    []
  );
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
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
  const handleEdit = () => {};
  const handleDelete = () => {};

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Sorting and Add Expense section */}
      <div className="mb-2 flex justify-between items-center">
        <Button className=" rounded-2xl ml-5 w-32" onClick={openPopup}>{Strings.addExpense}</Button>
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
          <label className="font-semibold ml-5">{Strings.filters}</label>
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
          <Table data={expenses} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
      <FormPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default Home;
