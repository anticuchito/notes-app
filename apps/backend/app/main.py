from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, notes
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base


# Inicializar la base de datos (si es necesario)
def init_db():
    Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


# Crear la aplicación FastAPI
app = FastAPI(
    title="Mi API con FastAPI",
    description="Backend estructurado con FastAPI",
    version="1.0.0",
    lifespan=lifespan,
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O restringe a ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(auth.router, prefix="/api", tags=["auth"])
# app.include_router(notes.router, prefix="/api", tags=["notes"]) FIXME - Falta implementar


# Ruta de prueba (Health Check)
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}
