import * as z from 'zod';

export const medicalHistorySchema = z.object({
  diagnosisDate: z.date({
    required_error: "Please select when you were diagnosed",
  }),
  hasBeenTreated: z.boolean(),
  medication: z.string().optional(),
  exposureSource: z.enum(['blood_transfusion', 'sexual_intercourse', 'intravenous_drug_use', 'unknown'], {
    required_error: "Please select how you think you were exposed",
  }),
  lastIVDrugUseDate: z.date().optional(),
  possiblyPregnant: z.boolean(),
  hasCirrhosis: z.boolean(),
  currentMedications: z.string(),
  medicationAllergies: z.string(),
  labResults: z.instanceof(File).optional(),
});