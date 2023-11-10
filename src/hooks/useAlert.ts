import { useState } from "react";
import { IAlert } from "../models/alert";

export const useAlert = (): [IAlert, (message: string) => void] => {
  const [errorAlert, setErrorAlert] = useState<IAlert>({
    error: false,
    message: "",
  });

  function showAlert(message: string): void {
    setErrorAlert({
      error: true,
      message,
    });

    setTimeout(() => {
      setErrorAlert({
        error: false,
        message: "",
      });
    }, 3000);
  }

  return [errorAlert, showAlert];
};
