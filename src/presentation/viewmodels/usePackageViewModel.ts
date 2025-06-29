import { useState, useEffect } from 'react';
import { Package } from '../../domain/entities/package.entity';
import { DIContainer } from '../../infrastructure/di/container';
import { PurchasePackageUseCase } from '../../application/use-cases/purchase-package.use-case';
import { PackagePurchaseDto } from '../../application/dtos/package.dto';
import { PackageRepository } from '../../domain/repositories/package.repository';

export interface PackageViewModelState {
  packages: Package[];
  selectedPackage: Package | null;
  isProcessing: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  receiptUrl: string | null;
}

export const usePackageViewModel = () => {
  const [state, setState] = useState<PackageViewModelState>({
    packages: [],
    selectedPackage: null,
    isProcessing: false,
    loading: true,
    error: null,
    success: false,
    receiptUrl: null
  });

  const container = DIContainer.getInstance();

  // Load packages on mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        console.log('Loading packages...');
        setState(prev => ({ ...prev, loading: true, error: null }));
        const packageRepo = container.resolve<PackageRepository>('PackageRepository');
        console.log('PackageRepository resolved:', packageRepo);
        const packages = await packageRepo.findByClubId('ehc-koenigsberg');
        console.log('Packages loaded:', packages);
        setState(prev => ({ 
          ...prev, 
          packages: packages.filter(pkg => pkg.isActive), 
          loading: false 
        }));
      } catch (error) {
        console.error('Error loading packages:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load packages'
        }));
      }
    };

    loadPackages();
  }, [container]);

  const selectPackage = (pkg: Package) => {
    setState(prev => ({ 
      ...prev, 
      selectedPackage: pkg,
      error: null,
      success: false,
      receiptUrl: null 
    }));
  };

  const purchasePackage = async (formData: Omit<PackagePurchaseDto, 'packageId'>) => {
    if (!state.selectedPackage) {
      setState(prev => ({ ...prev, error: 'No package selected' }));
      return false;
    }

    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null }));

      const useCase = container.resolve<PurchasePackageUseCase>('PurchasePackageUseCase');
      const result = await useCase.execute({
        ...formData,
        packageId: state.selectedPackage.id
      });

      if (result.success) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          success: true,
          receiptUrl: result.receiptUrl || null
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: result.error || 'Purchase failed'
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
      return false;
    }
  };

  const resetState = () => {
    setState(prev => ({
      ...prev,
      selectedPackage: null,
      isProcessing: false,
      error: null,
      success: false,
      receiptUrl: null
    }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    selectPackage,
    purchasePackage,
    resetState,
    clearError
  };
};
