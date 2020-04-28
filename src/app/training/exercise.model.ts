export class Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;

  constructor(id: string, name: string, duration: number, calories: number) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.calories = calories;
  }
}
