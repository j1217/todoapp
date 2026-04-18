import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesSubject = new BehaviorSubject<Category[]>(this.getInitialCategories());
  categories$ = this.categoriesSubject.asObservable();

  constructor() {}

  // Cargar desde localStorage
  private getInitialCategories(): Category[] {
    const data = localStorage.getItem('categories');

    if (!data) return [];

    const parsed: Category[] = JSON.parse(data);

    return parsed.map(cat => ({
      ...cat,
      createdAt: new Date(cat.createdAt)
    }));
  }

  // Guardar
  private save(categories: Category[]) {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  // Crear categoría
  addCategory(name: string) {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date()
    };

    const updated = [...this.categoriesSubject.value, newCategory];
    this.categoriesSubject.next(updated);
    this.save(updated);
  }

  // Editar
  updateCategory(id: string, name: string) {
    const updated = this.categoriesSubject.value.map(cat =>
      cat.id === id ? { ...cat, name } : cat
    );

    this.categoriesSubject.next(updated);
    this.save(updated);
  }

  // Eliminar
  deleteCategory(id: string) {
    const updated = this.categoriesSubject.value.filter(cat => cat.id !== id);

    this.categoriesSubject.next(updated);
    this.save(updated);
  }
}