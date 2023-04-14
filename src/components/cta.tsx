import * as React from "react";
import { twMerge } from "tailwind-merge";

type Cta = {
  buttonText: string;
  url?: string;
  style?: string;
  target: string;
};

const Cta = (props: Cta) => {
  const { buttonText, url, style, target } = props;

  return (
    <a
      href={url}
      className={twMerge(
        "px-4 text-base font-bold text-white rounded-lg",
        style
      )}
      target={target}
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
