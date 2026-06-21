"use client";
import { useEffect, useRef } from "react";

interface EffectsProps {}

export default function Effects(props: EffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cosmic axis rotation configuration
    let globalRotation = 0;
    const rotationSpeed = 0.00025; // Gentle, cinematic earth-rotation speed

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- 1. RICH BLUE NEBULA CORE GENERATION ---
    // Stacking hundreds of soft, translucent color nodes to form a rich textured galaxy spine
    const nebulaParticles: {
      x: number;
      y: number;
      size: number;
      hue: number;
      lightness: number;
      alpha: number;
    }[] = [];
    const numNebulaNodes = 550; // Increased density for a richer, less transparent cloud look

    for (let i = 0; i < numNebulaNodes; i++) {
      const progress = i / numNebulaNodes - 0.5;
      const baseDistance = progress * (Math.max(width, height) * 1.8);

      // Dispersion variance to mold a realistic, irregular spiral arm shape
      const spreadX = (Math.random() - 0.5) * 400;
      const spreadY = (Math.random() - 0.5) * 300;

      // Layered Blue Palette Logic:
      let hue = 210; // Default Deep Galactic Blue
      let lightness = 50;
      const dice = Math.random();

      if (dice < 0.4) {
        hue = Math.floor(Math.random() * 20) + 190; // Electric Cyan / Ice Blue accents
        lightness = 60;
      } else if (dice < 0.75) {
        hue = Math.floor(Math.random() * 20) + 220; // Deep Royal / Midnight Blue layers
        lightness = 40;
      } else {
        hue = Math.floor(Math.random() * 25) + 255; // Cosmic Violet / Indigo fringes for contrast depth
        lightness = 45;
      }

      nebulaParticles.push({
        x: baseDistance + spreadX,
        y: baseDistance * 0.35 + spreadY, // Tilted geometric cluster axis
        size: Math.random() * 140 + 70, // Generous cloud brush scales
        hue: hue,
        lightness: lightness,
        alpha: Math.random() * 0.025 + 0.008, // Micro-opacities stack smoothly without clipping edges
      });
    }

    // --- 2. HIGH DENSITY ICE-BLUE STARFIELD ---
    const maxStars = 450; // Massive pinpoint field mimicking the video capture
    const stars: Star[] = [];

    class Star {
      x: number;
      y: number;
      size: number;
      hue: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;

      constructor() {
        // Spawn across a massive perimeter so rotating edges don't expose empty black canvas
        const spawnRadius = Math.max(width, height) * 1.6;
        this.x = (Math.random() - 0.5) * spawnRadius;
        this.y = (Math.random() - 0.5) * spawnRadius;

        this.size = Math.random() * 1.4 + 0.2; // Tiny realistic stellar pinpoints
        this.baseAlpha = Math.random() * 0.6 + 0.3;
        this.twinkleSpeed = Math.random() * 0.04 + 0.008;
        this.twinklePhase = Math.random() * Math.PI * 2;

        // Ice blue (85%) fading into brilliant diamond white (15%)
        this.hue =
          Math.random() < 0.85 ? Math.floor(Math.random() * 20) + 200 : 180;
      }

      draw(context: CanvasRenderingContext2D) {
        this.twinklePhase += this.twinkleSpeed;
        const currentAlpha =
          this.baseAlpha + Math.sin(this.twinklePhase) * 0.25;

        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Kept saturation at 100% and lightness high (85%+) for that bright neon pop over the dark background
        context.fillStyle = `hsla(${this.hue}, 100%, 88%, ${Math.max(
          0.1,
          Math.min(currentAlpha, 1)
        )})`;
        context.fill();

        // Delicate atmosphere bloom surrounding the major anchor stars
        if (this.size > 1.1) {
          context.beginPath();
          context.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
          context.fillStyle = `hsla(${this.hue}, 100%, 70%, ${
            currentAlpha * 0.15
          })`;
          context.fill();
        }
      }
    }

    // Populate the galaxy
    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star());
    }

    // --- Animation Loop ---
    const render = () => {
      // Background base: Pitch dark space void
      ctx.fillStyle = "#030509";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      // Shift origin focus center down slightly to mimic looking up toward a horizon dome
      ctx.translate(width / 2, height * 0.65);
      globalRotation += rotationSpeed;
      ctx.rotate(globalRotation);

      // 1. Render the Textured Nebula Cloud Spine
      nebulaParticles.forEach((particle) => {
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(
          0,
          `hsla(${particle.hue}, 100%, ${particle.lightness}%, ${particle.alpha})`
        );
        gradient.addColorStop(
          0.4,
          `hsla(${particle.hue}, 90%, ${particle.lightness - 10}%, ${
            particle.alpha * 0.5
          })`
        );
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Overlay the Interstellar Star Layer
      stars.forEach((star) => {
        star.draw(ctx);
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#030509",
        display: "block",
      }}
    />
  );
}
