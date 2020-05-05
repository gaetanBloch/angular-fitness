export class Exercise {
  id: string;
  user: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;

  constructor(id: string, user: string, name: string, duration: number, calories: number) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.duration = duration;
    this.calories = calories;
  }
}

export interface ExerciseDoc {
  name: string;
  duration: number;
  calories: number;
}
