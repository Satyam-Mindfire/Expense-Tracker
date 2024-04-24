import React, { useState } from "react";
import Button from "../button/Button";
import { Icons, Strings } from "../../constants";
import { Form, Formik } from "formik";
import Input from "../Input/Input";
import * as Yup from "yup";
import Dropdown from "../dropdown/Dropdown";
import { categoriesDropdownObject } from "../../constants/constant";

interface FormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddExpanseSubmit: () => void;
}

const FormPopup: React.FC<FormPopupProps> = ({
  isOpen,
  onClose,
  handleAddExpanseSubmit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
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
      .min("2000-01-01", Strings.invalidDate)
      .max(maxDate, Strings.invalidDate)
      .required(Strings.dateRequired),
  });

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
          <Button className="bg-white rounded-full" onClick={onClose}>
            <img src={Icons.close} className="w-5 h-5" />
          </Button>
        </div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            amount: 0.0,
            date: "",
            category: "",
          }}
          onSubmit={handleAddExpanseSubmit}
          validationSchema={validationSchema}
        >
          <Form className="">
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
