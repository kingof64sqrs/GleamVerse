from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .routers import auth, products

app = FastAPI(title="GleamVerse API", version="1.0.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=[
		"http://localhost:5500",
		"http://127.0.0.1:5500",
		"http://140.238.227.29:5500",
		"http://140.238.227.29:8000",
	],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(products.router, prefix="/products", tags=["products"])

# Serve jewellery assets for demo (backend/assets/jewellery)
# Get the absolute path to the assets directory
current_file_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_file_dir)
static_jewellery_path = os.path.join(backend_dir, "assets", "jewellery")
print(f"Static jewellery path: {static_jewellery_path}")
print(f"Path exists: {os.path.isdir(static_jewellery_path)}")
if os.path.isdir(static_jewellery_path):
	app.mount("/static/jewellery", StaticFiles(directory=static_jewellery_path), name="jewellery")
	print(f"Mounted /static/jewellery to {static_jewellery_path}")

@app.get("/")
def root():
	return {"status": "ok", "service": "gleamverse"}

