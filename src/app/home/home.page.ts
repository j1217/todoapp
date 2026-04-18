import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel,
  IonCheckbox,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';

import { AlertController } from '@ionic/angular';

import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

import { TaskService } from '../features/tasks/task.service';
import { Task } from '../features/tasks/task.model';

import { CategoryService } from '../features/categories/category.service';
import { Category } from '../features/categories/category.model';

import { FirebaseService } from '../core/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonLabel,
    IonCheckbox,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonIcon
  ],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  // =========================
  // DATA STREAMS
  // =========================

  tasks$: Observable<Task[]>;
  categories$: Observable<Category[]>;

  // =========================
  // FEATURE FLAGS
  // =========================

  showCategories$ = this.firebaseService.featureFlags$.pipe(
    map(flags => flags.enable_categories)
  );

  isLoadingFirebase$ = this.firebaseService.loading$;

  // =========================
  // TAB STATE
  // =========================

  currentTab: 'tasks' | 'categories' = 'tasks';

  // =========================
  // FILTER STATE
  // =========================

  private selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  filteredTasks$: Observable<Task[]>;

  // =========================
  // FORM STATE
  // =========================

  newTaskTitle: string = '';
  newCategoryName: string = '';
  selectedCategoryForNewTask: string | null = null;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {
    this.tasks$ = this.taskService.tasks$;
    this.categories$ = this.categoryService.categories$;

    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.selectedCategory$
    ]).pipe(
      map(([tasks, selectedCategoryId]) => {

        if (!selectedCategoryId) return tasks;

        return tasks.filter(task =>
          selectedCategoryId === 'none'
            ? !task.categoryId
            : task.categoryId === selectedCategoryId
        );
      })
    );
  }

  ngOnInit() {
    this.firebaseService.initRemoteConfig();
  }

  // =========================
  // TASKS
  // =========================

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(
      this.newTaskTitle,
      this.selectedCategoryForNewTask
    );

    this.newTaskTitle = '';
    this.selectedCategoryForNewTask = null;
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  // =========================
  // CATEGORIES
  // =========================

  addCategory() {
    if (!this.newCategoryName.trim()) return;

    this.categoryService.addCategory(this.newCategoryName);
    this.newCategoryName = '';
  }

  async editCategory(cat: Category) {
    const alert = await this.alertController.create({
      header: 'Editar categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: cat.name,
          placeholder: 'Nombre de la categoría'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const newName = data.name?.trim();
            if (!newName) return false;

            this.categoryService.updateCategory(cat.id, newName);
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteCategory(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Deseas eliminar esta categoría?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.categoryService.deleteCategory(id);
            this.taskService.removeCategoryFromTasks(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // =========================
  // FILTER
  // =========================

  setCategory(value: string | null) {
    this.selectedCategorySubject.next(value);
  }

  setCategoryForNewTask(value: string | null) {
    this.selectedCategoryForNewTask = value;
  }

  // =========================
  // UX
  // =========================

  getCategoryName(categoryId: string | null | undefined, categories: Category[]): string {
    if (!categoryId) return 'Sin categoría';

    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }

  // =========================
  // PERFORMANCE
  // =========================

  trackById(index: number, item: Task | Category) {
    return item.id;
  }
}