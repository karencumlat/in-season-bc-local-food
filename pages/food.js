import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { GiGreenhouse, GiBarrel, GiLindenLeaf } from 'react-icons/gi';

import Layout from './components/layout';
import Header from './components/header';
import { food } from './api/food';
import { useState } from 'react';

export default function FoodItem() {
  const router = useRouter();
  const query = router.query;
  const [season, setSeason] = useState();

  const item = food.filter((foo) => {
    return foo.name === query.name;
  });

  return (
    <Layout>
      <Head>
        <title>In Season - BCs Local Food | {query.name}</title>
      </Head>
      <main className="flex py-7 flex-1 flex-col justify-center items-center">
        <Header />
        {item.map((item, index) => (
          <div key={index}>
            <h1 className=" text-2xl text-center leading-6 capitalize">
              {item.name}
            </h1>
            <h2 className="text-lg mb-6 text-center capitalize">
              {item.category}
            </h2>
            <div className="flex align-center justify-center flex-wrap max-w-none sm:w-full">
              {item.season.map((c, i) => (
                <div
                  className="flex m-4 p-6 text-left text-inherit no-underline border border-solid border-slate-300 rounded-xl transition-colors max-w-xs hover:text-green-800 hover:border-green-800 focus:text-green-800 focus:border-green-800 active:text-green-800 active:border-green-800"
                  key={i}
                >
                  <IconContext.Provider value={{ className: 'text-5xl mr-2' }}>
                    {c.quality.includes('greenhouse') ? (
                      <GiGreenhouse />
                    ) : c.quality.includes('frozen') ? (
                      <GiBarrel />
                    ) : (
                      <GiLindenLeaf />
                    )}
                  </IconContext.Provider>
                  <div>
                    <p className="text-lg capitalize">{c.month}</p>
                    <p className=" text-xs leading-6 capitalize">{c.quality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Link href="/">
          <a className="my-4 hover:text-green-800 focus:text-green-800  active:text-green-800 ">
            Back to home
          </a>
        </Link>
      </main>
    </Layout>
  );
}
