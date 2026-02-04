"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
}

interface TwinklingStarsProps {
    isActive: boolean;
}

export default function TwinklingStars({ isActive }: TwinklingStarsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Initialize stars
        const initStars = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const starCount = Math.floor((width * height) / 10000); // Responsive density
            const stars: Star[] = [];

            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2 + 1, // 1px to 3px (Larger)
                    opacity: Math.random(),
                    speed: Math.random() * 0.02 + 0.005, // Random twinkle speed
                });
            }
            starsRef.current = stars;
        };

        const handleResize = () => {
            initStars();
        };

        window.addEventListener("resize", handleResize);
        initStars();

        const render = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((star) => {
                // Twinkle logic: oscillate opacity
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.speed = -star.speed;
                }

                // Clamp opacity for safety
                const visibleOpacity = Math.max(0, Math.min(1, star.opacity));

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${visibleOpacity})`; // Full opacity brightness
                ctx.fill();
            });

            animationFrameId.current = requestAnimationFrame(render);
        };

        // Only animate if active to save resources
        if (isActive) {
            render();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear if inactive
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [isActive]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none -z-[1] transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"
                }`}
        />
    );
}
