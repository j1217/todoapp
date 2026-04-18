import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue
} from 'firebase/remote-config';

import { BehaviorSubject } from 'rxjs';
import { FeatureFlags } from '../models/feature-flags.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private remoteConfig: any;

  // 🔥 FEATURE FLAGS REACTIVO
  private featureFlagsSubject = new BehaviorSubject<FeatureFlags>({
    enable_categories: false
  });

  featureFlags$ = this.featureFlagsSubject.asObservable();

  // 🔥 LOADING GLOBAL REACTIVO
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  constructor() {

    const firebaseConfig = {
      apiKey: "AIzaSyABQPhXO8DoiOSTu1E19Bf1p_jcInugFu8",
      authDomain: "todo-app-ionic-bf40e.firebaseapp.com",
      projectId: "todo-app-ionic-bf40e",
      storageBucket: "todo-app-ionic-bf40e.firebasestorage.app",
      messagingSenderId: "448953028282",
      appId: "1:448953028282:web:879d17169aaf28ae9abc83"
    };

    const app = initializeApp(firebaseConfig);
    this.remoteConfig = getRemoteConfig(app);

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0
    };
  }

  async initRemoteConfig() {

    try {
      await fetchAndActivate(this.remoteConfig);

      const flags: FeatureFlags = {
        enable_categories: getValue(this.remoteConfig, 'enable_categories').asBoolean()
      };

      this.featureFlagsSubject.next(flags);

    } catch (error) {

      console.error('Remote Config error:', error);

      this.featureFlagsSubject.next({
        enable_categories: false
      });

    } finally {
      this.loadingSubject.next(false);
    }
  }
}