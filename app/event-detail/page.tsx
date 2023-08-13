"use client";
import { useEffect } from "react";

export default function EventDetail() {

  useEffect(() => {
    const init = async () => {
      const { Datepicker, Input, initTE } = await import("tw-elements");
      initTE({ Datepicker, Input });
    };
    init();
  }, []);

  return (
    <main className="bg-white md:pt-32 md:px-[2rem]">
      
    </main>
  )
}
