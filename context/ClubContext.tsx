import React, { createContext, useContext, useState } from 'react';

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  advisor: string;
  meetingSchedule: string;
  memberCount: number;
  status: 'active' | 'inactive';
}

interface ClubContextType {
  clubs: Club[];
  addClub: (club: Omit<Club, 'id' | 'status'>) => void;
  updateClub: (id: string, club: Partial<Club>) => void;
  deleteClub: (id: string) => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const [clubs, setClubs] = useState<Club[]>([]);

  const addClub = (newClub: Omit<Club, 'id' | 'status'>) => {
    const club: Club = {
      id: Math.random().toString(36).substr(2, 9),
      ...newClub,
      status: 'active',
    };
    setClubs(currentClubs => [...currentClubs, club]);
  };

  const updateClub = (id: string, updatedClub: Partial<Club>) => {
    setClubs(currentClubs =>
      currentClubs.map(club =>
        club.id === id ? { ...club, ...updatedClub } : club
      )
    );
  };

  const deleteClub = (id: string) => {
    setClubs(currentClubs => currentClubs.filter(club => club.id !== id));
  };

  return (
    <ClubContext.Provider value={{ clubs, addClub, updateClub, deleteClub }}>
      {children}
    </ClubContext.Provider>
  );
}

export function useClubs() {
  const context = useContext(ClubContext);
  if (context === undefined) {
    throw new Error('useClubs must be used within a ClubProvider');
  }
  return context;
}