import { Tileset } from '../types/tileset';

export function getImage(selected: Tileset | undefined): HTMLImageElement | null {
  if (!selected || !selected.image) return null;
  const img = new Image();
  img.src = selected.image.url;
  return img;
}