import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    if (pathSegments.length >= 2) {
      const targetId = pathSegments[1]; // Drugi segment URL jako ID elementu
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname]); // Uruchamia się przy zmianie ścieżki

  return null; // Komponent nie renderuje nic na stronie
};

export default ScrollToSection;
