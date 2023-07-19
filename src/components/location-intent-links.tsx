import * as React from "react";

type LocationIntentLinksProps = {
  id: string;
  tabIndex: number;
};

const LocationIntentLinks = ({ id, tabIndex }: LocationIntentLinksProps) => {
  
  const tabs = [
    { name: "Store Information", href: `/location/${id}`, current: false },
    { name: "Fitness", href: `/location/${id}/fitness`, current: false },
    { name: "Weight Management", href: `/location/${id}/weight-management`, current: false },
    { name: "Healthy Lifestyle", href: `/location/${id}/healthy-lifestyle`, current: false },
  ];

  //TODO: set tab.current based on value of tabIndex
  tabs[tabIndex].current = true;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
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
                    : 'border-transparent hover:text-brand-hover text-brand-primary',
                  'w-1/4 border-b-2 py-4 px-1 text-center text-base font-semibold '
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
