import React, { createContext, ReactNode, useState } from 'react';
import { PremiumModal } from '../components/modals/premium-modal';

type PremiumModalProviderProps = {
  children: ReactNode;
};

type PremiumModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export const premiumModalContext = createContext<PremiumModalContextType>([false, () => null]);

const PremiumModalProvider = ({ children }: PremiumModalProviderProps) => {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  return (
    <>
      <premiumModalContext.Provider value={[isPremiumModalOpen, setIsPremiumModalOpen]}>
        {children}
      </premiumModalContext.Provider>

      {isPremiumModalOpen && <PremiumModal onClose={() => setIsPremiumModalOpen(!isPremiumModalOpen)} />}
    </>
  );
};

export default PremiumModalProvider;
