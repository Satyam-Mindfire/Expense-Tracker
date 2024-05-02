import React from 'react';
import { Strings } from '../../../constants';
import { Button, Checkbox, CustomInput } from '../../../components';
import { categoriesObject, amountRanges, minDate } from '../../../constants';

interface FilterViewProps {
  /** Function to reset all filters */
  resetFilters: () => void;
  /** Array of selected categories */
  selectedCategories: string[];
  /** Array of selected amount ranges */
  selectedAmountRanges: string[];
  /** Start date selected for filtering */
  dateFrom: string;
  /** End date selected for filtering */
  dateTo: string;
  /** Function to handle changes in category checkboxes */
  handleCategoryCheckboxChange: (category: string) => void;
  /** Function to handle changes in amount checkboxes */
  handleAmountCheckboxChange: (amount: string) => void;
  /** Function to set the start date for filtering */
  setDateFrom: (date: string) => void;
  /** Function to set the end date for filtering */
  setDateTo: (date: string) => void;
}

/**
 * FilterView component for filtering expenses.
 * @param {FilterViewProps} props - The props for the FilterView component.
 * @returns {JSX.Element} - The JSX element representing the FilterView component.
 */
const FilterView: React.FC<FilterViewProps> = ({
  resetFilters,
  selectedAmountRanges,
  selectedCategories,
  dateFrom,
  dateTo,
  handleAmountCheckboxChange,
  handleCategoryCheckboxChange,
  setDateFrom,
  setDateTo,
}) => {
  return (
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
          minDate={minDate}
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
  );
};

export default FilterView;
