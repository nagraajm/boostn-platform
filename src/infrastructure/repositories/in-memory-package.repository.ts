import { Package, PackageTier } from '../../domain/entities/package.entity';
import { PackageRepository } from '../../domain/repositories/package.repository';
import { Money } from '../../domain/value-objects/money.vo';

export class InMemoryPackageRepository implements PackageRepository {
  private packages: Map<string, Package> = new Map();

  constructor() {
    // Initialize with sample packages for EHC Koingsberg
    const packages = [
      new Package(
        'pkg-silver',
        'Silver Sponsor',
        new Money(500),
        [
          'Logo on club website',
          'Social media mentions (2 per month)',
          'Newsletter inclusion',
          'Season game tickets (2)'
        ],
        'ehc-koingsberg',
        PackageTier.SILVER,
        'Perfect for small businesses looking to support local sports'
      ),
      new Package(
        'pkg-gold',
        'Gold Sponsor',
        new Money(1500),
        [
          'Logo on club website (premium placement)',
          'Logo on team jerseys',
          'Social media mentions (4 per month)',
          'Newsletter inclusion',
          'Season game tickets (4)',
          'VIP lounge access'
        ],
        'ehc-koingsberg',
        PackageTier.GOLD,
        'Great visibility for medium-sized businesses'
      ),
      new Package(
        'pkg-platinum',
        'Platinum Sponsor',
        new Money(3000),
        [
          'Logo on club website (top placement)',
          'Logo on team jerseys (chest)',
          'Logo on arena boards',
          'Social media mentions (8 per month)',
          'Newsletter inclusion',
          'Season game tickets (8)',
          'VIP lounge access',
          'Meet & greet with players'
        ],
        'ehc-koingsberg',
        PackageTier.PLATINUM,
        'Maximum exposure for your brand'
      ),
      new Package(
        'pkg-diamond',
        'Diamond Partner',
        new Money(5000),
        [
          'Exclusive naming rights opportunity',
          'Logo on club website (exclusive section)',
          'Logo on team jerseys (main sponsor)',
          'Logo on arena boards (premium)',
          'Social media mentions (unlimited)',
          'Newsletter inclusion',
          'Season game tickets (12)',
          'VIP lounge access',
          'Meet & greet with players',
          'Corporate hospitality events'
        ],
        'ehc-koingsberg',
        PackageTier.DIAMOND,
        'The ultimate partnership opportunity',
        2, // Limited to 2 diamond sponsors
        0
      )
    ];

    packages.forEach(pkg => this.packages.set(pkg.id, pkg));
  }

  async findById(id: string): Promise<Package | null> {
    return this.packages.get(id) || null;
  }

  async findByClubId(clubId: string): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(pkg => pkg.clubId === clubId);
  }

  async findAvailable(clubId: string): Promise<Package[]> {
    return Array.from(this.packages.values())
      .filter(pkg => pkg.clubId === clubId && pkg.isAvailable());
  }

  async save(pkg: Package): Promise<void> {
    this.packages.set(pkg.id, pkg);
  }

  async update(pkg: Package): Promise<void> {
    if (this.packages.has(pkg.id)) {
      this.packages.set(pkg.id, pkg);
    } else {
      throw new Error('Package not found');
    }
  }

  async delete(id: string): Promise<void> {
    this.packages.delete(id);
  }
}
