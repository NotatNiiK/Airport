import { useState, useEffect } from "react";
import { IPriceDeps } from "../models/price.deps";

export const useCalculatePrice = ({
  width,
  height,
  weight,
}: IPriceDeps): [number, (price: number) => void] => {
  const [baggagePrice, setBaggagePrice] = useState<number>(0);
  const [pricePerKilo] = useState<number>(2);
  const [pricePerCentimeter] = useState<number>(0.1);

  useEffect((): void => {
    let currentBaggagePrice: number = +(
      weight * pricePerKilo +
      height * pricePerCentimeter +
      width * pricePerCentimeter
    ).toFixed(3);

    setBaggagePrice(currentBaggagePrice);
  }, [width, height, weight]);

  function setPrice(price: number): void {
    setBaggagePrice(price);
  }

  return [baggagePrice, setPrice];
};
