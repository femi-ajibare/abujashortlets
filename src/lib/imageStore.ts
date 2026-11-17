/**
 * Browser-side image store. Persists per-device image overrides in localStorage
 * so the same browser keeps the uploaded photos between visits.
 *
 * Storage key shape: "abujashortlets:image:<apartmentId>" -> "data:image/...;base64,..."
 * If localStorage isn't available, the in-memory map still works for the session.
 */

const KEY_PREFIX = "abujashortlets:image:";
const memoryFallback = new Map<string, string>();

function hasStorage() {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function readStoredImage(id: string): string | null {
  try {
    if (hasStorage()) {
      const value = window.localStorage.getItem(KEY_PREFIX + id);
      if (value) return value;
    }
  } catch {
    // ignore quota / privacy errors
  }
  return memoryFallback.get(id) ?? null;
}

export function writeStoredImage(id: string, dataUrl: string): void {
  let saved = false;
  try {
    if (hasStorage()) {
      window.localStorage.setItem(KEY_PREFIX + id, dataUrl);
      saved = true;
    }
  } catch {
    // fall through to memory
  }
  if (!saved) memoryFallback.set(id, dataUrl);
  notifyImageChange(id, dataUrl);
}

export function clearStoredImage(id: string): void {
  try {
    if (hasStorage()) {
      window.localStorage.removeItem(KEY_PREFIX + id);
    }
  } catch {
    // ignore
  }
  memoryFallback.delete(id);
  notifyImageChange(id, null);
}

function notifyImageChange(id: string, src: string | null) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("abujashortlets:image-updated", { detail: { id, src } }));
  }
}

export function readAllStoredIds(): string[] {
  try {
    if (!hasStorage()) return Array.from(memoryFallback.keys());
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(KEY_PREFIX)) keys.push(k.slice(KEY_PREFIX.length));
    }
    return keys;
  } catch {
    return Array.from(memoryFallback.keys());
  }
}

/**
 * Reads a File from an <input type=file> and resolves to a compressed data URL.
 * Images are resized so the longest edge is 1600px and saved as JPEG.
 */
export function fileToDataUrl(file: File, maxEdge = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const source = String(reader.result);
      const img = new Image();
      img.onerror = () => resolve(source);
      img.onload = () => {
        const longest = Math.max(img.naturalWidth, img.naturalHeight);
        const scale = longest > maxEdge ? maxEdge / longest : 1;
        const w = Math.round(img.naturalWidth * scale);
        const h = Math.round(img.naturalHeight * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(source);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch {
          resolve(source);
        }
      };
      img.src = source;
    };
    reader.readAsDataURL(file);
  });
}
