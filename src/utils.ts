export function makeImagePath(id: string, format?: string) {
  const baseImage = `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }/${id}`;
  const subImage = "https://dummyimage.com/400x400/cccccc/000000&text=No+Image";
  return id === null ? subImage : baseImage;
}
