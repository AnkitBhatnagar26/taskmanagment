export interface Task {
  _id?: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}
