import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { IRegData } from "../../models/auth";
import { useNavigate, Link } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import { usePasswordMask } from "../../hooks/usePasswordMask";
import { useAlert } from "../../hooks/useAlert";
import cl from "./Auth.module.scss";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import AuthValidation from "../../validation/AuthValidation";
import getRawPhoneNumber from "../../utils/getRawPhoneNumber";
import AuthStore from "../../store/AuthStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Registration: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IRegData>();

  const [errorAlert, showAlert] = useAlert();
  const [isPasswordMask, passwordType, togglePasswordMask] = usePasswordMask();

  const [performRegistration, isLoading] = useFetching(
    async (regData: IRegData): Promise<void> => {
      regData.contactInfo = getRawPhoneNumber(regData.contactInfo);
      const regResponse = await AuthStore.registration(regData);
      if (regResponse.hasError) {
        showAlert(regResponse.response);
        return;
      }
      reset();
      navigate("/");
    }
  );

  return (
    <div className={cl["auth"]}>
      <section className={cl["auth__body"]}>
        <h1 className={cl["auth__title"]}>Sign in</h1>
        <form
          className="auth__form"
          onSubmit={handleSubmit(performRegistration)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              isError={errors.fullName}
              {...register("fullName", {
                required: true,
              })}
              onBlur={() => clearErrors("fullName")}
              placeholder="Username"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              isError={errors.email}
              {...register("email", {
                required: true,
                validate: AuthValidation.email,
              })}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              isError={errors.password}
              type={passwordType}
              {...register("password", {
                required: true,
                validate: AuthValidation.password,
              })}
              onBlur={() => clearErrors("password")}
              placeholder="Password"
              tabIndex={3}
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
            <AuthInput
              isError={errors.passportNumber}
              {...register("passportNumber", {
                required: true,
                validate: AuthValidation.passportNumber,
              })}
              onBlur={() => clearErrors("passportNumber")}
              placeholder="Passport number"
              tabIndex={4}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <InputMask
              type="text"
              className={`${cl["auth__input"]} ${
                errors.contactInfo ? cl["validation-error"] : ""
              }`}
              mask="+38 (___) ___-__-__"
              replacement={{ _: /\d/ }}
              {...register("contactInfo", {
                required: true,
                validate: AuthValidation.myContacts,
              })}
              onBlur={() => clearErrors("contactInfo")}
              placeholder="Tel"
              tabIndex={5}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthButton type="submit" tabIndex={6} loading={isLoading}>
              Sign in
            </AuthButton>
          </fieldset>
          <p className={cl["auth__link"]}>
            Do you have an account?{" "}
            <Link to="/login" tabIndex={7}>
              Login
            </Link>
          </p>
          <ErrorAlert isError={errorAlert.error} message={errorAlert.message} />
        </form>
      </section>
    </div>
  );
};

export default Registration;
