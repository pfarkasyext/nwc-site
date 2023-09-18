import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { Address } from "../types/address";
import HoursText from "./HoursText";

type StockStatus = {
  name: string;
  geomodifier: string;
  address: Address;
  slug: string;
  hours: any;
  timezone: any;
};

type InventoryModalProps = {
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  stockAvailability: StockStatus[];
};

const InventoryModal = (props: InventoryModalProps) => {
  const { productName, isOpen, stockAvailability, onClose } = props;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className=" w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative  w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="flex">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div>
                      You can find{" "}
                      <span className="font-medium">{productName}</span>
                      in stock at
                    </div>
                  </div>
                  <div className="mt-8 flow-root h-96 overflow-scroll">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Address
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {stockAvailability.map(
                              (item: StockStatus, index: number) => (
                                <tr key={index}>
                                  <td className="whitespace-nowrap  py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    <div>
                                      {item.name} - {item.geomodifier}
                                    </div>
                                    <div>
                                      <HoursText document={item}></HoursText>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                    {item.address.line1}
                                    <br />
                                    {item.address.city}, {item.address.region}{" "}
                                    {item.address.postalCode}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm  ">
                                    <a
                                      href={item.slug}
                                      className="bg-brand-cta w-fit px-6 py-2 flex justify-center upper-case text-sm hover:bg-gray-400 rounded-md hover:cursor-pointer text-white"
                                    >
                                      View Store
                                    </a>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default InventoryModal;
