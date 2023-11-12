import { useState } from "react";

export const useModal = (): [boolean, () => void] => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function toggleModal(): void {
    setIsModalOpen(!isModalOpen);
  }

  return [isModalOpen, toggleModal];
};
