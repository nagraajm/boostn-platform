import { Club } from '../../domain/entities/club.entity';
import { ClubRepository } from '../../domain/repositories/club.repository';

export class InMemoryClubRepository implements ClubRepository {
  private clubs: Map<string, Club> = new Map();

  constructor() {
    // Initialize with EHC Koingsberg data
    const ehcClub = new Club(
      'ehc-koingsberg',
      'EHC Koingsberg',
      'Professional hockey club based in Koingsberg, competing in the regional league with over 50 years of tradition and excellence.',
      '/club-logo.png',
      new Date('1970-01-01'),
      'Ice Hockey',
      'Koingsberg, Germany',
      'https://ehc-koingsberg.de',
      {
        facebook: 'https://facebook.com/ehckoingsberg',
        instagram: 'https://instagram.com/ehckoingsberg',
        twitter: 'https://twitter.com/ehckoingsberg'
      }
    );
    this.clubs.set(ehcClub.id, ehcClub);
  }

  async findById(id: string): Promise<Club | null> {
    return this.clubs.get(id) || null;
  }

  async findAll(): Promise<Club[]> {
    return Array.from(this.clubs.values());
  }

  async save(club: Club): Promise<void> {
    this.clubs.set(club.id, club);
  }

  async update(club: Club): Promise<void> {
    if (this.clubs.has(club.id)) {
      this.clubs.set(club.id, club);
    } else {
      throw new Error('Club not found');
    }
  }

  async delete(id: string): Promise<void> {
    this.clubs.delete(id);
  }
}
