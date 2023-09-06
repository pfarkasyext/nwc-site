import * as React from "react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useRef, useState } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import searchConfig from "./search/searchConfig";
import TypedAnimation from "./TypedAnimation";

const SearchHeroBanner = () => {
  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    const { query } = searchEventData;
    if (query) window.open("/search?query=" + query, "_self");
  };

  const [queryPrompts, setQueryPrompts] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUnivPrompts = async () => {
      const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete?v=20190101&api_key=${searchConfig.apiKey}&sessionTrackingEnabled=false&experienceKey=${searchConfig.experienceKey}&input=&version=STAGING&locale=${searchConfig.locale}`;
      try {
        const res = await fetch(url);
        const body = await res.json();
        const qs = body.response.results.map((item: any) => item.value);
        setQueryPrompts(qs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnivPrompts();
  }, []);

  const typingEffect = () => {
    const word = queryPrompts[currentWordIndex]?.split("") || [];
    const ele = document.querySelector(".demo") as HTMLInputElement;

    const loopTyping = () => {
      if (word.length > 0) {
        ele.placeholder += word.shift();
        timerRef.current = setTimeout(loopTyping, 100);
      } else {
        deletingEffect();
      }
    };

    loopTyping();
  };

  const deletingEffect = () => {
    const word = queryPrompts[currentWordIndex]?.split("") || [];
    const ele = document.querySelector(".demo") as HTMLInputElement;

    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        ele.placeholder = word.join("");
        timerRef.current = setTimeout(loopDeleting, 65);
      } else {
        setCurrentWordIndex(
          (prevIndex) => (prevIndex + 1) % queryPrompts.length
        );
        typingEffect();
      }
    };

    loopDeleting();
  };

  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setUniversal();
  }, []);

  useEffect(() => {
    const ele = document.querySelector(".demo") as HTMLInputElement;
    if (ele && queryPrompts.length >= 1) {
      typingEffect();
    }
  }, [queryPrompts, currentWordIndex]);
  return (
    <>
      <section aria-labelledby="cause-heading">
        <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://www.washingtonpost.com/resizer/q_Sj-osjhABCigGjPWnL5BfChoo=/arc-anglerfish-washpost-prod-washpost/public/OHBJ2SJ6W5JLRDPQLSOU4233EY.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="cause-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Healthy Living since 1939
            </h2>
            <p className="mt-3 text-xl text-white">
              Get expert guidance and top-quality vitamins, supplements, and
              sports nutrition products at NWC. With over 80 years of
              experience, we help you reach your health goals and live your best
              life.
            </p>
            <div className="flex justify-center w-2/3 pt-12">
              <TypedAnimation />
            </div>
            <a
              href="/products"
              className="inline-block rounded-md border border-transparent bg-brand-cta px-8 py-3 font-medium text-white hover:bg-brand-cta-hover"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchHeroBanner;
