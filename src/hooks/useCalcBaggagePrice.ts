import { useState, useEffect } from "react";

export const useCalcBaggagePrice = (
  width: number,
  height: number,
  weight: number
): [number] => {
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

  return [baggagePrice];
};
