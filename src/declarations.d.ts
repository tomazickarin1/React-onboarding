interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.scss" {
  const styles: Record<string, string>;
  export default styles;
}
