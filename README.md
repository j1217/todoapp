# TodoApp - Prueba Técnica Mobile Developer

Aplicación híbrida desarrollada con **Ionic + Angular + Capacitor** para la gestión de tareas (To-Do List), incluyendo categorización de tareas, filtros dinámicos, almacenamiento local y feature flags mediante Firebase Remote Config.

---

# 📱 Demo del Proyecto

## 🎥 Video demostrativo

https://youtube.com/shorts/V7STKpm2zIg

## 📦 APK Android

Disponible en Releases del repositorio:

https://github.com/j1217/todoapp/releases

## 💻 Repositorio Fuente

https://github.com/j1217/todoapp

---

# 🚀 Tecnologías Utilizadas

- Ionic Framework 8
- Angular 20
- TypeScript
- Capacitor 8
- Firebase Remote Config
- RxJS
- LocalStorage
- HTML5
- SCSS
- Android Studio
- Git / GitHub

---

# 📌 Funcionalidades Implementadas

## Gestión de Tareas

- Crear nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Persistencia automática en almacenamiento local

## Gestión de Categorías

- Crear categorías
- Editar categorías
- Eliminar categorías
- Asignar categoría a cada tarea

## Filtros Dinámicos

- Ver todas las tareas
- Filtrar por categoría específica
- Filtrar tareas sin categoría

## Firebase Remote Config

Se implementó el feature flag:

enable_categories

Este permite activar o desactivar toda la funcionalidad de categorías sin necesidad de desplegar una nueva versión de la aplicación.

---

# ⚡ Optimización de Rendimiento Aplicada

## Carga Inicial

- Uso de Angular Standalone Components
- Bootstrap moderno sin módulos innecesarios
- Menor sobrecarga inicial

## Manejo de Grandes Cantidades de Tareas

- Estado reactivo con RxJS
- Uso de combineLatest
- Filtrado eficiente en memoria

## Minimización de Uso de Memoria

- ChangeDetectionStrategy.OnPush
- Renderizado inteligente
- trackBy en listas dinámicas

## Experiencia de Usuario

- Componentes nativos Ionic
- Diseño mobile-first
- AlertController para acciones críticas
- UI responsive en Android

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

# ▶️ Ejecución Local

## Instalar dependencias

npm install

## Ejecutar versión web

ionic serve

---

# 📱 Ejecución Android

ionic build

npx cap copy android

npx cap run android

---

# 📦 Generación APK

Desde la carpeta android:

gradlew.bat assembleDebug

Ruta generada:

android/app/build/outputs/apk/debug/app-debug.apk

---

# 🍎 Soporte iOS

El proyecto quedó preparado para compilación en iOS mediante Capacitor.

Requisitos para generar IPA:

- macOS
- Xcode
- Apple Developer Account

Debido a que el desarrollo se realizó sobre entorno Windows, no fue posible generar el archivo IPA final en esta etapa.

---

# 🧠 Decisiones Técnicas

## Uso de Capacitor en lugar de Cordova

Aunque el enunciado menciona Cordova, se implementó la solución con Capacitor por ser la tecnología moderna oficialmente recomendada por Ionic, ofreciendo:

- Mejor integración nativa
- Mejor mantenimiento
- Mayor compatibilidad futura
- Mejor experiencia de desarrollo

## Firebase Remote Config

Permite activar funcionalidades dinámicamente sin redeploy de la aplicación.

---

# 📝 Respuestas Solicitadas

## ¿Cuáles fueron los principales desafíos enfrentados?

- Integración de Firebase Remote Config dentro del flujo reactivo.
- Configuración de build Android y generación del APK.
- Ajuste de componentes Ionic standalone para compatibilidad moderna.
- Mantener buena experiencia de usuario mientras se agregaban nuevas funcionalidades.

## ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

- ChangeDetectionStrategy.OnPush para reducir renderizados innecesarios.
- trackBy en listas para mejorar performance con múltiples tareas.
- RxJS para manejo reactivo y eficiente del estado.
- Componentes standalone para reducir carga inicial.

## ¿Cómo aseguraste la calidad y mantenibilidad del código?

- Separación por features.
- Servicios desacoplados.
- Código tipado con TypeScript.
- Estructura escalable.
- Componentes reutilizables.
- Nombres claros y organización modular.

---

# ✅ Estado Final del Proyecto

- Aplicación funcional
- APK Android generada
- Firebase integrado
- Remote Config funcionando
- Repositorio GitHub público
- Video demostrativo disponible
- Listo para evaluación técnica

---

# 👨‍💻 Autor

Juan Felipe Acevedo Zapata

GitHub:
https://github.com/j1217

Desarrollador .NET / Mobile Developer
