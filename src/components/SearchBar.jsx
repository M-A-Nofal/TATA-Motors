"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { manufacturers } from "@/constants";
import { Combobox, Transition } from "@headlessui/react";

const SearchButton = ({ otherClasses }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");

  const [model, setModel] = useState("");

  const router = useRouter();

  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSearch = (e) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model, manufacturer) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        {/* start SearchManufacturer */}
        <div className="search-manufacturer">
          <Combobox value={manufacturer} onChange={setManufacturer}>
            <div className=" relative w-full">
              {/* Button for the combobox. Click on the icon to see the complete dropdown */}
              <Combobox.Button className="absolute top-[14px]">
                <Image
                  src="/car-logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="ml-4"
                />
              </Combobox.Button>
              {/* Input field for searching */}
              <Combobox.Input
                className="search-manufacturer__input"
                displayValue={(manufacturer) => manufacturer}
                onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
                placeholder="BMW..."
              />
              {/* Transition for displaying the options */}
              <Transition
                as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")} // Reset the search query after the transition completes
              >
                <Combobox.Options className="search-manufacturer__options">
                  {filteredManufacturers.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredManufacturers.map((item) => (
                      <Combobox.Option
                        key={item}
                        className={({ active }) =>
                          `relative search-manufacturer__option ${
                            active
                              ? "bg-primary-blue text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item}
                            </span>
                            {/* Show an active blue background color if the option is selected */}
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active
                                    ? "text-white"
                                    : "text-pribg-primary-purple"
                                }`}
                              ></span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        {/* end SearchManufacturer */}
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="X6..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
