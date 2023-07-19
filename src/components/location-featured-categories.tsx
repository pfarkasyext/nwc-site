import * as React from "react";

const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts...
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
          'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
          'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        author: {
          name: 'Michael Foster',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
          'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
          'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        author: {
          name: 'Michael Foster',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
  ]

  type image = {
    url: string;
  }

  type linkedCat = {
    name: string;
    landingPageUrl: string;
    c_bannerPhoto: image;
    slug: string;
  };
  
  type FeaturedCategoriesProps = {
    categories: linkedCat[];
  };
  
  const LocationFeaturedCategories = ({
    categories,
  }: FeaturedCategoriesProps) => {
    return (
      <div className="bg-gray-900 py-16 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Categories</h2>
            <p className="mt-2 text-lg leading-8 text-white">
              Shop our hottest categories!
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {categories && categories.map((category, index) => (
              <article
                key={index}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-16 pt-16 sm:pt-16 lg:pt-16"
              >
                <img src={category.c_bannerPhoto && category.c_bannerPhoto.url} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white flex flex-row justify-center">
                  <a href={"/" + category.slug}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </a>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export { LocationFeaturedCategories };