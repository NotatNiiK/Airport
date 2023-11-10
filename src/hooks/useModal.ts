import { useState } from "react";

export const useModal = (): [boolean, () => void] => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function toggleModalOpen(): void {
    setIsModalOpen(!isModalOpen);
  }

  return [isModalOpen, toggleModalOpen];
};
