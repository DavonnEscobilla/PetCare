// MedicalRecordsContext.js

import React, { createContext, useContext, useState } from 'react';

const MedicalRecordsContext = createContext();

export const MedicalRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecord = (newRecord) => {
    setRecords((prevRecords) => [...prevRecords, { ...newRecord, files: [] }]);
  };

  const addFileToRecord = (recordId, file) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === recordId ? { ...record, files: [...record.files, file] } : record
      )
    );
  };

  // ... (other functions like updateRecord, deleteRecord, etc.)

  return (
    <MedicalRecordsContext.Provider
      value={{ records, addRecord, addFileToRecord }}
    >
      {children}
    </MedicalRecordsContext.Provider>
  );
};

export const useMedicalRecords = () => {
  const context = useContext(MedicalRecordsContext);
  if (!context) {
    throw new Error('useMedicalRecords must be used within a MedicalRecordsProvider');
  }
  return context;
};
