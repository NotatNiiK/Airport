import { useState, useEffect } from "react";

interface IPriceDeps {
  width: number;
  height: number;
  weight: number;
}

export const useCalculatePrice = ({
  width,
  height,
  weight,
}: IPriceDeps): [number, () => void] => {
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

  function resetPrice(): void {
    setBaggagePrice(0);
  }

  return [baggagePrice, resetPrice];
};
