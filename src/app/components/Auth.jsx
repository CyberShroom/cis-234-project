'use client'
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Auth()
{
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push('/login');
      else setUser(user);
    }
    checkUser();
  }, [router]);
}