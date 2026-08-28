import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

function OrbitingSatellites() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  const satellites = [
    {
      label: "UI/UX & Frontend Developer",
      angle: 0,
      radius: 2.3,
      yOffset: 0.8,
    },
    {
      label: "Creative Writer",
      angle: (2 * Math.PI) / 3,
      radius: 2.5,
      yOffset: -0.2,
    },
    {
      label: "AI Learner",
      angle: (4 * Math.PI) / 3,
      radius: 2.3,
      yOffset: -0.8,
    },
  ];

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => {
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;

        return (
          <group key={i} position={[x, sat.yOffset, z]}>
            {/* Small glowing dot */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#555555" />
            </mesh>

            {/* HTML Label */}
            <Html
              center
              distanceFactor={8}
              style={{
                transition: "all 0.3s",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              <div className="px-3 py-1 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-full shadow-md text-[11px] font-medium text-neutral-700 tracking-wider">
                {sat.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function ImageCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  /*
   * Six images for the six sides of the cube.
   *
   * BoxGeometry material order:
   * 0 = right
   * 1 = left
   * 2 = top
   * 3 = bottom
   * 4 = front
   * 5 = back
   */
  const textures = useTexture([
    "/right.png",
    "/left.png",
    "/top.png",
    "/bottom.png",
    "/front.png",
    "/back.png",
  ]);

  useEffect(() => {
    /*
     * Improve image quality and brightness.
     */
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handler);

    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      t * 0.15 + mouse.y * 0.3,
      0.05
    );

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      t * 0.2 + mouse.x * 0.3,
      0.05
    );

    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  const size = viewport.width < 6 ? 1.2 : 1.6;

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[size, size, size]} />

        {textures.map((texture, index) => (
          <meshStandardMaterial
            key={index}
            attach={`material-${index}`}
            map={texture}
            metalness={0.05}
            roughness={0.3}
            envMapIntensity={1.2}
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={0.5}
          />
        ))}
      </mesh>
    </Float>
  );
}

export default function CubeHero() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");

      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl");

      if (!gl) {
        setError(true);
      }
    } catch {
      setError(true);
    }

    setMounted(true);
  }, []);

  if (!mounted || error) {
    return <CubeFallback />;
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[450px]">
      <Canvas
        shadows
        camera={{
          position: [0, 0, 5.5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{
          background: "transparent",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />

          <directionalLight
            position={[-3, 3, -3]}
            intensity={0.3}
            color="#e8e4df"
          />

          <pointLight
            position={[0, 4, 2]}
            intensity={0.3}
            color="#f5f0eb"
          />

          {/* Six-sided image cube */}
          <ImageCube />

          {/* Orbiting labels */}
          <OrbitingSatellites />

          {/* Shadow plane */}
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2.2, 0]}
          >
            <planeGeometry args={[10, 10]} />

            <shadowMaterial
              transparent
              opacity={0.05}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}

function CubeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, #555 0%, #777 40%, #666 60%, #555 100%)",

            boxShadow:
              "0 25px 50px rgba(0,0,0,0.12), 0 0 40px rgba(0,0,0,0.04)",
          }}
        />
      </div>
    </div>
  );
}