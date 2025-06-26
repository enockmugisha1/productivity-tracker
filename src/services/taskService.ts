import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

// ... rest of the file ... 