"use client"
import useAuthStore from "@/lib/authStore";
import {useEffect} from "react";
import useUserStore from "@/lib/useUserStore";
import {redirect} from "next/navigation";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const userProfile = useUserStore((state) => state.userProfile)
  const setUserProfile = useUserStore((state) => state.setUserProfile)
  const fetchData = (async () => {
    let responseUser = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/info`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: "127.0.0.1:8000",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let dataUser = await responseUser.json();
    setUserProfile(dataUser.data)
  })

  useEffect(() => {
    fetchData()
    if (userProfile !== null) {
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`)
    }
  }, [userProfile]);
}