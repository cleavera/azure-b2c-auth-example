export class StorageService {
    private _storage: Storage;

    constructor(storage: Storage) {
        this._storage = storage;
    }

    public set(key: string, value: unknown): void {
        this._storage.setItem(key, JSON.stringify(value));
    }

    public get<T = unknown>(key: string): T | null {
        if (!this.has(key)) {
            return null;
        }

        return JSON.parse(this._storage.getItem(key) as string);
    }

    public has(key: string): boolean {
        return !!this._storage.getItem(key);
    }
}
