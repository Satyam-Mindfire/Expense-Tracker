import React from "react";
import { Icons } from "../../constants";

interface TableRow {
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TableProps {
  data: TableRow[];
  onEdit: (row: TableRow, index: number) => void;
  onDelete: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full border border-gray-200 border-collapse">
      <thead>
        <tr className="bg-gray-50">
          <th className="border border-gray-200 py-2 px-4">Title</th>
          <th className="border border-gray-200 py-2 px-4">Description</th>
          <th className="border border-gray-200 py-2 px-4">Amount</th>
          <th className="border border-gray-200 py-2 px-4">Date</th>
          <th className="border border-gray-200 py-2 px-4">Category</th>
          <th className="border border-gray-200 py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="bg-white hover:bg-gray-100">
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
        ))}
      </tbody>
    </table>
  );
};

export default Table;
