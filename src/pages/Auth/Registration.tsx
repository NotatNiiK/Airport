import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetching } from "../../hooks/useFetching";
import { usePasswordMask } from "../../hooks/usePasswordMask";
import { useAlert } from "../../hooks/useAlert";
import { IRegData } from "../../models/auth";
import { InputMask } from "@react-input/mask";
import cl from "./Auth.module.scss";
import Notify from "../../components/UI/Notify/Notify";
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthStore from "../../store/AuthStore";
import AuthValidation from "../../validation/AuthValidation";
import getRawPhoneNumber from "../../utils/getRawPhoneNumber";

const Registration: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IRegData>();

  const [errorAlert, showErrorAlert] = useAlert();
  const [isPasswordMask, passwordType, togglePasswordMask] = usePasswordMask();

  const maskInputClasses: string = [
    cl["auth__input"],
    errors.contactInfo ? cl["validation-error"] : "",
  ].join(" ");

  const [performRegistration, isLoading] = useFetching(
    async (regData: IRegData): Promise<void> => {
      regData.contactInfo = getRawPhoneNumber(regData.contactInfo);

      const regResponse = await AuthStore.registration(regData);

      if (regResponse.hasError) {
        showErrorAlert(regResponse.response);
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
          className={cl["auth__form"]}
          onSubmit={handleSubmit(performRegistration)}
        >
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("fullName", {
                required: true,
              })}
              isError={errors.fullName}
              onBlur={() => clearErrors("fullName")}
              placeholder="Full name"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              {...register("email", {
                required: true,
                validate: AuthValidation.email,
              })}
              isError={errors.email}
              onBlur={() => clearErrors("email")}
              placeholder="Email"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthInput
              type={passwordType}
              {...register("password", {
                required: true,
                validate: AuthValidation.password,
              })}
              isError={errors.password}
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
              {...register("passportNumber", {
                required: true,
                validate: AuthValidation.passportNumber,
              })}
              isError={errors.passportNumber}
              onBlur={() => clearErrors("passportNumber")}
              placeholder="Passport number"
              tabIndex={4}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <InputMask
              {...register("contactInfo", {
                required: true,
                validate: AuthValidation.myContacts,
              })}
              className={maskInputClasses}
              onBlur={() => clearErrors("contactInfo")}
              mask="+38 (___) ___-__-__"
              replacement={{ _: /\d/ }}
              placeholder="Tel"
              tabIndex={5}
            />
          </fieldset>
          <fieldset className={cl["auth__section"]}>
            <AuthButton tabIndex={6} loading={isLoading}>
              Sign in
            </AuthButton>
          </fieldset>
          <p className={cl["auth__link"]}>
            <span>Do you have an account?</span>
            <Link to="/login" tabIndex={7}>
              Login
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

export default Registration;
