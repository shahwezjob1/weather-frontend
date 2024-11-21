import { ToastContainerProps } from "react-toastify";

export const toastContainerProps: ToastContainerProps = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
};
export const DEFAULT_ERROR_MSG = "Something went wrong";
export const ENTER_THREEE_LETTERS_ERROR_MSG =
  "Please enter at least 3 characters.";
export const ENTER_STRING_ONLY_ERROR_MSG =
  "Please enter only letters and spaces.";
export const APP_NAME = "PS Weather";
