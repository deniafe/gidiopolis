import { ResetPassword } from '@/firebase/auth/signin';
import React, { useState } from 'react';
import { Loading } from './Loading';

export const ResetModal = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const closeModal = async () => {
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("resetModal"))
    setLoading(false)
    return myModal.hide()
  }

  const sendResetEmail = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    setLoading(true)

    const { error } = await ResetPassword(email)

    if (error) {
      setLoading(false)
      return console.log(error)
    }

    setLoading(false)

    return closeModal()
  }

    return (
        <>
            {/* Modal */}
            <div
                data-te-modal-init
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="resetModal"
                tabIndex={-1}
                aria-labelledby="resetModalLabel"
                aria-hidden="true"
            >
                <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
                >
                    <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md p-4 dark:border-opacity-50">
                            {/* Modal title */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalLabel">
                                Forgot Password?
                            </h5>
                            {/* Close button */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                data-te-modal-dismiss
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="relative flex-auto p-4 px-6" data-te-modal-body-ref>

                          <p className="text-sm pb-6">Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
                          <p className="text-sm pb-8">For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>

                          <div className="mb-2"> 
                            <small>Email Address</small>
                            <input
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                              id="exampleFormControlInput1"
                              placeholder="Email address"
                              />
                          </div>
                         </div>

                        {/* Email input */}
                        {/* <div className="flex justify-center"> */}
                          
                        {/* </div> */}

                        <div className="flex justify-center border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                           
                          <div
                            onClick={sendResetEmail}
                            className="inline-block text-center cursor-pointer w-3/4 rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                          {
                            loading ?
                            (<Loading />) :
                            (
                              <span>
                                 Send Reset Email
                              </span>
                            )
                          }
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
