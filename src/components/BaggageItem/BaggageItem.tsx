import { FC } from "react";
import { IBaggage } from "../../models/baggage";
import cl from "./BaggageItem.module.scss";

interface BaggageItemProps {
  baggage: IBaggage;
}

const BaggageItem: FC<BaggageItemProps> = ({ baggage }) => {
  return <div className={cl["baggage-item"]}>{baggage.cost}</div>;
};

export default BaggageItem;
