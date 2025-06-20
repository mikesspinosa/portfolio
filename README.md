# Portafolio Profesional de Miguel Espinosa – Desarrollador Full-Stack

¡Bienvenido a mi portafolio! Este proyecto es más que una simple colección de mi trabajo; es una demostración de mis habilidades en desarrollo front-end, diseño de experiencia de usuario y optimización de rendimiento, construido con las tecnologías más modernas.

**Visita la versión en producción:** [**https://mike-espinosa-portfolio.vercel.app/**](https://mike-espinosa-portfolio.vercel.app/)

---

## ✨ Características Destacadas

Este portafolio ha sido diseñado y desarrollado con un enfoque en la interactividad, el rendimiento y la estética.

-   **Diseño 100% Responsivo:** Experiencia de usuario fluida y adaptativa en cualquier dispositivo, desde móviles hasta pantallas de escritorio, utilizando **Tailwind CSS**.
-   **Animaciones Avanzadas y Fluidas:** Implementación de animaciones complejas y de alto rendimiento con **GSAP (GreenSock Animation Platform)** y **Framer Motion** para crear una navegación atractiva y dinámica.
-   **Integración con la API de Spotify:** Conexión en tiempo real para mostrar mis canciones y listas de reproducción favoritas, utilizando **Next.js API Routes** para gestionar la lógica del backend de forma segura.
-   **Máxima Optimización de Rendimiento:**
    -   **Carga Diferida (Lazy Loading):** Las imágenes y componentes pesados se cargan únicamente cuando son visibles para el usuario.
    -   **Importaciones Dinámicas:** Librerías como `Particles.js` se cargan de forma asíncrona para no bloquear el renderizado inicial de la página, mejorando significativamente el *Time to Interactive*.
    -   **Optimización de Imágenes con `next/image`:** Entrega de imágenes en formatos modernos (WebP) y con el tamaño adecuado para cada resolución, reduciendo el peso de la página.
-   **Arquitectura Moderna con Next.js:** Construido sobre el **App Router** de Next.js, garantizando una estructura escalable, un enrutado eficiente y renderizado híbrido (SSR y SSG).

---

## 🛠️ Stack Tecnológico

La elección de cada tecnología se basó en su capacidad para crear una aplicación web moderna, rápida y mantenible.

| Tecnología                               | Propósito                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Next.js (App Router)**                  | Framework de React para producción, que permite renderizado del lado del servidor y generación estática. |
| **React**                                 | Biblioteca para construir interfaces de usuario interactivas y componentizadas.                        |
| **TypeScript**                            | Superset de JavaScript que añade tipado estático para un código más robusto y libre de errores.          |
| **Tailwind CSS**                          | Framework CSS de utilidad primero para un diseño rápido y personalizado sin salir del HTML.            |
| **GSAP & Framer Motion**                  | Librerías líderes para crear animaciones de alto rendimiento y controladas por gestos.                 |
| **Spotify API**                           | Integración para traer datos dinámicos y personalizar la experiencia.                                  |
| **Vercel**                                | Plataforma de despliegue optimizada para Next.js, con CI/CD integrado.                                 |

---

## 🚀 Cómo Empezar

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/mikesspinosa/portfolio.git
cd portfolio
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales de la API de Spotify. Puedes obtenerlas desde el [Dashboard de Desarrolladores de Spotify](https://developer.spotify.com/dashboard/).

```env
SPOTIFY_CLIENT_ID=TU_CLIENT_ID
SPOTIFY_CLIENT_SECRET=TU_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN=TU_REFRESH_TOKEN
```

### 4. Ejecutar el Servidor de Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

Copyright (c) 2024 Miguel Espinosa (mike.espinosa1203@gmail.com)
