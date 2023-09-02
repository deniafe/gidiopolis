"use client";
import React, { useEffect, useState } from 'react';
import { Arts } from '../icons/Arts';
import { NightLife } from '../icons/NightLife';
import { BusinessEconomy } from '../icons/BusinessEconomy';
import { PublicSector } from '../icons/PublicSector';
import { Religious } from '../icons/Religious';
import { Tech } from '../icons/Tech';
import { Others } from '../icons/Others';

interface Category {
  label: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  // { label: 'All', icon: <Others /> },
  { label: 'IT/Tech', icon: <Tech /> },
  { label: 'Arts & Culture', icon: <Arts /> },
  { label: 'Night Life', icon: <NightLife /> },
  { label: 'Pubic Sector & Policy', icon: <PublicSector /> },
  { label: 'Music/Concert', icon: <Arts /> },
  { label: 'Business & Economy', icon: <BusinessEconomy /> },
  { label: 'Religious', icon: <Religious /> },
  { label: 'Children', icon: <Others /> },
];

interface CategoriesProps {
  getCategory: (category: string) => void;
}

const Categories = ({ getCategory }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const init = async () => {
      const { Animate, initTE } = await import('tw-elements');
      initTE({ Animate });
    };
    init();
  }, []);

  return (
    <section className="mb-24 md:mb-24">
      <h2 className="flex justify-center md:justify-start text-[1.75rem] text-black font-medium px-[2rem]">
        Categories
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-around text-black px-[2rem] text-xs mt-8">
        {categories.map((category) => (
          <div
            key={category.label}
            onClick={() => {
              getCategory(category.label);
              setSelectedCategory(category.label);
            }}
            className={`flex justify-between py-2 cursor-pointer rounded-full px-2 ${
              selectedCategory === category.label ? 'bg-my-primary text-white' : ''
            }`}
          >
            {category.icon}
            <span className="ml-2 mt-1">{category.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
