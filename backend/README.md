# Backend – JWT Auth Service

A minimal **FastAPI** web API that implements JWT-based authentication. Built with **Python 3.11** and managed with **Poetry**.

---

## Features

| Endpoint | Method | Description |
|---|---|---|
| `/auth/login` | `POST` | Authenticate with username & password → returns access + refresh tokens |
| `/auth/refresh` | `POST` | Exchange a valid refresh token for a new access token |
| `/health` | `GET` | Service health-check |
| `/docs` | `GET` | Interactive Swagger UI |
| `/redoc` | `GET` | ReDoc documentation |

- Access token expires in **300 seconds**.
- Refresh token expires in **3600 seconds** (1 hour).
- Tokens are signed with **HS256**.

---

## Default credentials

| Field | Value |
|---|---|
| username | `admin` |
| password | `admin123` |

---

## Project structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py        # FastAPI application factory & route registration
│   └── auth.py        # JWT logic, endpoints (/auth/login, /auth/refresh)
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml     # Poetry configuration
└── README.md
```

---

## Local development (with Poetry)

### Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/docs/#installation)

### Install dependencies

```bash
cd backend
poetry install
```

### Run the development server

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at <http://localhost:8000>.

### Run tests

```bash
poetry run pytest
```

---

## Docker deployment

### Build & start with Docker Compose

```bash
cd backend
docker compose up --build
```

The service will be available at <http://localhost:8000>.

### Stop the service

```bash
docker compose down
```

---

## Usage examples (curl)

### 1. Obtain tokens (login)

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&******"
```

**Response:**

```json
{
  "access_token": "<jwt_access_token>",
  "refresh_token": "<jwt_refresh_token>",
  "token_type": "bearer"
}
```

### 2. Refresh the access token

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<jwt_refresh_token>"}'
```

**Response:**

```json
{
  "access_token": "<new_jwt_access_token>",
  "token_type": "bearer"
}
```

---

## Security notes

> ⚠️ The `SECRET_KEY` in `app/auth.py` is a placeholder. **Replace it with a strong, random value** (e.g., `openssl rand -hex 32`) before deploying to production.  
> Consider loading it from an environment variable instead of hard-coding it.
