# 📚 Frontend - Test Terrand

Este README cubre exclusivamente la aplicación frontend de **Test Terrand**, construida con **React**, **Vite** y desplegada en **Vercel**.

---

## 🛠 Tecnologías

* **React 18**
* **Vite**
* **React Router**
* **Material UI**
* **Cloudinary** para subir imágenes

---

## 🚀 Instalación y Desarrollo Local

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/galoss88/test-terrand-front.git
   cd test-terrand-front
   ```

2. **Instala dependencias**

   ```bash
   pnpm install
   # o npm install / yarn install
   ```

3. **Variables de entorno**

   Crea un archivo `.env` en la raíz con:

   ```dotenv
   VITE_API_URL=https://<tu-backend-url>/api/v1
   VITE_CLOUDINARY_CLOUD_NAME=tuCloudName
   VITE_CLOUDINARY_UPLOAD_PRESET=tuUploadPreset
   ```

4. **Levanta el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

   Luego abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🏗️ Scripts disponibles

| Comando        | Descripción                               |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo          |
| `pnpm build`   | Genera la carpeta `dist/` para producción |
| `pnpm preview` | Sirve localmente el build estático        |

---

## ☁️ Despliegue en Vercel

1. Conecta tu repositorio de GitHub en Vercel.
2. En **Settings → Environment Variables**, agrega:

   * `VITE_API_URL` (en Production) → URL de tu backend.
   * `VITE_CLOUDINARY_CLOUD_NAME` y `VITE_CLOUDINARY_UPLOAD_PRESET`.
3. Asegúrate de tener un `vercel.json` con:

   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ]
   }
   ```
4. Empuja a la rama `main`; Vercel instalará, construirá (`pnpm build`) y desplegará tu front.

---

## 📖 Uso

Una vez desplegado:

* Navega a `/auth/register`, `/auth/login`, etc., sin recibir 404.
* La app consumirá la API en `VITE_API_URL`.

---

## 🔗 Enlaces

* **Repo Frontend**: [https://github.com/galoss88/test-terrand-front](https://github.com/galoss88/test-terrand-front)
