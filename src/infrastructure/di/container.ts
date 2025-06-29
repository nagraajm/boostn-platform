// Simple dependency injection container
export class DIContainer {
  private static instance: DIContainer;
  private services = new Map<string, any>();

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory);
  }

  resolve<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not found`);
    }
    return factory();
  }

  registerSingleton<T>(key: string, factory: () => T): void {
    let instance: T | null = null;
    this.register(key, () => {
      if (!instance) {
        instance = factory();
      }
      return instance;
    });
  }
}
