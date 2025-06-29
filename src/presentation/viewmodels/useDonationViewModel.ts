import { useState } from 'react';
import { DIContainer } from '../../infrastructure/di/container';
import { ProcessDonationUseCase } from '../../application/use-cases/process-donation.use-case';
import { DonationDto } from '../../application/dtos/donation.dto';
import { PricingService } from '../../domain/services/pricing.service';

export interface DonationViewModelState {
  selectedAmount: number | null;
  customAmount: string;
  isProcessing: boolean;
  error: string | null;
  success: boolean;
  receiptUrl: string | null;
}

export const useDonationViewModel = () => {
  const [state, setState] = useState<DonationViewModelState>({
    selectedAmount: null,
    customAmount: '',
    isProcessing: false,
    error: null,
    success: false,
    receiptUrl: null
  });

  const container = DIContainer.getInstance();

  const getRecommendedAmounts = () => {
    return PricingService.getRecommendedDonationAmounts();
  };

  const selectAmount = (amount: number) => {
    setState(prev => ({ 
      ...prev, 
      selectedAmount: amount,
      customAmount: '',
      error: null 
    }));
  };

  const setCustomAmount = (amount: string) => {
    setState(prev => ({ 
      ...prev, 
      customAmount: amount,
      selectedAmount: null,
      error: null 
    }));
  };

  const getCurrentAmount = (): number | null => {
    if (state.selectedAmount) return state.selectedAmount;
    if (state.customAmount) {
      const amount = parseFloat(state.customAmount);
      return isNaN(amount) ? null : amount;
    }
    return null;
  };

  const processDonation = async (formData: Omit<DonationDto, 'amount'>, clubId: string = 'ehc-koingsberg') => {
    const amount = getCurrentAmount();
    
    if (!amount || amount <= 0) {
      setState(prev => ({ ...prev, error: 'Please enter a valid donation amount' }));
      return false;
    }

    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null }));

      const useCase = container.resolve<ProcessDonationUseCase>('ProcessDonationUseCase');
      const result = await useCase.execute({
        ...formData,
        amount
      }, clubId);

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
          error: result.error || 'Donation failed'
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
    setState({
      selectedAmount: null,
      customAmount: '',
      isProcessing: false,
      error: null,
      success: false,
      receiptUrl: null
    });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    getRecommendedAmounts,
    selectAmount,
    setCustomAmount,
    getCurrentAmount,
    processDonation,
    resetState,
    clearError
  };
};
