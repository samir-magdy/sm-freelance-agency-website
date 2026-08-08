"use client";

import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

interface LightRaysProps {
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
  onReady?: () => void;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

type RaysOrigin = "right" | "left";

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number,
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "left":
      return { anchor: [-outside * w, 0.6 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.6 * h], dir: [-1, 0] };
  }
};

// Renderer strings that mean WebGL is being emulated on the CPU (no GPU).
// Headless Chrome — which PageSpeed Insights / Lighthouse runs — reports
// SwiftShader; GPU-less Linux reports llvmpipe/softpipe; Windows over RDP
// reports "Microsoft Basic Render Driver". Rasterizing a full-screen
// fragment shader in software blocks the main-thread pipeline for seconds,
// so on these renderers the effect is skipped entirely.
const SOFTWARE_GL = /swiftshader|llvmpipe|softpipe|software|basic render/i;

// How close (in normalized viewport coords) the smoothed mouse position must
// get to the raw position before the settle loop stops (~0.5px at 1280w).
const MOUSE_SETTLE_EPS = 0.0004;

type Uniforms = {
  iTime: { value: number };
  iResolution: { value: [number, number] };
  rayPosA: { value: [number, number] };
  rayDirA: { value: [number, number] };
  rayPosB: { value: [number, number] };
  rayDirB: { value: [number, number] };
  raysColor: { value: [number, number, number] };
  raysSpeed: { value: number };
  lightSpread: { value: number };
  rayLength: { value: number };
  pulsating: { value: number };
  fadeDistance: { value: number };
  saturation: { value: number };
  mousePos: { value: [number, number] };
  mouseInfluence: { value: number };
  noiseAmount: { value: number };
  distortion: { value: number };
};

/**
 * Draws BOTH ray bundles (right + left origin) in a single canvas / single
 * shader pass. Previously this component drew one origin per instance and
 * LightRaysBackground stacked two of them, doubling contexts, shader
 * compiles, and per-frame fill.
 */
