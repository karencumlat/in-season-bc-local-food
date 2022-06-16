import Head from 'next/head';
import Image from 'next/image';
import Layout from './components/layout';
import styles from '../styles/Home.module.css';
import { food } from './api/food';
import { months } from './api/months';
import { useState, useMemo } from 'react';

export default function Home() {
  const newDate = new Date();
  const currentMonth = months[newDate.getMonth()];

  const [month, setMonth] = useState(currentMonth);
  const [category, setCategory] = useState('all');

  // Available categories
  const categories = [...new Set(food.map((food) => food.category))];

  const filteredFood = useMemo(
    () => filterFood(month, category),
    [month, category]
  );

  function filterFood(month, category) {
    if (category == 'all') {
      return food.filter((food) => {
        return food.season.find((e) => e.month === month);
      });
    } else {
      return food.filter((food) => {
        return (
          food.category === category &&
          food.season.find((e) => e.month === month)
        );
      });
    }
  }

  return (
    <Layout>
      <Head>
        <title>In Season - BCs Local Food</title>
        <meta name="description" content="What is in season in BC?" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className="flex py-7 flex-1 flex-col justify-center items-center">
        <div className="flex">
          <Image
            src="/images/in-season-logo.png"
            alt="In Season Logo"
            width={666}
            height={375}
          />
        </div>
        <p className="my-16 text-2xl text-center leading-6">
          What is in season in BC?
        </p>
        {/** Filter: Month */}
        <div>
          <label htmlFor="month">Month </label>
          <select
            name="month"
            id="month"
            value={month}
            className="px-4 py-3 rounded"
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((m) => {
              return (
                <option value={m} key={m}>
                  {m}
                </option>
              );
            })}
          </select>
          {/** Filter: Category: Fruits, Vegetable etc. */}
          <label htmlFor="category"> Category </label>
          <select
            name="category"
            id="category"
            className="px-4 py-3 rounded"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <option value="all" key="all">
              All
            </option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/** Grid Filtered Food*/}
        <div className="flex align-center justify-center flex-wrap max-w-none sm:w-full">
          {filteredFood.map((food) => {
            const foodQuality = food.season
              .filter((e) => {
                return e.month === month;
              })
              .map((e) => {
                return e.quality;
              });

            return (
              //Food Card
              <a
                href="#"
                className="m-4 p-6 text-left text-inherit no-underline border border-solid border-slate-300 rounded-xl transition-colors max-w-xs hover:text-green-800 hover:border-green-800 focus:text-green-800 focus:border-green-800 active:text-green-800 active:border-green-800"
                key={food.name}
              >
                {/* <Image
                  src="https://source.unsplash.com/random/300x300"
                  alt={`Picture of `}
                  width={300}
                  height={300}
                /> */}
                <h2 className="text-2xl mb-6 capitalize">{food.name}</h2>
                <p className="m-0 text-s leading-6 capitalize">
                  {food.category + ' • ' + foodQuality}
                </p>
              </a>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image
            src="/images/in-season-icon.png"
            alt="In Season Logo"
            width={50}
            height={50}
          />
        </span>
      </footer>
    </Layout>
  );
}
