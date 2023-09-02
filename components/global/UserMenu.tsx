import { useAuthContext } from '@/context/AuthContext';
import { signOutUser } from '@/firebase/auth/signin';
import { successMessage } from '@/firebase/success_message';
import { getInitials } from '@/utils/func';
import Link from 'next/link';
import React, {useEffect } from 'react'

export const UserMenu = () => {
  const { user } = useAuthContext()

  const signout = async () => {
    await signOutUser()
    return successMessage("Sign out successful")
  }

  useEffect(() => {
    const init = async () => {
      const { Dropdown, Ripple, initTE } = await import("tw-elements");
      initTE({ Dropdown, Ripple,});
    };
    init();
  }, []);

  return (
    <div className="relative pl-4 pr-1 cursor-pointer" data-te-dropdown-position="dropstart">
      <div
        className="flex items-center whitespace-nowrap rounded-full bg-my-primary p-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        id="dropdownMenuButton1s"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light">
        
        {getInitials(user?.displayName || '')}
      </div>
      <ul
        className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton1s"
        data-te-dropdown-menu-ref>
        <li>
          <a
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="#"
            data-te-dropdown-item-ref
          >
            Account Settings
          </a>
        </li>
        <li>
          <Link
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href={`/user/events`}
            data-te-dropdown-item-ref
          >
            Manage My Events
          </Link>
        </li>
        <li>
          <a
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            data-te-dropdown-item-ref
            onClick={signout}
          >
            Sign Out
          </a>
        </li>
      </ul>
    </div>
  
  )
}