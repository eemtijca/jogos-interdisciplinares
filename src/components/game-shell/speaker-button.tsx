"use client";

/**
 * SpeakerButton: botão de leitura em voz alta.
 * Lê o texto indicado, realça o elemento de origem durante a leitura e
 * alterna o próprio rótulo entre "Ouvir" e "Parar".
 * A aparência vem do className recebido (padrão: botão claro pequeno).
 */

import { Volume2, Square } from "lucide-react";
import { speak } from "@/lib/speech";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SpeakerButton({
  text,
  highlight,
  /** Alternativa ao ref: id do elemento a realçar. */
  highlightId,
  label = "Ouvir",
  className = "ludus-btn ludus-btn-paper ludus-btn-sm",
}: {
  text: string;
  /** Ref do elemento a realçar durante a leitura. */
  highlight?: React.RefObject<HTMLElement | null>;
  highlightId?: string;
  label?: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const cancelReading = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      cancelReading.current?.();
      cancelReading.current = null;
    };
  }, [text]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (active) {
      cancelReading.current?.();
      setActive(false);
      return;
    }
    const el = highlight?.current ?? (highlightId ? document.getElementById(highlightId) : null);
    setActive(true);
    cancelReading.current = speak(text, {
      highlight: el,
      onEnd: () => setActive(false),
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("shrink-0", className)}
      aria-label={active ? "Parar leitura em voz alta" : `${label} este texto em voz alta`}
      aria-pressed={active}
    >
      {active ? (
        <Square className="size-4" strokeWidth={2.6} aria-hidden />
      ) : (
        <Volume2 className="size-4" strokeWidth={2.4} aria-hidden />
      )}
      <span>{active ? "Parar" : label}</span>
    </button>
  );
}
