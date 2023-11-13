import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePasswordMask } from "../../hooks/usePasswordMask";
import { useFetching } from "../../hooks/useFetching";
import { IAuthData } from "../../models/auth";
import { useAlert } from "../../hooks/useAlert";
import cl from "./Auth.module.scss";
import Notify from "../../components/Notify/Notify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import AuthStore from "../../store/AuthStore";
import AuthValidation from "../../validation/AuthValidation";

const Authorization: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAuthData>();

  const [errorAlert, showErrorAlert] = useAlert();
  const [isPasswordMask, passwordType, togglePasswordMask] = usePasswordMask();

  const [performAuthorization, isLoading] = useFetching(
    async (authData: IAuthData): Promise<void> => {
      const authReponse = await AuthStore.authorization(authData);

      if (authReponse.hasError) {
        showErrorAlert(authReponse.response);
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
          className={cl["auth__form"]}
          onSubmit={handleSubmit(performAuthorization)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("email", {
                required: true,
                validate: AuthValidation.email,
              })}
              isError={errors.email}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              type={passwordType}
              {...register("password", {
                required: true,
                validate: AuthValidation.authPassword,
              })}
              isError={errors.password}
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
            <AuthButton tabIndex={3} loading={isLoading}>
              Login
            </AuthButton>
          </fieldset>
          <p className={cl["auth__link"]}>
            <span>Don't have an account?</span>
            <Link to="/signin" tabIndex={4}>
              Sign in
            </Link>
          </p>
        </form>
        <Notify
          show={errorAlert.show}
          message={errorAlert.message}
          type="error"
        />
      </section>
    </div>
  );
};

export default Authorization;
