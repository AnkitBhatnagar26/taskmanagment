export interface Task {
  _id?: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

export interface User {
  _id?: number;
  name: string;
  email: string;
  role: string;
  status: "To Do" | "In Progress" | "Done";
}
