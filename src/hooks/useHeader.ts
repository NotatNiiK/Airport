import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../store/AuthStore";
import toggleBodyLock from "../utils/toggleBodyLock";

export const useHeader = (): [
  boolean,
  boolean,
  () => void,
  () => void,
  () => void
] => {
  const navigate = useNavigate();

  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function toggleModal(): void {
    setIsLogoutModal(!isLogoutModal);
    setIsBurgerMenuOpen(false);
  }

  function toggleBurgerMenu(): void {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
    toggleBodyLock();
  }

  function performLogout(): void {
    AuthStore.logout();
    toggleBodyLock();
    setIsLogoutModal(false);
    navigate("/login");
  }

  return [
    isLogoutModal,
    isBurgerMenuOpen,
    toggleModal,
    toggleBurgerMenu,
    performLogout,
  ];
};
