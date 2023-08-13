"use client";
import React from 'react'
import PrimaryButton from '../global/PrimaryButton'

const SignupForm = () => {

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!");
    // Additional logic or state changes can be performed here
  };

  return (
    <section
      className="mb-8 md:mb-8 md:min-h-screen"
    >
      
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mt-8 px-[2rem]">

        <div className="md:px-[2rem] mb-12 md:mb-0" >
          <h2 className="text-center  text-[1.75rem] text-black font-medium mb-4 ">
            Sign In To Gidiopolis
          </h2>
          {/* <p className="mb-6 text-center md:text-left">
          Ready to showcase your amazing upcoming event to a diverse and engaged audience? Submit your event to our platform
          </p> */}

          <div className="mt-8">


             {/* Social login buttons */}
             <a
                className="mb-3 flex w-full items-center justify-center rounded-full border-2 border-primary-100 px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 "
                href="#!"
                role="button"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                {/* Google */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" role="img" className='mr-2'>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z" fill="#4285F4"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"></path>
                </svg>
                Sign In With Google
              </a>

            {/* Divider */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-light text-sm dark:text-neutral-200">
                  OR Sign In With Email
                </p>
              </div>

            <form>
              {/* Email input */}
              <div className="relative mb-2 pt-4">
                <small>Email Address</small>
                <input
                  type="email"
                  className="bg-white text-gray-800 peer block min-h-[auto] w-full rounded-full bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                  />
              </div>

              {/* Password input */}
              <div className="relative mb-4">
              <small>Password</small>
              <input
                type="password"
                className="bg-white text-gray-800 peer block min-h-[auto] w-full rounded-full bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Email address"
                />
              </div>

              {/* Remember me checkbox */}
              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-my-primary checked:bg-my-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#31859C] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-my-primary dark:checked:bg-my-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#31859C]"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                    defaultChecked
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>

                {/* Forgot password link */}
                <a
                  href="#!"
                  className="text-my-primary transition duration-150 ease-in-out hover:text-cyan-600 focus:text-cyan-600 active:text-cyan-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <div
                className="inline-block text-center cursor-pointer w-full rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Sign in
              </div>

              {/* <!-- Register link --> */}
            {/* <p className="mb-0 mt-4 pt-1 text-sm text-center">
             {" Don't have an account?"}
              <a
                href="#!"
                className="text-my-primary ml-2 transition duration-150 ease-in-out hover:text-cyan-700 focus:text-cyan-700 active:text-cyan-700"
                >Register</a
              >
            </p> */}
             
            </form>
          </div>
          
        </div>

        <div className="flex relative justify-center mt-12">
          <div className="hidden md:block absolute top-[2rem] left-[3rem] h-8 w-8 rounded-lg bg-cyan-400"></div>
          <div className="hidden md:block absolute top-[4rem] left-[5rem] h-12 w-12 rounded-xl bg-my-primary"></div>
          <img
            alt='Davido'
            className="rounded-3xl md:rounded-3xl w-[18rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            src='/img/davido.jpg'
          ></img>
        </div>
        
      </div>
      
    </section>
  )
}

export default SignupForm