import { FC } from "react";
import { IBaggage } from "../../models/baggage";
import cl from "./BaggageItem.module.scss";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface BaggageItemProps {
  baggage: IBaggage;
}

const BaggageItem: FC<BaggageItemProps> = ({ baggage }) => {
  return (
    <li className={cl["baggage-item"]}>
      <h2 className={cl["baggage-item__cost"]}>Cost: {baggage.cost}$</h2>
      <ul className={cl["baggage-item__list"]}>
        <li className={cl["baggage-item__list-item"]}>
          Weight: {baggage.weight}kg
        </li>
        <li className={cl["baggage-item__list-item"]}>
          Height: {baggage.height}cm
        </li>
        <li className={cl["baggage-item__list-item"]}>
          Width: {baggage.width}cm
        </li>
      </ul>
      <div className="baggage-item__buttons">
        <button className="baggage-item__button">
          <EditNoteIcon />
        </button>
        <button className="baggage-item__button">
          <DeleteForeverIcon />
        </button>
      </div>
    </li>
  );
};

export default BaggageItem;
