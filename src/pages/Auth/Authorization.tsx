import { FC, useState } from "react";
import cl from "./Auth.module.scss";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import Alert from "@mui/material/Alert";
import { IAlert } from "../../models/alert";
import { useForm } from "react-hook-form";
import { IAuthData } from "../../models/auth";
import AuthValidation from "../../validation/AuthValidation";
import setTokenInLocalStorage from "../../utils/setTokenInLocalStorage";
import { useNavigate, Link } from "react-router-dom";
import { createPortal } from "react-dom";
import AuthStore from "../../store/AuthStore";
import { useFetching } from "../../hooks/useFetching";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { usePasswordMask } from "../../hooks/usePasswordMask";

const Authorization: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAuthData>();

  const [errorAlert, setErrorAlert] = useState<IAlert>({
    error: false,
    message: "",
  });

  const [isPasswordMask, passwordType, togglePasswordMask] = usePasswordMask();

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

  const [performAuthorization, isLoading] = useFetching(
    async (authData: IAuthData): Promise<void> => {
      const authReponse = await AuthStore.authorization(authData);
      if (authReponse.hasError) {
        showAlert(authReponse.response);
        return;
      }
      reset();
      navigate("/");
    }
  );

  return (
    <div className={cl["auth"]}>
      <section className={cl["auth__body"]}>
        <h1 className={cl["auth__title"]}>Login</h1>
        <form
          className="auth__form"
          onSubmit={handleSubmit(performAuthorization)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("email", {
                required: true,
                validate: AuthValidation.fullName,
              })}
              isError={errors.email}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              isError={errors.password}
              type={passwordType}
              {...register("password", {
                required: true,
                validate: AuthValidation.authPassword,
              })}
              onBlur={() => clearErrors("password")}
              placeholder="Password"
              tabIndex={2}
            />
            <div className={cl["auth__toggle-password"]}>
              {isPasswordMask ? (
                <VisibilityOffIcon onClick={togglePasswordMask} />
              ) : (
                <VisibilityIcon onClick={togglePasswordMask} />
              )}
            </div>
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthButton type="submit" tabIndex={3} loading={isLoading}>
              Login
            </AuthButton>
          </fieldset>
          <p className={cl["auth__link"]}>
            Don't have an account? <Link to="/signin">Sign in</Link>
          </p>
          {errorAlert.error &&
            createPortal(
              <Alert severity="error" className={cl["alert"]}>
                {errorAlert.message}
              </Alert>,
              document.body
            )}
        </form>
      </section>
    </div>
  );
};

export default Authorization;
