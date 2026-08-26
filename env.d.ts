/// <reference types="vite/client" />
interface Window {
  APP_CONFIG: {
    dcsUrl: string
  }
  WxLogin?: new (options: Record<string, unknown>) => unknown
}
