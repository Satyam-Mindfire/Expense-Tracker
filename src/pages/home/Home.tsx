import { useState } from "react";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { Strings } from "../../constants";
import { sortingObject, expenses } from "../../constants/constant";
import Dropdown from "../../components/dropdown/Dropdown";

const Home = () => {
  const [selectedSorting, setSelectedSorting] = useState<string>("");

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Sorting and Add Expense section */}
      <div className="mb-2 flex justify-between items-center">
        <Button className=" rounded-2xl ml-5 w-32">{Strings.addExpense}</Button>
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

      <div className="overflow-x-auto">
        <Table data={expenses} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Home;
