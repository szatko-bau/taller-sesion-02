# taller-sesion-02

Proyecto compuesto por un **backend** FastAPI con autenticación JWT y un **frontend** React que implementa el sistema de diseño *FlowOps – Surgical Precision*.

---

## Estructura del proyecto

```
taller-sesion-02/
├── backend/          # API FastAPI con autenticación JWT
├── frontend/         # Aplicación React (Vite)
├── DESIGN.md         # Sistema de diseño FlowOps
└── README.md         # Este archivo
```

---

## Backend

Servicio REST construido con **FastAPI** y **Python 3.11**, gestionado con **Poetry**.

### Endpoints

| Método | Ruta            | Descripción                                    |
|--------|-----------------|------------------------------------------------|
| POST   | `/auth/login`   | Autentica al usuario y devuelve tokens JWT     |
| POST   | `/auth/refresh` | Renueva el access token usando el refresh token|
| GET    | `/health`       | Verificación de estado del servicio            |

### Credenciales por defecto

| Campo    | Valor      |
|----------|------------|
| Usuario  | `admin`    |
| Contraseña | `admin123` |

### Iniciar el backend

#### Con Poetry (desarrollo)

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Con Docker

```bash
cd backend
docker compose up --build
```

El API quedará disponible en `http://localhost:8000`.  
Documentación interactiva: `http://localhost:8000/docs`.

---

## Frontend

Aplicación **React 19** construida con **Vite**. Implementa el sistema de diseño *FlowOps – Surgical Precision* definido en `DESIGN.md`.

### Páginas

| Ruta       | Descripción                                                        |
|------------|--------------------------------------------------------------------|
| `/login`   | Formulario de inicio de sesión. Llama a `/auth/login` del backend. |
| `/welcome` | Página de bienvenida. Solo accesible con sesión activa.            |

### Flujo de autenticación

1. El usuario ingresa sus credenciales en `/login`.
2. El frontend envía `username` y `password` al endpoint `POST /auth/login`.
3. Al recibir el `access_token`, lo almacena en `sessionStorage`.
4. El usuario es redirigido a `/welcome`.
5. Si se intenta acceder a `/welcome` sin sesión, se redirige automáticamente a `/login`.
6. Al hacer clic en **Cerrar sesión**, el token se elimina y se redirige a `/login`.

### Iniciar el frontend

#### Requisitos

- Node.js 18+
- npm 9+
- Backend corriendo en `http://localhost:8000`

#### Instalación y desarrollo

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

> El servidor de desarrollo de Vite proxea automáticamente las peticiones a `/auth/*` hacia `http://localhost:8000`, por lo que no es necesaria ninguna configuración adicional en desarrollo.

#### Producción

```bash
cd frontend
npm run build
npm run preview
```

Los archivos de producción se generan en `frontend/dist/`.

#### Variables de entorno (opcional)

Copia `.env.example` a `.env.local` y ajusta según sea necesario:

```bash
cp frontend/.env.example frontend/.env.local
```

| Variable            | Descripción                                  | Por defecto |
|---------------------|----------------------------------------------|-------------|
| `VITE_API_BASE_URL` | URL base del backend (sin trailing slash)    | `''` (proxy)|

---

## Ejecución completa (backend + frontend)

1. **Inicia el backend:**
   ```bash
   cd backend
   poetry install
   poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **En otra terminal, inicia el frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Abre `http://localhost:5173` en tu navegador.

4. Inicia sesión con `admin` / `admin123`.

---

## Sistema de diseño

El frontend sigue el sistema de diseño **FlowOps – Surgical Precision** definido en [`DESIGN.md`](./DESIGN.md):

- **Tipografía:** Inter (300, 400, 500)
- **Colores:** Fondo blanco `#FFFFFF`, acento principal `#111827`, superficies glassmorphism
- **Componentes:** Botones con radio completo (`9999px`), tarjetas con radio `32px` y sombras sutiles
- **Espaciado:** Ritmo base de 4px
