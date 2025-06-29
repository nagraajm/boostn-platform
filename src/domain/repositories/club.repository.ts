import { Club } from '../entities/club.entity';

// Repository interface for clubs
export interface ClubRepository {
  findById(id: string): Promise<Club | null>;
  findAll(): Promise<Club[]>;
  save(club: Club): Promise<void>;
  update(club: Club): Promise<void>;
  delete(id: string): Promise<void>;
}
