import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Icon } from "./Icons";
import {
  clearStoredImage,
  fileToDataUrl,
  readStoredImage,
  writeStoredImage,
} from "../lib/imageStore";

type Props = {
  id: string;
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: "overlay" | "badge" | "card";
};

/** Per-photo replacement only; there is no global site editor or settings panel. */
export default function EditableImage({
  id,
  src,
  alt,
  className,
  imgClassName,
  variant = "card",
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState(() => readStoredImage(id) ?? src);
  const [overridden, setOverridden] = useState(() => readStoredImage(id) !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncImage = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string; src: string | null }>).detail;
      if (!detail || detail.id !== id) return;
      setCurrent(detail.src ?? src);
      setOverridden(detail.src !== null);
    };
    window.addEventListener("abujashortlets:image-updated", syncImage);
    return () => window.removeEventListener("abujashortlets:image-updated", syncImage);
  }, [id, src]);

  useEffect(() => {
    const stored = readStoredImage(id);
    setCurrent(stored ?? src);
    setOverridden(stored !== null);
  }, [id, src]);

  const pickPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      writeStoredImage(id, dataUrl);
      setCurrent(dataUrl);
      setOverridden(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not load that image.");
    }
  };

  const restorePhoto = () => {
    clearStoredImage(id);
    setCurrent(src);
    setOverridden(false);
    setError(null);
  };

  const photoControl = (
    <div className="absolute right-2 top-2 flex items-center gap-1.5">
      {overridden && (
        <button
          type="button"
          onClick={restorePhoto}
          aria-label="Restore original photo"
          title="Restore original photo"
          className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-forest shadow-md backdrop-blur transition-transform hover:scale-105"
        >
          <Icon name="close" className="h-3.5 w-3.5" />
        </button>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Change photo"
        title="Choose a replacement photo from your files"
        className="inline-flex h-8 items-center gap-1.5 rounded-full bg-forest/95 px-2.5 text-[9.5px] font-bold text-white shadow-md backdrop-blur transition-colors hover:bg-forest-deep"
      >
        <Icon name="sparkles" className="h-3 w-3" />
        Change photo
      </button>
    </div>
  );

  if (variant === "badge") {
    return (
      <div className={cn("relative", className)}>
        <img src={current} alt={alt} className={imgClassName} />
        {photoControl}
        <input ref={inputRef} id={inputId} type="file" accept="image/*" onChange={pickPhoto} className="sr-only" />
        {error && <p role="alert" className="absolute bottom-2 left-2 rounded-full bg-forest-deep/90 px-2.5 py-1 text-[9px] font-semibold text-white">{error}</p>}
      </div>
    );
  }

  return (
    <div className={cn("group relative h-full w-full", className)}>
      <img src={current} alt={alt} className={imgClassName} />
      {photoControl}
      {overridden && (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-forest-deep/75 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-cream">
          Photo updated
        </span>
      )}
      <input ref={inputRef} id={inputId} type="file" accept="image/*" onChange={pickPhoto} className="sr-only" />
      {error && <p role="alert" className="absolute bottom-2 left-2 rounded-full bg-forest-deep/90 px-2.5 py-1 text-[9px] font-semibold text-white">{error}</p>}
    </div>
  );
}
