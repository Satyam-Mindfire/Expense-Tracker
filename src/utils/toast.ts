import { Bounce, toast } from "react-toastify";

/** Function to show a success toast message */
export const showSuccessToast = ({ message }: { message: string }): void => {
  // Display a success toast with the provided message
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

/** Function to show a error toast message */
export const showErrorToast = ({ message }: { message: string }): void => {
  // Display a error toast with the provided message
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
