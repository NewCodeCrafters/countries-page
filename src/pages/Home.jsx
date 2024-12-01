import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { ChevronDown, Search } from "lucide-react";
import api from "../utils/api";
import { AxiosError } from "axios";
import Loader from "../components/Loader";
const Home = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const regions = useMemo(() => {
    const regions = [];
    data.forEach((country) => {
      if (!regions.includes(country.region)) {
        regions.push(country.region);
      }
    });
    return regions;
  }, [data]);
  const onSearch = async (signal) => {
    try {
      setLoading(true);

      if (!search.trim().length) return;
      const { data } = await api.get(`/name/${search.trim()}`, {
        signal,
      });
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          setSearchResult([]);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const changeRegion = (region) => {
    setSelectedRegion(region);
    setShowDropDown(false);
  };
  const filterRegion = (countries, region) => {
    if (region.length == 0) {
      return countries;
    }
    return countries.filter((country) =>
      country.region.toLowerCase().includes(region.toLowerCase())
    );
  };
  useEffect(() => {
    const controller = new AbortController();
    onSearch(controller.signal);
    // CLEANUP Function
    return () => {
      controller.abort();
    };
  }, [search]);
  return (
    <main className="container flex flex-col mx-auto mt-6 flex-1">
      <section className="flex justify-between items-center">
        <form
          className="flex gap-5 w-full max-w-lg shadow-md dark:text-white text-ligth-input h-14  px-6 rounded-md dark:bg-dark-elements bg-ligth-background focus-within:border focus-within:border-black"
          tabIndex={0}
          onSubmit={(e) => e.preventDefault()}
        >
          <button>
            <Search className="w-6" />
          </button>
          <input
            type="text"
            placeholder="Search for a country"
            name="name"
            className="placeholder:text-ligth-input dark:placeholder:text-white text-ligth-text dark:text-white flex-1 bg-transparent focus-within:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        <div className="relative  w-full max-w-52">
          <button
            className="bg-white w-full dark:bg-dark-elements text-ligth-text dark:text-white py-4 px-5 rounded-md flex justify-between items-center shadow-md"
            onClick={() => setShowDropDown((prev) => !prev)}
          >
            <span className="capitalize text-base">
              {selectedRegion ? selectedRegion : "Filter by Region"}
            </span>
            <ChevronDown className="w-5" />
          </button>
          {showDropDown && (
            <div className="absolute top-[120%] z-50 py-4 px-5 left-0 w-full flex flex-col gap-2 items-start bg-white dark:bg-dark-elements rounded-md shadow-md">
              <button
                className="capitalize text-ligth-text dark:text-white text-base font-light"
                onClick={() => changeRegion("")}
              >
                all
              </button>
              {regions.map((region) => (
                <button
                  className="capitalize text-ligth-text dark:text-white text-base font-light"
                  key={region}
                  onClick={() => changeRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {loading ? (
        <Loader />
      ) : (
        <section className="grid grid-cols-4 gap-10 py-6">
          {search.trim().length
            ? filterRegion(searchResult, selectedRegion).map((country) => (
                <CountryCard key={country.cca3} {...country} />
              ))
            : filterRegion(data, selectedRegion).map((country) => (
                <CountryCard key={country.cca3} {...country} />
              ))}
        </section>
      )}
    </main>
  );
};

export default Home;
