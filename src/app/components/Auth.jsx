'use client'
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

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

        if(props.userHandler) props.userHandler(user);
      }
    }
    checkUser();

    supabase.auth.onAuthStateChange((event, session) => {
      switch(event){
        case "SIGNED_OUT":
          router.push('/login'); 
          break;
        case "SIGNED_IN":
          router.push('/');
          break;
      }
    });

  }, [router]);

  const logout = () => {
    supabase.auth.signOut();
  };

  return(
    <Button onClick={logout} className='sticky-bottom' variant="danger">Logout</Button>
  );
}