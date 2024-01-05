import React, { useEffect } from 'react';
import { Arts } from '../icons/Arts';
import { NightLife } from '../icons/NightLife';
import { BusinessEconomy } from '../icons/BusinessEconomy';
import { PublicSector } from '../icons/PublicSector';
import { Religious } from '../icons/Religious';
import { Tech } from '../icons/Tech';
import { Others } from '../icons/Others';
import { Kids } from '../icons/Kids';
import { Concert } from '../icons/Concert';
import { useEventContext } from '@/context/EventContext';

interface Category {
  label: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  { label: 'All', icon: <Others /> },
  { label: 'Arts & Culture', icon: <Arts /> },
  { label: 'Music/Concert', icon: <Concert /> },
  { label: 'Night Life', icon: <NightLife /> },
  { label: 'Public Sector & Policy', icon: <PublicSector /> },
  { label: 'Business & Economy', icon: <BusinessEconomy /> },
  { label: 'Religious', icon: <Religious /> },
  { label: 'Kids', icon: <Kids /> },
  { label: 'IT/Tech', icon: <Tech /> },
];

const Categories = () => {
  const { selectedCategory, setSelectedCategory } = useEventContext();

  useEffect(() => {
    const init = async () => {
      const { Animate, initTE } = await import('tw-elements');
      initTE({ Animate });
    };
    init();
  }, []);

  return (
    <section className="mb-24 md:mb-20 overflow-x-scroll">
      <div className="flex flex-row flex-wrap lg:flex-nowrap justify-around text-black px-[2rem] text-xs mt-8">
        {categories.map((category) => (
          <div
            key={category.label}
            onClick={() => {
              setSelectedCategory(category.label);
            }}
            className={`flex flex-col min-w-[150px] lg:min-w-0 lg:flex-row lg:w-auto rounded-lg py-2 cursor-pointer lg:rounded-full px-2 ${
              selectedCategory === category.label ? 'bg-my-primary text-white' : ''
            }`}
          >
            <p className="flex justify-center">{category.icon}</p>
            <p className="ml-2 mt-1 text-center">{category.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
