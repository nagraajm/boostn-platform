import { Package } from '../entities/package.entity';

// Repository interface for packages
export interface PackageRepository {
  findById(id: string): Promise<Package | null>;
  findByClubId(clubId: string): Promise<Package[]>;
  findAvailable(clubId: string): Promise<Package[]>;
  save(pkg: Package): Promise<void>;
  update(pkg: Package): Promise<void>;
  delete(id: string): Promise<void>;
}
