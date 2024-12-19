import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { GlobalContextType, User } from './types';
import { useTonWallet } from '@tonconnect/ui-react';

// Define the initial context value
const initialContextValue: GlobalContextType = {
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
};

// Create the context
const GlobalContext = createContext<GlobalContextType>(initialContextValue);

type GlobalProvidersProps = {
  children: ReactNode;
};

const GlobalProviders: React.FC<GlobalProvidersProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const wallet = useTonWallet();


  // Sample function to simulate fetching a user
  const getUser = async () => {
    setLoading(true);
    try {
      if(wallet?.account.address)
        console.log(wallet?.account.address);
    //   setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Reset the user in case of an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(); // Fetch user data on initial load
  }, [wallet?.account.address]);

  return (
    <GlobalContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProviders };
export default GlobalProviders;
