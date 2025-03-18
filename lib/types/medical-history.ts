export interface MedicalHistoryFormData {
  diagnosisDate: Date;
  hasBeenTreated: boolean;
  medication?: string;
  exposureSource: 'blood_transfusion' | 'sexual_intercourse' | 'intravenous_drug_use' | 'unknown';
  lastIVDrugUseDate?: Date;
  possiblyPregnant: boolean;
  hasCirrhosis: boolean;
  currentMedications: string;
  medicationAllergies: string;
  labResults?: File;
}