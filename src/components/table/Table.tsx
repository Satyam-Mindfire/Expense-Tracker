import React from "react";
import { Icons, Strings } from "../../constants";
import { Expense } from "../../types";

interface TableProps {
  // Array of expense data to be displayed in the table
  data: Expense[];

  // Callback function to handle the edit action for a row
  onEdit: (row: Expense, index: number) => void;

  // Callback function to handle the delete action for a row
  onDelete: (index: number) => void;
}

/**
 * Table Component
 * 
 * Renders a table to display expense data with options to edit or delete each entry.
 * 
 * @param data Array of expense data to be displayed in the table
 * @param onEdit Callback function to handle the edit action for a row
 * @param onDelete Callback function to handle the delete action for a row
 */
const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full border border-gray-200 border-collapse">
      <thead>
        <tr className="bg-gray-50">
          {/* Table header */}
          <th className="border border-gray-200 py-2 px-4">Title</th>
          <th className="border border-gray-200 py-2 px-4">Description</th>
          <th className="border border-gray-200 py-2 px-4">Amount</th>
          <th className="border border-gray-200 py-2 px-4">Date</th>
          <th className="border border-gray-200 py-2 px-4">Category</th>
          <th className="border border-gray-200 py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Render table rows */}
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index} className="bg-white hover:bg-gray-100">
              {/* Displaying expense data */}
              <td className="border border-gray-200 py-2 px-4">{row.title}</td>
              <td className="border border-gray-200 py-2 px-4">
                {row.description}
              </td>
              <td className="border border-gray-200 py-2 px-4">{row.amount}</td>
              <td className="border border-gray-200 py-2 px-4">{row.date}</td>
              <td className="border border-gray-200 py-2 px-4">{row.category}</td>
              <td className="border border-gray-200 py-2 px-4">
                {/* Action buttons: Edit and Delete */}
                <button
                  onClick={() => onEdit(row, index)}
                  className="icon-button mr-3"
                >
                  <img src={Icons.edit} alt="Edit" className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(index)} className="icon-button">
                  <img src={Icons.delete} alt="Delete" className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="border border-gray-200 py-2 px-4">
              {Strings.noDataFound}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
