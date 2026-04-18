import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>(this.getInitialTasks());
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  // Carga inicial desde localStorage
  private getInitialTasks(): Task[] {
    const data = localStorage.getItem('tasks');

    console.log("INIT CARGANDO:", data);

    if (!data) return [];

    const parsed: Task[] = JSON.parse(data);

    return parsed.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      categoryId: task.categoryId ?? null // 🔥 importante
    }));
  }

  // Guardar
  private saveToStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // AGREGAR con categoría
  addTask(title: string, categoryId: string | null) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      categoryId: categoryId || null
    };

    const updated = [...this.tasksSubject.value, newTask];

    console.log("GUARDANDO:", updated);

    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  // Toggle
  toggleTask(id: string) {
    const updated = this.tasksSubject.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  // Eliminar
  deleteTask(id: string) {
    const updated = this.tasksSubject.value.filter(task => task.id !== id);

    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  // Limpiar categoría en tareas cuando se elimina
removeCategoryFromTasks(categoryId: string) {
    const updated = this.tasksSubject.value.map(task =>
      task.categoryId === categoryId
        ? { ...task, categoryId: null }
        : task
    );

    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }
}