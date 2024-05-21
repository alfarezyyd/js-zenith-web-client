'use client'
import {redirect, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import useAuthStore from "@/lib/authStore";

export default function Page() {

  const homeParams = useSearchParams();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const token = homeParams.get('token');

    if (token) {
      setAccessToken(token); // Simpan token ke store menggunakan zustand
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkpoint`)
    }

    // Redirect atau navigasi ke halaman lain
    // Misalnya, redirect ke halaman utama setelah menyimpan token
    // Router.push('/'); // Jika menggunakan Next.js Router
    // history.push('/'); // Jika menggunakan React Router DOM
  }, [homeParams, setAccessToken]);
}