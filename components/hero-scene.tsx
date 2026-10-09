"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, Line, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */

const CYAN = "#4ec9ff";
const GREEN = "#3fb950";
const BLUE = "#4f8dff";
const DIM = "#42749a";
const HOT = "#c9f2ff";

/* Shared pointer state (normalised -0.5 .. 0.5) driven by the window. */
const pointer = { x: 0, y: 0 };

/* ------------------------------------------------------------------ */
/*  Stations                                                           */
/* ------------------------------------------------------------------ */

function DataStation() {
  const stack = [-0.78, -0.26, 0.26, 0.78];
  return (
    <group>
      {stack.map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.36, 18, 1, false]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.05} depthWrite={false} />
          <Edges threshold={14} color={i === 1 ? HOT : CYAN} />
        </mesh>
      ))}
      <Sparkles count={18} scale={2.4} size={1.8} speed={0.25} color={CYAN} opacity={0.6} />
    </group>
  );
}

function ModelStation() {
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shell.current) {
      shell.current.rotation.x = t * 0.22;
      shell.current.rotation.y = t * 0.3;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.7) * 0.09;
      core.current.scale.setScalar(s);
      core.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.55} depthWrite={false} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.66, 1]} />
        <meshBasicMaterial
          color={HOT}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color={CYAN} intensity={3.4} distance={7} />
      <Sparkles count={46} scale={3} size={2.6} speed={0.45} color={CYAN} opacity={0.85} />
    </group>
  );
}

function AgentStation() {
  const orbit = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 1.55, Math.sin(a * 2) * 0.6, Math.sin(a) * 1.55] as [
            number,
            number,
            number,
          ],
          color: i % 2 === 0 ? GREEN : CYAN,
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (orbit.current) orbit.current.rotation.y = clock.getElapsedTime() * 0.42;
  });

  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.9} depthWrite={false} />
      </mesh>
      <pointLight color={GREEN} intensity={2.6} distance={6} />
      <group ref={orbit}>
        {nodes.map((n, i) => (
          <group key={i}>
            <mesh position={n.pos}>
              <sphereGeometry args={[0.15, 14, 14]} />
              <meshBasicMaterial color={n.color} />
            </mesh>
            <Line
              points={[
                [0, 0, 0],
                n.pos,
              ]}
              color={DIM}
              lineWidth={1}
              transparent
              opacity={0.75}
            />
          </group>
        ))}
      </group>
      <Sparkles count={30} scale={3.4} size={2} speed={0.35} color={GREEN} opacity={0.7} />
    </group>
  );
}

function DeployStation() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ring.current) {
      ring.current.rotation.z = clock.getElapsedTime() * 0.24;
      ring.current.rotation.x = Math.PI / 2.6;
    }
  });

  return (
    <group>
      <mesh>
        <boxGeometry args={[1.95, 1.95, 1.95]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.6} depthWrite={false} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.55, 0.028, 8, 56]} />
        <meshBasicMaterial color={HOT} transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <pointLight color={BLUE} intensity={3} distance={7} />
      <Sparkles count={40} scale={3.4} size={2.2} speed={0.3} color={BLUE} opacity={0.7} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Connector with a travelling energy pulse                           */
/* ------------------------------------------------------------------ */

