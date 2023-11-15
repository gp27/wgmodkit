declare module 'tauri-plugin-store-api' {
  export class Store<T extends Record<string, any>> {
    constructor(filename: string)
    get<K extends keyof T>(key: K): Promise<T[K] | undefined>
    set<K extends keyof T>(key: K, value: T[K]): Promise<void>
    load(): Promise<void>
    save(): Promise<void>
  }
}
