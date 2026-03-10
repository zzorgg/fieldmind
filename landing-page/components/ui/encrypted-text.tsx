"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
    text: string;
    className?: string;
    /**
     * Time in milliseconds between revealing each subsequent real character.
     * Lower is faster. Defaults to 50ms per character.
     */
    revealDelayMs?: number;
    /** Optional custom character set to use for the gibberish effect. */
    charset?: string;
    /**
     * Time in milliseconds between gibberish flips for unrevealed characters.
     * Lower is more jittery. Defaults to 50ms.
     */
    flipDelayMs?: number;
    /** CSS class for styling the encrypted/scrambled characters */
    encryptedClassName?: string;
    /** CSS class for styling the revealed characters */
    revealedClassName?: string;
    /** Repeats the reveal animation while the text is in view. */
    loop?: boolean;
    /** Delay in milliseconds before restarting the loop. */
    loopDelayMs?: number;
};

const DEFAULT_CHARSET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
    const index = Math.floor(Math.random() * charset.length);
    return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
    original: string,
    charset: string,
): string {
    if (!original) return "";
    let result = "";
    for (let i = 0; i < original.length; i += 1) {
        const ch = original[i];
        result += ch === " " ? " " : generateRandomCharacter(charset);
    }
    return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
    text,
    className,
    revealDelayMs = 50,
    charset = DEFAULT_CHARSET,
    flipDelayMs = 50,
    encryptedClassName,
    revealedClassName,
    loop = false,
    loopDelayMs = 3000,
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    const [hasMounted, setHasMounted] = useState(false);
    const [revealCount, setRevealCount] = useState<number>(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const lastFlipTimeRef = useRef<number>(0);
    const cycleRef = useRef<number>(0);
    const scrambleCharsRef = useRef<string[]>(
        text ? generateGibberishPreservingSpaces(text, charset).split("") : [],
    );

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted || !isInView) return;

        // Reset state for a fresh animation whenever dependencies change
        const initial = text
            ? generateGibberishPreservingSpaces(text, charset)
            : "";
        scrambleCharsRef.current = initial.split("");
        startTimeRef.current = performance.now();
        lastFlipTimeRef.current = startTimeRef.current;
        cycleRef.current = 0;
        setRevealCount(0);

        let isCancelled = false;

        const update = (now: number) => {
            if (isCancelled) return;

            const totalLength = text.length;
            const revealStepMs = Math.max(1, revealDelayMs);
            const totalRevealMs = totalLength * revealStepMs;
            const cycleDurationMs = totalRevealMs + Math.max(0, loopDelayMs);
            const elapsedMs = now - startTimeRef.current;

            let currentRevealCount = 0;

            if (loop) {
                const currentCycle = Math.floor(elapsedMs / Math.max(1, cycleDurationMs));

                if (currentCycle !== cycleRef.current) {
                    cycleRef.current = currentCycle;
                    scrambleCharsRef.current = generateGibberishPreservingSpaces(text, charset).split("");
                    lastFlipTimeRef.current = now;
                }

                const elapsedInCycle = elapsedMs % Math.max(1, cycleDurationMs);
                currentRevealCount = Math.min(
                    totalLength,
                    Math.floor(elapsedInCycle / revealStepMs),
                );
            } else {
                currentRevealCount = Math.min(
                    totalLength,
                    Math.floor(elapsedMs / revealStepMs),
                );
            }

            setRevealCount(currentRevealCount);

            if (!loop && currentRevealCount >= totalLength) {
                return;
            }

            // Re-randomize unrevealed scramble characters on an interval
            const timeSinceLastFlip = now - lastFlipTimeRef.current;
            if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
                for (let index = 0; index < totalLength; index += 1) {
                    if (index >= currentRevealCount) {
                        if (text[index] !== " ") {
                            scrambleCharsRef.current[index] =
                                generateRandomCharacter(charset);
                        } else {
                            scrambleCharsRef.current[index] = " ";
                        }
                    }
                }
                lastFlipTimeRef.current = now;
            }

            animationFrameRef.current = requestAnimationFrame(update);
        };

        animationFrameRef.current = requestAnimationFrame(update);

        return () => {
            isCancelled = true;
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [hasMounted, isInView, text, revealDelayMs, charset, flipDelayMs, loop, loopDelayMs]);

    if (!text) return null;

    const shouldAnimate = hasMounted && isInView;

    return (
        <motion.span
            ref={ref}
            className={cn(className)}
            aria-label={text}
            role="text"
        >
            {text.split("").map((char, index) => {
                const isRevealed = !shouldAnimate || index < revealCount;
                const displayChar = isRevealed
                    ? char
                    : char === " "
                        ? " "
                        : (scrambleCharsRef.current[index] ??
                            generateRandomCharacter(charset));

                return (
                    <span
                        key={index}
                        className={cn(isRevealed ? revealedClassName : encryptedClassName)}
                    >
                        {displayChar}
                    </span>
                );
            })}
        </motion.span>
    );
};
