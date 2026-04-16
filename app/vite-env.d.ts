/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_DOCTORS_URL: string
  readonly VITE_API_PATIENTS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
