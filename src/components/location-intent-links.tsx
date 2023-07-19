import * as React from "react";

type LocationIntentLinksProps = {
  id: string;
};

const LocationIntentLinks = ({ id }: LocationIntentLinksProps) => {
  const tabs = [
    { name: "Store Information", href: "#", current: true },
    { name: "Fitness", href: "#", current: false },
    { name: "Weight Management", href: "#", current: false },
    { name: "Healthy Lifestyle", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
    {/* <div className="">
      <div className="flex flex-row justify-center items-center w-full h-16 bg-brand-primary text-white font-semibold">
        Intent page links for {id}
      </div>
    </div> */}
    <div className="bg-white">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-brand-hover text-brand-hover'
                    : 'border-transparent hover:text-brand-hover',
                  'w-1/4 border-b-2 py-4 px-1 text-center text-base text-brand-primary font-semibold '
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
    </>
  );
};

export { LocationIntentLinks };
