import { useState, useEffect } from 'react';
import { Club } from '../../domain/entities/club.entity';
import { Package } from '../../domain/entities/package.entity';
import { DIContainer } from '../../infrastructure/di/container';
import { ClubRepository } from '../../domain/repositories/club.repository';
import { PackageRepository } from '../../domain/repositories/package.repository';

export interface ClubViewModelState {
  club: Club | null;
  packages: Package[];
  isLoading: boolean;
  error: string | null;
}

export const useClubViewModel = (clubId: string = 'ehc-koingsberg') => {
  const [state, setState] = useState<ClubViewModelState>({
    club: null,
    packages: [],
    isLoading: true,
    error: null
  });

  const container = DIContainer.getInstance();

  useEffect(() => {
    loadClubData();
  }, [clubId]);

  const loadClubData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const clubRepo = container.resolve<ClubRepository>('ClubRepository');
      const packageRepo = container.resolve<PackageRepository>('PackageRepository');

      const [club, packages] = await Promise.all([
        clubRepo.findById(clubId),
        packageRepo.findAvailable(clubId)
      ]);

      if (!club) {
        throw new Error('Club not found');
      }

      setState({
        club,
        packages,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load club data'
      }));
    }
  };

  const refreshData = () => {
    loadClubData();
  };

  return {
    ...state,
    refreshData
  };
};
