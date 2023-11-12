import { FC } from "react";
import { IBaggages } from "../../models/baggage";
import cl from "./FlightsList.module.scss";
import BaggageItem from "../BaggageItem/BaggageItem";
import Loader from "../UI/Loader/Loader";
import NotFound from "../UI/NotFound/NotFound";

interface BaggageListProps {
  baggages: IBaggages;
  isLoading: boolean;
}

const BaggageList: FC<BaggageListProps> = ({ baggages, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return baggages.length > 0 ? (
    <ul className={cl["baggage-list"]}>
      {baggages.map((baggage) => (
        <BaggageItem baggage={baggage} key={baggage.id} />
      ))}
    </ul>
  ) : (
    <NotFound colorClass="text-white">There are no baggages!</NotFound>
  );
};

export default BaggageList;
