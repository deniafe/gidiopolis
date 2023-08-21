"use client";
import CreateEventForm from "@/components/event/CreateEventForm";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateEvent() {

  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
}, [user])
  
  return (
    <main className="bg-white pt-16 md:pt-32 md:px-[2rem]">
      <CreateEventForm />
    </main>
  )
}
