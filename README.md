# TodoApp - Prueba Técnica Mobile Developer

Aplicación híbrida desarrollada con Ionic + Angular + Capacitor para la gestión de tareas (To-Do List), con soporte de categorías, filtros dinámicos, almacenamiento local y feature flags mediante Firebase Remote Config.

---

# 📱 Demo del Proyecto

## 🎥 Video demostrativo

https://youtube.com/shorts/V7STKpm2zIg

## 📦 APK Android

Disponible en Releases del repositorio:

https://github.com/j1217/todoapp/releases

---

# 🚀 Tecnologías Utilizadas

- Ionic Framework 8
- Angular 20
- TypeScript
- Capacitor 8
- Firebase Remote Config
- RxJS
- LocalStorage
- HTML + SCSS
- Android Studio

---

# 📌 Funcionalidades Implementadas

## Gestión de Tareas

- Crear nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Persistencia local automática
- Estado reactivo con RxJS

## Gestión de Categorías

- Crear categorías
- Editar categorías
- Eliminar categorías
- Asignar categoría a tareas
- Visualización por categoría

## Filtros Dinámicos

- Ver todas las tareas
- Filtrar por categoría
- Filtrar tareas sin categoría

## Firebase Remote Config

Feature flag implementado:

enable_categories

Permite activar o desactivar la funcionalidad de categorías sin publicar una nueva versión de la app.

---

# ⚡ Mejoras Técnicas Aplicadas

## Arquitectura Standalone Angular

Uso de componentes standalone modernos para mejor rendimiento y menor acoplamiento.

## Reactive Programming

Uso de:

- Observable
- BehaviorSubject
- combineLatest
- map

## Optimización UI

- ChangeDetectionStrategy.OnPush
- trackBy en listas
- AlertController nativo Ionic
- Diseño responsive mobile-first

## Integración Android

- APK generada con Capacitor
- Build nativa en Android Studio
- Compatible con dispositivos Android reales

---

# 📂 Estructura del Proyecto

src/

app/

core/

services/

firebase.service.ts

features/

tasks/

categories/

home/

home.page.ts

home.page.html

home.page.scss

android/

Proyecto nativo Android generado con Capacitor

---

# ▶️ Ejecutar Proyecto Localmente

## Instalar dependencias

npm install

## Ejecutar en navegador

ionic serve

---

# 📦 Ejecutar Android

ionic build

npx cap copy android

npx cap open android

o desde terminal:

npx cap run android

---

# 🔧 Generar APK

Desde carpeta android:

gradlew.bat assembleDebug

Ruta resultante:

android/app/build/outputs/apk/debug/app-debug.apk

---

# 🍎 iOS

Compatible mediante Capacitor iOS.

Requiere:

- macOS
- Xcode
- Apple Developer Account

---

# 🧠 Decisiones Técnicas

Se utilizó Capacitor en lugar de Cordova por:

- Mejor soporte moderno
- Mejor integración nativa
- Mejor rendimiento
- Mantenimiento activo oficial de Ionic

Se utilizó Firebase Remote Config para permitir cambios funcionales sin redeploy.

---

# 👨‍💻 Autor

Juan Felipe Acevedo Zapata

GitHub: https://github.com/j1217

Desarrollador .NET / Mobile Developer

---

# 📌 Estado del Proyecto

✅ Funcional  
✅ APK generada  
✅ Repositorio GitHub activo  
✅ Listo para evaluación técnica
