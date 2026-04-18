export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  categoryId?: string | null;
}