'use client'
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Auth(props)
{
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
    async function checkUser() {
      //Track user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) 
      {
        router.push('/login'); 
      }
      else 
      {
        setUser(user); 
        props.userHandler(user);
      }
    }
    checkUser();
  }, [router]);
}