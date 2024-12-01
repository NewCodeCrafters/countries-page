/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CountryCard = (props) => {
  return (
    <Link
      to={`/${props.cca3}`}
      className="bg-white dark:bg-dark-elements rounded overflow-hidden"
    >
      <figure className=" w-full">
        <img
          className="h-40 w-full"
          src={props.flags.png}
          alt={props.name.official}
        />
      </figure>
      <div className="p-5">
        <h2 className="font-extrabold text-ligth-text dark:text-white text-lg">
          {props.name.official}
        </h2>
        <ul className="flex flex-col gap-2 mt-5">
          <li className="text-sm">
            <span className="dark:text-white  font-semibold">Population: </span>
            <span className="dark:text-white font-light">
              {props.population}
            </span>
          </li>
          <li className="text-sm">
            <span className="dark:text-white  font-semibold">Region: </span>
            <span className="dark:text-white font-light">{props.region}</span>
          </li>
          <li className="text-sm">
            <span className="dark:text-white  font-semibold">Captial: </span>
            {props.capital?.map((capital, i) => (
              <span className="dark:text-white font-light" key={capital}>
                {capital}
                {i !== props.capital.length - 1 && ", "}
              </span>
            ))}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default CountryCard;
