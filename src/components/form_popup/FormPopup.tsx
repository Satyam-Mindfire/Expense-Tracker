import React from "react";
import Button from "../button/Button";
import { Icons, Strings } from "../../constants";
import { Form, Formik } from "formik";
import Input from "../Input/Input";

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
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="z-10 bg-white p-2 rounded-lg shadow-lg w-full max-w-md px-5 pb-5">
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
            <Input
              label={Strings.categoryStr}
              type="text"
              name="category"
              id="category"
            />
            <Button className="mt-5 w-full">{Strings.submit}</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormPopup;
