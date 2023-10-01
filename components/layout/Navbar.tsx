"use client";
import Image from 'next/image'
import { useEffect } from "react";
import { Logo } from '../icons/Logo';
import PrimaryButton from '../global/PrimaryButton';
import TextButton from '../global/TextButton';
import { categories } from '@/utils/constants';
import { useAuthContext } from "@/context/AuthContext";
import { UserMenu } from '../global/UserMenu';
import { useEventContext } from '@/context/EventContext'
import Link from 'next/link';


const Navbar = () => {
  const { user } = useAuthContext()
  const { getCategory } = useEventContext()

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!");
    // Additional logic or state changes can be performed here
  };

  // useEffect(() => {
  //   if (user == null) router.push("/")
  // }, [user])

  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown, Modal, Ripple,});
    };
    init();
  }, []);

  return (
      <nav
        className="z-[500] fixed flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-sm hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <Link
              className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
              href="/"
            >
              <Logo />
            </Link>
          </div>

          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent4"
            aria-controls="navbarSupportedContent4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Hamburger icon */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {/* Collapsible navbar container */}
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent4"
            data-te-collapse-item
          >
            {/* Left links */}
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
              data-te-navbar-nav-ref
            >
              {/* Home link */}
              <li
                className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                data-te-nav-item-ref
              >
                <a
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  {/* Dashboard */}
                </a>
              </li>
            </ul>

            <div className="md:flex md:flex-row items-center">
              <ul className="list-none text-sm font-medium mr-auto pl-6 flex flex-col md:mr-6 md:pl-0 lg:mt-1 lg:flex-row" data-te-navbar-nav-ref>
                {/* Categories Drop Down link */}
                {/* <li className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1" data-te-nav-item-ref>
                  <div className="relative text-sm font-medium items-center" data-te-dropdown-ref>
                    <a
                      className="flex items-center text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                      href="#"
                      type="button"
                      id="dropdownMenuButton2"
                      data-te-dropdown-toggle-ref
                      aria-expanded="false"
                    >
                      Event Categories
                      <span className="ml-2 w-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                    <ul
                      className="absolute z-[1000] float-left m-0 mt-4 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                      aria-labelledby="dropdownMenuButton2"
                      data-te-dropdown-menu-ref
                    >
                      {categories.map((category, index) => (
                        <li 
                        onClick={() => {
                          getCategory(category.title)
                        }}
                        key={index}>
                          <a
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                          >
                            {category.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li> */}
                 {/* About link */}
                 <li className="mb-4 pl-2 lg:mb-0 lg:pl-2 lg:pr-1" data-te-nav-item-ref>
                  <a
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="https://blog.gidiopolis.com/?page_id=30"
                    data-te-nav-link-ref
                  >
                    About
                  </a>
                </li>
                {/* Contact link */}
                {/* <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1" data-te-nav-item-ref>
                  <a
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#"
                    data-te-nav-link-ref
                  >
                    Contact
                  </a>
                </li> */}
                {/* Blog link */}
                <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1" data-te-nav-item-ref>
                  <a
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="https://blog.gidiopolis.com/"
                    data-te-nav-link-ref
                  >
                    Blog
                  </a>
                </li>
              </ul>

              {
                user ?
                (
                  <div className="flex">
                    <UserMenu />
                    <a
                      className='pt-1' 
                      href={'/create-event'}                    
                      >
                      <TextButton onClick={handleButtonClick}>+ New Event</TextButton>
                    </a>
                  </div>
                  
                ) :

                (
                  <div className="flex">
                    <div
                      data-te-toggle="modal"
                      data-te-target="#signinModal"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <TextButton onClick={handleButtonClick}>Login</TextButton>
                    </div>
    
                    <div
                      data-te-toggle="modal"
                      data-te-target="#signupModal"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <PrimaryButton onClick={handleButtonClick}>Sign up</PrimaryButton>
                    </div>
                  </div>
                )
              }

             

            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
