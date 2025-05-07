# 📚 Test-Terrand Project

Este repositorio contiene dos aplicaciones separadas:

* **Frontend**: Aplicación SPA construida con **React** y **Vite**.
* **Backend**: API REST construida con **Node.js**, **Express**, **TypeScript** y **TypeORM** (PostgreSQL).

---

## 🚀 Frontend

### Tecnologías

* React 18
* Vite
* React Router
* Material UI
* Cloudinary (para subir imágenes)

### Instalación

```bash
# En la carpeta del frontend
cd frontend
pnpm install    # o npm install / yarn
```

### Variables de entorno

Crea un archivo `.env` en la raíz de `frontend` con las siguientes claves:

```dotenv
VITE_API_URL=https://tu-backend.example.com/api/v1
VITE_CLOUDINARY_CLOUD_NAME=tuCloudName
VITE_CLOUDINARY_UPLOAD_PRESET=tuUploadPreset
```

### Scripts

| Comando        | Descripción                                              |
| -------------- | -------------------------------------------------------- |
| `pnpm dev`     | Levanta servidor de desarrollo (`http://localhost:5173`) |
| `pnpm build`   | Genera la carpeta `dist/` para producción                |
| `pnpm preview` | Sirve localmente el build estático                       |

### Deployment

1. Asegúrate de configurar las variables de entorno en tu proveedor (Vercel, Netlify, etc.).
2. Copia `vercel.json` (ya incluido) o configura tu host para redirigir todas las rutas a `index.html`.
3. Empuja a `main`; la plataforma detectará Vite y ejecutará `pnpm run build`.

---

## 🔧 Backend

### Tecnologías

* Node.js 18
* Express 5
* TypeScript
* TypeORM
* PostgreSQL (Railway, Heroku o tu propio servidor)
* JWT para autenticación

### Instalación

```bash
# En la carpeta del backend
cd backend
pnpm install    # o npm install / yarn
```

### Variables de entorno

Crea un archivo `.env` en la raíz de `backend` con:

```dotenv
# Conexión a la base de datos PostgreSQL
DATABASE_URL=postgres://user:password@host:port/dbname
DB_SYNC=false       # false en producción
DB_LOGGING=false    # false en producción

# Autenticación
JWT_SECRET=tuJwtSecret
JWT_EXPIRES_IN=1d

# Servidor
PORT=3003
NODE_ENV=development
API_PREFIX=/api
```

> **En producción** (p.e. Railway) **no** definas `DB_HOST`, `DB_PORT`, etc.; solo `DATABASE_URL`.

### Scripts

| Comando      | Descripción                                              |
| ------------ | -------------------------------------------------------- |
| `pnpm build` | Transpila TS a `dist/`                                   |
| `pnpm start` | Arranca tu app usando `dist/server.js`                   |
| `pnpm dev`   | Levanta el servidor en modo desarrollo con `ts-node-dev` |

### Deployment en Railway

1. Sube tu repo y conecta GitHub en Railway.
2. Configura **Pre-Deploy**: `pnpm install && pnpm run build`
3. Configura **Start Command**: `pnpm start`
4. En **Variables** del servicio, define únicamente:

   * `DATABASE_URL` → `${{ Postgres.URL_DE_BASE_DE_DATOS }}`
   * `DB_SYNC` → `false`
   * `DB_LOGGING` → `false`
   * `JWT_SECRET`, `JWT_EXPIRES_IN`, `API_PREFIX`, `NODE_ENV`, `PORT`.
5. Deploy y comprueba logs.

---

## 📖 Uso

1. Levanta el backend.
2. Levanta el frontend.
3. Regístrate e inicia sesión.
4. Administra recetas: crea, lista, elimina.

---

## 🔗 Enlaces

* [Repositorio Frontend](https://github.com/galoss88/test-terrand-front)
* [Repositorio Backend](https://github.com/galoss88/test-terrand-back)
