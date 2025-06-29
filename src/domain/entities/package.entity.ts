import { Money } from '../value-objects/money.vo';

// Domain entity for sponsorship packages
export class Package {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: Money,
    public readonly benefits: string[],
    public readonly clubId: string,
    public readonly tier: PackageTier,
    public readonly description?: string,
    public readonly maxSponsorships?: number,
    public readonly currentSponsorships: number = 0,
    public readonly isActive: boolean = true
  ) {}

  public isAvailable(): boolean {
    if (!this.isActive) return false;
    if (this.maxSponsorships && this.currentSponsorships >= this.maxSponsorships) {
      return false;
    }
    return true;
  }

  public getAvailabilityInfo(): {
    available: boolean;
    remaining?: number;
    message: string;
  } {
    if (!this.isActive) {
      return { available: false, message: 'This package is currently unavailable' };
    }
    
    if (this.maxSponsorships) {
      const remaining = this.maxSponsorships - this.currentSponsorships;
      if (remaining <= 0) {
        return { available: false, message: 'This package is fully booked' };
      }
      return { 
        available: true, 
        remaining,
        message: `${remaining} sponsorships remaining` 
      };
    }
    
    return { available: true, message: 'Available' };
  }

  public getTierColor(): string {
    switch (this.tier) {
      case PackageTier.BRONZE:
        return '#CD7F32';
      case PackageTier.SILVER:
        return '#C0C0C0';
      case PackageTier.GOLD:
        return '#FFD700';
      case PackageTier.PLATINUM:
        return '#E5E4E2';
      case PackageTier.DIAMOND:
        return '#B9F2FF';
      default:
        return '#6B7280';
    }
  }
}

export enum PackageTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND'
}
