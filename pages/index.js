import { useEffect } from "react";
import styles from "../styles/home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
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
          <p className="">
            Kickstart your career in BioPharma with the Mendeleev Institute
            right now
          </p>
          <button
            onClick={() => {
              router.push("/allgames");
            }}
            class="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded text-xl"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}
