import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";

export default function allgames() {
  const [level, setlevel] = useState(0);
  const router = useRouter();

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <section className="w-full h-screen relative">
      <img
        src="/bg2.jpg"
        className="object-cover w-full h-full"
        alt="Image alt text"
      />
      {/* flag  */}
      <div className="absolute bottom-5 right-20">
        <img src="/download-removebg-preview (1).png"></img>
      </div>

      {/* pumkin 1  */}
      <div className="absolute bottom-32 left-56 ">
        {!(level >= 1) && (
          <img
            src="/download__1_-removebg-preview.png"
            onClick={() => {
              router.push("/games/game1");
            }}
          ></img>
        )}
        {level >= 1 && <img src="/images-removebg-preview.png"></img>}
      </div>

      {/* pumkin 2  */}
      <div className="absolute bottom-56 right-2/4">
        {!(level >= 2) && (
          <img
            src="/download__1_-removebg-preview.png"
            onClick={() => {
              router.push("/games/game2");
            }}
          ></img>
        )}
        {level >= 2 && <img src="/images-removebg-preview.png"></img>}
      </div>

      {/* pumkin 3  */}
      <div className="absolute bottom-32 right-96">
        {!(level >= 3) && (
          <img
            src="/download__1_-removebg-preview.png"
            onClick={() => {
              router.push("/games/game3");
            }}
          ></img>
        )}
        {level >= 3 && <img src="/images-removebg-preview.png"></img>}
      </div>

      {/* bull  */}
      {level == 0 && (
        <div className="absolute bottom-12 left-72 ">
          <img
            src="/329-3299759_black-and-white-download-deer-hunter-silhouette-at-animal-hunters-clip-art-removebg-preview.png"
            width={150}
          ></img>
        </div>
      )}
      {level == 1 && (
        <div className="absolute bottom-28 right-2/4 ">
          <img
            src="/329-3299759_black-and-white-download-deer-hunter-silhouette-at-animal-hunters-clip-art-removebg-preview.png"
            width={150}
          ></img>
        </div>
      )}
      {level == 2 && (
        <div className="absolute bottom-12 right-96 ">
          <img
            src="/329-3299759_black-and-white-download-deer-hunter-silhouette-at-animal-hunters-clip-art-removebg-preview.png"
            width={150}
          ></img>
        </div>
      )}
      {level == 3 && (
        <div className="absolute bottom-8 right-20 ">
          <img
            src="/329-3299759_black-and-white-download-deer-hunter-silhouette-at-animal-hunters-clip-art-removebg-preview.png"
            width={150}
          ></img>
        </div>
      )}

      {level == 3 && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "none",
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                  speed: 3,
                },
                push: {
                  quantity: 2,
                },
              },
            },
            particles: {
              color: {
                value: ["#FD1C03", "#05FDFE", "#FFFFFF", "#0F22FB", "#FB0F8F"],
              },
              links: {
                color: {
                  value: "#FFFFFF",
                },
                distance: 200,
                opacity: 0.5,
                width: 1,
              },
              move: {
                attract: {
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                enable: true,
                outModes: {
                  default: "destroy",
                },
                speed: 6,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 100,
              },
              opacity: {
                value: 0.5,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 6,
                anim: {
                  enable: true,
                  speed: 4,
                  size_min: 0.3,
                  sync: false,
                },
              },
            },
            detectRetina: true,
            emitters: {
              direction: "none",
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.1,
              },
              rate: {
                delay: 0.05,
                quantity: 30,
              },
              size: {
                width: 0,
                height: 0,
              },
              position: {
                x: 50,
                y: 50,
              },
            },
          }}
        />
      )}
    </section>
  );
}
