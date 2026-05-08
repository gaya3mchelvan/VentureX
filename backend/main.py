from fastapi import FastAPI
from dotenv import load_dotenv
from backend.routes.startup import router as startup_router

load_dotenv()

app = FastAPI()

@app.get("/")
def home():
    return {"message": "VentureX Backend Running"}

app.include_router(startup_router)