export default function LightRays({
  raysColor = "#fff1d1",
  raysSpeed = 0,
  lightSpread = 0.05,
  rayLength = 6,
  pulsating = false,
  fadeDistance = 10,
  saturation = 0.6,
  followMouse = true,
  mouseInfluence = 0.4,
  noiseAmount = 0.1,
  distortion = 0.0,
  className = "",
  onReady,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const scheduleTickRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasCalledReadyRef = useRef(false);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    // Continuous 60fps rendering is only needed when a time-driven prop is
    // active. With the defaults (speed 0, no pulse, no distortion) the image
    // is static, so frames are rendered on demand: once at init, on resize,
    // and while the mouse-follow easing settles after pointer movement.
    const isAnimated = raysSpeed > 0 || pulsating || distortion > 0;

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise((resolve) => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      // dpr locked to 1: this is a soft, blurred glow — supersampling it
      // for retina displays is visually indistinguishable but quadruples
      // the pixels shaded per frame.
      const renderer = new Renderer({ dpr: 1, alpha: true });
      const gl = renderer.gl;

      // No GPU → skip the effect. The page simply renders without the glow.
      const dbgInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const glRendererName = dbgInfo
        ? String(gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL))
        : "";
      if (SOFTWARE_GL.test(glRendererName)) {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        if (!hasCalledReadyRef.current) {
          hasCalledReadyRef.current = true;
          onReadyRef.current?.(); // unblock the parent's fade-in logic
        }
        return;
      }

      rendererRef.current = renderer;

      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPosA;
uniform vec2  rayDirA;
uniform vec2  rayPosB;
uniform vec2  rayDirB;

uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

// One full ray bundle (the pair of overlapping strengths the old shader
// computed) emitted from a single origin.
vec4 rayBundle(vec2 rayPos, vec2 rayDir, vec2 coord) {
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  return rays1 * 0.5 + rays2 * 0.4;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec4 bundleA = rayBundle(rayPosA, rayDirA, coord);
  vec4 bundleB = rayBundle(rayPosB, rayDirB, coord);

  // Screen-blend the two bundles in-shader — replaces the old second
  // canvas that was composited via the parent's mix-blend-screen.
  fragColor = 1.0 - (1.0 - bundleA) * (1.0 - bundleB);

  if (noiseAmount > 0.0) {
    // Static spatial grain. iTime was removed from this term so a rendered
    // frame is genuinely still — required for on-demand rendering.
    float n = noise(coord * 0.01);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

      const uniforms: Uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },

        rayPosA: { value: [0, 0] },
        rayDirA: { value: [0, 1] },
        rayPosB: { value: [0, 0] },
        rayDirB: { value: [0, 1] },

        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !rendererRef.current) return;

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        rendererRef.current.setSize(wCSS, hCSS);

        const dpr = rendererRef.current.dpr; // locked to 1
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];

        const a = getAnchorAndDir("right", w, h);
        const b = getAnchorAndDir("left", w, h);
        uniforms.rayPosA.value = a.anchor;
        uniforms.rayDirA.value = a.dir;
        uniforms.rayPosB.value = b.anchor;
        uniforms.rayDirB.value = b.dir;
      };

      const tick = (timestampMs: number) => {
        animationIdRef.current = null;
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        uniforms.iTime.value = timestampMs * 0.001;

        let mouseSettling = false;
        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92;
          const s = smoothMouseRef.current;
          const m = mouseRef.current;

          s.x = s.x * smoothing + m.x * (1 - smoothing);
          s.y = s.y * smoothing + m.y * (1 - smoothing);
          uniforms.mousePos.value = [s.x, s.y];

          mouseSettling =
            Math.abs(s.x - m.x) > MOUSE_SETTLE_EPS ||
            Math.abs(s.y - m.y) > MOUSE_SETTLE_EPS;
        }

        try {
          rendererRef.current.render({ scene: meshRef.current });
          if (!hasCalledReadyRef.current) {
            hasCalledReadyRef.current = true;
            onReadyRef.current?.();
          }
        } catch (error) {
          console.warn("WebGL rendering error:", error);
          return;
        }

        // Keep looping only while something can still change on screen:
        // a time-driven animation prop, or the mouse easing mid-settle.
        if (isAnimated || mouseSettling) {
          animationIdRef.current = requestAnimationFrame(tick);
        }
      };

      const scheduleTick = () => {
        if (animationIdRef.current === null) {
          animationIdRef.current = requestAnimationFrame(tick);
        }
      };
      scheduleTickRef.current = scheduleTick;

      const handleResize = () => {
        updatePlacement();
        scheduleTick();
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
        scheduleTick(); // (re)start the settle loop toward the new target
      };

      window.addEventListener("resize", handleResize);
      if (followMouse && mouseInfluence > 0.0) {
        window.addEventListener("mousemove", handleMouseMove, {
          passive: true,
        });
      }

      updatePlacement();
      scheduleTick(); // first frame (also fires onReady)

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        scheduleTickRef.current = null;

        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);

        if (rendererRef.current) {
          try {
            const canvas = rendererRef.current.gl.canvas;
            rendererRef.current.gl
              .getExtension("WEBGL_lose_context")
              ?.loseContext();

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn("Error during WebGL cleanup:", error);
          }
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [
    isVisible,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current)
      return;

    const u = uniformsRef.current;
    const renderer = rendererRef.current;

    u.raysColor.value = hexToRgb(raysColor);
    u.raysSpeed.value = raysSpeed;
    u.lightSpread.value = lightSpread;
    u.rayLength.value = rayLength;
    u.pulsating.value = pulsating ? 1.0 : 0.0;
    u.fadeDistance.value = fadeDistance;
    u.saturation.value = saturation;
    u.mouseInfluence.value = mouseInfluence;
    u.noiseAmount.value = noiseAmount;
    u.distortion.value = distortion;

    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = renderer.dpr;
    const a = getAnchorAndDir("right", wCSS * dpr, hCSS * dpr);
    const b = getAnchorAndDir("left", wCSS * dpr, hCSS * dpr);
    u.rayPosA.value = a.anchor;
    u.rayDirA.value = a.dir;
    u.rayPosB.value = b.anchor;
    u.rayDirB.value = b.dir;

    scheduleTickRef.current?.(); // repaint with the new values
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container absolute inset-0 ${className}`.trim()}
    />
  );
}
