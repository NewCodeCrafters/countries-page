import { MoveLeft } from "lucide-react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
const formatNum = (num) => {
  const numFormat = new Intl.NumberFormat("en-us");
  return numFormat.format(num);
};
const CountryDetail = () => {
  const data = useLoaderData();
  const getNativeName = (nativename) => {
    const nativenames = [];

    for (const key in nativename) {
      nativenames.push(nativename[key].common);
    }
    return nativenames[0] || "";
  };
  const convertToArray = (languages) => {
    const lang = [];

    for (let key in languages) {
      console.log(key, languages[key]);
      lang.push(languages[key]);
    }
    return lang;
  };
  const navigate = useNavigate();
  return (
    <main className="container mx-auto mt-20">
      <button
        className="shadow-lg bg-white dark:bg-dark-elements text-ligth-text text-base font-light dark:text-white flex items-center gap-2 px-3 h-10 rounded w-full max-w-28 mb-20"
        onClick={() => navigate(-1)}
      >
        <MoveLeft className="w-5" />
        <span>Back</span>
      </button>
      <section className="grid grid-cols-2 gap-10">
        <figure>
          <img src={data.flags.svg} alt={data.flags.alt} className="w-full " />
        </figure>
        <section>
          <h1 className="text-ligth-text dark:text-white font-extrabold text-xl">
            {data.name.common}
          </h1>
          <ul className="grid grid-cols-2 gap-3">
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Native Name:{" "}
              <span className="font-light dark:text-white/80">
                {getNativeName(data.nativename)}
              </span>
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Top Level Domain:{" "}
              {data.tld.map((tld, i, arr) => (
                <span className="font-light dark:text-white/80" key={tld}>
                  {tld}
                  {i !== arr.length - 1 && ", "}
                </span>
              ))}
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Population:{" "}
              <span className="font-light dark:text-white/80">
                {formatNum(data.population)}
              </span>
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Currencies:{" "}
              <span className="font-light dark:text-white/80">
                {formatNum(data.population)}
              </span>
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Region:{" "}
              <span className="font-light dark:text-white/80">
                {data.region}
              </span>
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Languages:{" "}
              {convertToArray(data.languages).map((lang, i, arr) => (
                <span className="font-light dark:text-white/80" key={lang}>
                  {lang}
                  {i !== arr.length - 1 && ", "}
                </span>
              ))}
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text col-span-2">
              Sub Region:{" "}
              <span className="font-light dark:text-white/80">
                {data.subregion}
              </span>
            </li>
            <li className="font-semibold text-base dark:text-white text-ligth-text">
              Capitaln:{" "}
              {data.capital.map((capital, i, arr) => (
                <span className="font-light dark:text-white/80" key={capital}>
                  {capital}
                  {i !== arr.length - 1 && ", "}
                </span>
              ))}
            </li>
          </ul>

          <div>
            <h2 className="text-ligth-text dark:text-white font-semibold txt-base">
              Border Countries
            </h2>
            <div className="flex gap-4">
              {data.borders.map((border) => (
                <Link
                  to={`/${border}`}
                  className="p-4 bg-white dark:bg-dark-elements flex items-center justify-center text-sm text-ligth-text/85 dark:text-white/85"
                  key={border}
                >
                  {border}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default CountryDetail;
