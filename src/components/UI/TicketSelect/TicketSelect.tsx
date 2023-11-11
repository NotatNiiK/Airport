import { FC, SelectHTMLAttributes, forwardRef, Ref } from "react";
import { IOptions } from "../../../models/options";
import cl from "./TicketSelect.module.scss";

interface TicketSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOptions;
  defaultValue: string;
}

const TicketSelect: FC<TicketSelectProps> = forwardRef(
  ({ options, defaultValue, ...props }, ref: Ref<HTMLSelectElement>) => {
    return (
      <select className={cl["ticket-select"]} {...props} ref={ref}>
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map(({ text, value }) => (
          <option value={value}>{text}</option>
        ))}
      </select>
    );
  }
);

export default TicketSelect;
