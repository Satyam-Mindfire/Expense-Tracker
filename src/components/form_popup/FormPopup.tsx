import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { Icons, Strings } from "../../constants";
import { Form, Formik } from "formik";
import Input from "../input/Input";
import * as Yup from "yup";
import Dropdown from "../dropdown/Dropdown";
import {
  categoriesDropdownObject,
  categoriesObject,
  minDate,
} from "../../constants";
import { useQueryClient } from "@tanstack/react-query";
import { findElementById } from "../../utils";
import { AxiosResponse } from "axios";
import { AddFormValues, Expense } from "../../types";

interface FormPopupProps {
  // Determines whether the form popup is open or closed
  isOpen: boolean;

  // Callback function to close the form popup
  onClose: () => void;

  // Callback function to handle form submission
  handleAddExpanseSubmit: (values: AddFormValues, category: string) => void;

  // ID of the expense being edited (0 if adding a new expense)
  id: number | string;

  // Current page number for pagination
  page: string;
}

/**
 * FormPopup Component
 *
 * Renders a popup form for adding or editing expenses.
 *
 * @param isOpen Determines whether the form popup is open or closed
 * @param onClose Callback function to close the form popup
 * @param handleAddExpanseSubmit Callback function to handle form submission
 * @param id ID of the expense being edited (0 if adding a new expense)
 * @param page Current page number for pagination
 */
const FormPopup: React.FC<FormPopupProps> = ({
  isOpen,
  onClose,
  handleAddExpanseSubmit,
  id,
  page,
}) => {
  // State variables to manage form inputs
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoriesObject[0]
  );

  // Query client for fetching data
  const queryClient = useQueryClient();

  // Fetch expenses data
  const expenses: AxiosResponse<any, any> | undefined =
    queryClient.getQueryData([Strings.queryKeys.expanses, page]);

  // Maximum date for date input
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  // Form validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, Strings.titleAtLeast3Characters)
      .required(Strings.titleRequired),
    description: Yup.string()
      .min(3, Strings.descriptionAtLeast3Characters)
      .required(Strings.descriptionRequired),
    amount: Yup.number()
      .moreThan(0, Strings.amountPositive)
      .required(Strings.amountRequired),
    date: Yup.date()
      .min(minDate, Strings.invalidDate)
      .max(maxDate, Strings.invalidDate)
      .required(Strings.dateRequired),
  });

  // Fill form fields when editing an expense
  const fillEditFields = (selectedExpense: Expense) => {
    setTitle(selectedExpense.title);
    setDescription(selectedExpense.description);
    setAmount(selectedExpense.amount);
    setSelectedCategory(selectedExpense.category);
    setDate(selectedExpense.date);
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setAmount(0);
    setSelectedCategory(categoriesObject[0]);
  };

  // Effect to fill form fields when editing an expense
  useEffect(() => {
    if (expenses?.data.data.length > 0 && id != 0) {
      const selectedExpense = findElementById(expenses?.data.data, id);
      fillEditFields(selectedExpense as Expense);
    } else {
      resetForm();
    }
  }, [expenses, id]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="z-10 bg-white p-2 rounded-lg shadow-lg w-full max-w-md px-5 pb-5 h-[75vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <label>{Strings.addNewExpanse}</label>
          <Button
            className="bg-white rounded-full"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            <img src={Icons.close} className="w-5 h-5" />
          </Button>
        </div>
        <Formik
          initialValues={{
            title: title,
            description: description,
            amount: amount,
            date: date,
          }}
          onSubmit={(values) => {
            handleAddExpanseSubmit(values, selectedCategory);
            resetForm();
          }}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <Input label={Strings.title} type="text" name="title" id="title" />
            <Input
              label={Strings.description}
              type="text"
              name="description"
              id="description"
            />
            <Input
              label={Strings.amountStr}
              type="number"
              name="amount"
              id="amount"
            />
            <Input
              label={Strings.dateStr}
              type="date"
              name="date"
              id="date"
              minDate="2000-01-01"
            />
            <Dropdown
              options={categoriesDropdownObject}
              selectedValue={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label={Strings.categoryStr}
              selectClassName="w-full p-2 border rounded bg-light-inputColor border-2 border-light-inputBorderColor placeholder-light-placeHolderColor rounded-lg mt-2"
            />
            <Button className="mt-5 w-full">{Strings.submit}</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormPopup;
