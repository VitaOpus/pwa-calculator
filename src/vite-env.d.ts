/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALCULATOR_SERVICE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
