import { FC, SelectHTMLAttributes, forwardRef, Ref } from "react";
import { FieldError } from "react-hook-form";
import { IOptions } from "../../../models/options";
import cl from "./TicketSelect.module.scss";

interface TicketSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOptions;
  defaultValue: string;
  isError?: FieldError;
}

const TicketSelect: FC<TicketSelectProps> = forwardRef(
  (
    { options, defaultValue, isError, ...props },
    ref: Ref<HTMLSelectElement>
  ) => {
    const ticketSelectClasses: string = [
      cl["ticket-select"],
      isError ? cl["validation-error"] : "",
    ].join(" ");

    return (
      <select className={ticketSelectClasses} {...props} ref={ref}>
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map(({ text, value }) => (
          <option value={value} key={text}>
            {text}
          </option>
        ))}
      </select>
    );
  }
);

export default TicketSelect;
