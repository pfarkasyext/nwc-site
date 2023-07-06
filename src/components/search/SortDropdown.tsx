import * as React from "react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Direction,
  SortBy,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";

const sortConfig: Record<string, { label: string; sortBy: SortBy }> = {
  price_desc: {
    label: "Price: High to Low",
    sortBy: {
      field: "c_cPrice",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  price_asc: {
    label: "Price: Low to High",
    sortBy: {
      field: "c_cPrice",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  alpha_asc: {
    label: "Name: A-Z",
    sortBy: {
      field: "name",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  alpha_desc: {
    label: "Name: Z-A",
    sortBy: {
      field: "name",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  relevance: {
    label: "Relevance",
    sortBy: {
      type: SortType.Relevance,
    },
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SortDropdown = () => {
  const [selected, setSelected] = useState(sortConfig["relevance"]);

  const searchActions = useSearchActions();

  const handleSortChange = (key: string) => {
    const sort = sortConfig[key];
    setSelected(sort);
    searchActions.setSortBys([sort.sortBy]);
    searchActions.executeVerticalQuery();
  };

  return (
    <div className="pb-4 flex flex-col">
      <span className="text-sm pb-2">Sort by:</span>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100">
            {selected.label}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {Object.entries(sortConfig)
                .filter(([key, value]) => value.label !== selected.label)
                .map(([key, value]) => (
                  <Menu.Item key={key}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        )}
                        onClick={() => handleSortChange(key)}
                      >
                        {value.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export { SortDropdown };