function Connector({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const dot = useRef<THREE.Mesh>(null);
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);

  useFrame(({ clock }) => {
    if (!dot.current) return;
    const t = (clock.getElapsedTime() * 0.32 + (from[0] + 6) * 0.08) % 1;
    dot.current.position.lerpVectors(a, b, t);
    dot.current.scale.setScalar(0.1 + Math.sin(t * Math.PI) * 0.06);
  });

  return (
    <group>
      <Line
        points={[from, to]}
        color={DIM}
        lineWidth={1.4}
        dashed
        dashSize={0.24}
        gapSize={0.16}
        dashScale={1}
        transparent
        opacity={0.85}
      />
      <mesh ref={dot}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={HOT} transparent opacity={0.95} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Labels                                                              */
/* ------------------------------------------------------------------ */

const STATIONS: Array<{ x: number; label: string; items: string[] }> = [
  { x: -5.1, label: "YOUR DATA", items: ["text", "documents", "logs", "apis"] },
  { x: -1.7, label: "CUSTOM MODELS", items: ["domain specific", "higher accuracy"] },
  { x: 1.7, label: "AGENTIC SYSTEMS", items: ["plan", "reason", "take action"] },
  { x: 5.1, label: "DEPLOYMENT", items: ["cloud", "on-prem", "hybrid"] },
];

function StationLabels() {
  return (
    <>
      {STATIONS.map((s) => (
        <Html
          key={s.label}
          position={[s.x, -1.75, 0]}
          center
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="w-[150px] text-center">
            <div className="hx-mono text-[9px] font-semibold tracking-[0.16em] whitespace-nowrap text-[#9fd8ff]">
              {s.label}
            </div>
            <div className="mx-auto mt-1 h-px w-10 bg-[#4ec9ff]/35" />
            <div className="hx-mono mt-1.5 flex flex-col gap-0.5 text-[8.5px] leading-tight tracking-[0.08em] text-[#6f8296]">
              {s.items.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        </Html>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Rig — pointer + scroll parallax                                    */
/* ------------------------------------------------------------------ */

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();

  const narrow = size.width < 760;
  const scale = THREE.MathUtils.clamp(size.width / 1560, 0.4, 0.82);
  const offsetX = narrow ? 0 : 0.75;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const scroll = typeof window === "undefined" ? 0 : window.scrollY;
    const targetY = -0.34 + pointer.x * 0.4;
    const targetX = 0.08 - pointer.y * 0.28;
    const targetZ = -scroll * 0.0016;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetZ, 5, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, offsetX, 3, delta);

    /* subtle camera breathing */
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      pointer.x * 0.7,
      2,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.5 - pointer.y * 0.5,
      2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group
      ref={group}
      scale={scale}
      position={[offsetX, narrow ? -0.6 : 0, 0]}
      rotation={[-0.02, -0.34, 0]}
    >
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function Scene() {
  const xs = STATIONS.map((s) => s.x);

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.55} />
      <Rig>
        {STATIONS.map((s, i) => (
          <group key={s.label} position={[s.x, 0, 0]}>
            {i === 0 && <DataStation />}
            {i === 1 && <ModelStation />}
            {i === 2 && <AgentStation />}
            {i === 3 && <DeployStation />}
          </group>
        ))}

        <Connector from={[xs[0] + 1.35, 0, 0]} to={[xs[1] - 1.6, 0, 0]} />
        <Connector from={[xs[1] + 1.6, 0, 0]} to={[xs[2] - 1.8, 0, 0]} />
        <Connector from={[xs[2] + 1.8, 0, 0]} to={[xs[3] - 1.5, 0, 0]} />

        <StationLabels />
      </Rig>

      <Sparkles count={70} position={[0, 0, -5]} scale={[26, 13, 3]} size={0.9} speed={0.16} color="#6ea9d6" opacity={0.45} />
    </Suspense>
  );
}

/* ------------------------------------------------------------------ */
/*  WebGL guard + export                                               */
/* ------------------------------------------------------------------ */

function supportsWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function HeroScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const frame = requestAnimationFrame(() => setReady(supportsWebGL()));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!ready) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hx-panel hx-ticks hx-mono flex w-[min(90%,560px)] flex-col gap-2 p-6 text-[11px] tracking-[0.1em] text-[#7e8da3]">
          <span className="text-[#4ec9ff]">&gt; pipeline status</span>
          <span>data ── model ── agents ── deployment</span>
          <span className="text-[#3fb950]">all systems nominal ▋</span>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.5, 17], fov: 34 }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
