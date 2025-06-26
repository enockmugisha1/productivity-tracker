import { v4 as uuidv4 } from 'uuid';

export interface Goal {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: 'ongoing' | 'completed';
}

// ... rest of the file ... 