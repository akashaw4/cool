import React, { createContext, useContext, useState } from 'react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'resolved' | 'rejected';
  response?: string;
  isAnonymous: boolean;
  studentId?: string;
}

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'submittedAt'>) => void;
  updateComplaintStatus: (id: string, status: 'resolved' | 'rejected', response?: string) => void;
  getComplaintsForStudent: (studentId: string) => Complaint[];
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export function ComplaintProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const addComplaint = (newComplaint: Omit<Complaint, 'id' | 'status' | 'submittedAt'>) => {
    const complaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9),
      ...newComplaint,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setComplaints(currentComplaints => [...currentComplaints, complaint]);
  };

  const updateComplaintStatus = (id: string, status: 'resolved' | 'rejected', response?: string) => {
    setComplaints(currentComplaints =>
      currentComplaints.map(complaint =>
        complaint.id === id
          ? { ...complaint, status, response }
          : complaint
      )
    );
  };

  const getComplaintsForStudent = (studentId: string) => {
    return complaints.filter(complaint => complaint.studentId === studentId);
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, updateComplaintStatus, getComplaintsForStudent }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
}