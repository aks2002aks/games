import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [IsAdmin, setIsAdmin] = useState(false);
  const checkadmin = async () => {
    const token = localStorage.getItem("token");

    let res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    let response = await res.json();
    setIsAdmin(response.admin);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    checkadmin();
  }, []);

  return (
    <>
      <div
        className={styles.mybody}
        style={{
          backgroundImage: `url('${"https://img.freepik.com/premium-photo/halloween-pumpkins-scary-cemetery-realistic-halloween-festival-illustration_28952-519.jpg"}')`,
        }}
      >
        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center text-white">
          <h2 className="text-5xl mb-3 ">SKILLOWEEN</h2>
          <p className="">Test Your Limits</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                router.push("/allgames");
              }}
              className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded text-xl"
            >
              Start
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded text-xl"
            >
              Logout
            </button>
            {IsAdmin && (
              <button
                onClick={() => {
                  router.push("/admin");
                }}
                className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded text-xl"
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
