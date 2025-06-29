// Shared utility functions
export class Utils {
  public static formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency
    }).format(amount);
  }

  public static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  public static generateReceiptNumber(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `RCP-${timestamp}-${random}`;
  }

  public static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public static truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }

  public static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }
}
