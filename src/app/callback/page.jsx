'use client'
import {redirect, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import useAuthStore from "@/lib/authStore";
import useUserStore from "@/lib/useUserStore";
import Router from 'next/router';

export default function Page() {
  const homeParams = useSearchParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [loading, setLoading] = useState(true);

  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  const fetchDataUser = async () => {
    if (accessToken === null){
      return
    }
    try {
      let responseUser = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/info`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      let dataUser = await responseUser.json();
      console.log('API Response:', dataUser); // Debug response
      if (dataUser.data) {
        setUserProfile(dataUser.data);
      } else {
        console.error('User data not found in response', dataUser);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken !== null) {
      fetchDataUser()
      if (!userProfile || Object.keys(userProfile).length === 0) {
         return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`);
      } else {
        return  redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
      }
    }
  }, [accessToken, userProfile])

  useEffect(() => {
    const token = homeParams.get('token');
    if (token) {
      setAccessToken(token);
    }
  }, [homeParams, setAccessToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

}