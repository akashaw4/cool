import React, { createContext, useContext, useState } from 'react';

interface Activity {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  coordinator: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  registeredStudents?: string[];
}

interface ActivitiesContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'status' | 'registeredStudents'>) => void;
  registerForActivity: (activityId: string, studentId: string) => void;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (newActivity: Omit<Activity, 'id' | 'status' | 'registeredStudents'>) => {
    const activity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      ...newActivity,
      status: 'upcoming',
      registeredStudents: [],
    };
    setActivities(currentActivities => [...currentActivities, activity]);
  };

  const registerForActivity = (activityId: string, studentId: string) => {
    setActivities(currentActivities =>
      currentActivities.map(activity =>
        activity.id === activityId
          ? {
              ...activity,
              registeredStudents: [...(activity.registeredStudents || []), studentId],
              participants: activity.participants + 1,
            }
          : activity
      )
    );
  };

  return (
    <ActivitiesContext.Provider value={{ activities, addActivity, registerForActivity }}>
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivitiesProvider');
  }
  return context;
}