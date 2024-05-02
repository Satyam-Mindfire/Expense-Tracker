import React from 'react';
import { Button, Dropdown } from '../../../components';
import { Strings, sortingObject } from '../../../constants';

interface SortingAddExpenseViewProps {
  /** Function to handle the click event for adding an expense */
  onClickAddExpanse: () => void;
  /** The currently selected sorting option */
  selectedSorting: string;
  /** Function to set the selected sorting option */
  setSelectedSorting: (value: string) => void;
}

/**
 * SortingAddExpenseView component for displaying sorting options and adding expenses button.
 * @param {SortingAddExpenseViewProps} props - The props for the SortingAddExpenseView component.
 * @returns {JSX.Element} - The JSX element representing the SortingAddExpenseView component.
 */
const SortingAddExpenseView: React.FC<SortingAddExpenseViewProps> = ({
  onClickAddExpanse,
  selectedSorting,
  setSelectedSorting,
}) => {
  return (
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
  );
};

export default SortingAddExpenseView;
