import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
const Header = () => {
  const isDarkMode = JSON.parse(localStorage.getItem("darkmode")) || false;
  const [darkMode, setDarkMode] = useState(Boolean(isDarkMode));
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkmode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <header className="dark:bg-dark-elements bg-ligth-white shadow-md min-h-20 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-extrabold dark:text-white text-ligth-text text-xl">
          Where in the world?
        </h1>
        <button
          className="flex  gap-4 text-ligth-text dark:text-white items-center"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          <Moon />
          <span className="font-light text-base ">
            {darkMode ? "Dark" : "Light"} Mode
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
