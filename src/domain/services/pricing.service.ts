import { Money } from '../value-objects/money.vo';
import { Package, PackageTier } from '../entities/package.entity';

// Domain service for pricing logic
export class PricingService {
  private static readonly TAX_RATE = 0.19; // 19% German VAT

  public static calculateTax(amount: Money): Money {
    return amount.multiply(this.TAX_RATE);
  }

  public static calculateTotal(amount: Money): Money {
    const tax = this.calculateTax(amount);
    return amount.add(tax);
  }

  public static applyDiscount(amount: Money, discountPercent: number): Money {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Discount percent must be between 0 and 100');
    }
    const discountFactor = 1 - (discountPercent / 100);
    return amount.multiply(discountFactor);
  }

  public static getRecommendedDonationAmounts(): Money[] {
    return [
      new Money(20),
      new Money(30),
      new Money(50),
      new Money(100),
      new Money(250),
      new Money(500)
    ];
  }

  public static getTierPriceRange(tier: PackageTier): { min: number; max: number } {
    switch (tier) {
      case PackageTier.BRONZE:
        return { min: 100, max: 499 };
      case PackageTier.SILVER:
        return { min: 500, max: 999 };
      case PackageTier.GOLD:
        return { min: 1000, max: 2499 };
      case PackageTier.PLATINUM:
        return { min: 2500, max: 4999 };
      case PackageTier.DIAMOND:
        return { min: 5000, max: Number.MAX_SAFE_INTEGER };
      default:
        return { min: 0, max: Number.MAX_SAFE_INTEGER };
    }
  }

  public static validatePackagePrice(pkg: Package): boolean {
    const range = this.getTierPriceRange(pkg.tier);
    return pkg.price.amount >= range.min && pkg.price.amount <= range.max;
  }
}
