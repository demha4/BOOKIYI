/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BEDS24_PROPERTY_ID?: string;
  readonly VITE_BEDS24_PROXY_URL?: string;
  readonly VITE_BEDS24_LIVE?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}