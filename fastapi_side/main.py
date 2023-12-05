from typing import Union
import urllib.request
import json

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import Annotated
from typing import Optional
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, FileResponse
import datetime as dtime

from PIL import Image, ImageOps
import io


app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.data_posts = None
app.last_time = dtime.datetime.now()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/posts")
async def get_posts(val: Union[str, None] = None):
    if app.data_posts is None or (dtime.datetime.now() - app.last_time).seconds > 15:
        app.last_time = dtime.datetime.now()
        with urllib.request.urlopen("https://jsonplaceholder.typicode.com/posts/") as response:
            html = response.read()
            app.data_posts = json.loads(html.decode("utf8"))
        if app.data_posts is None:
            raise HTTPException(status_code=404)
    if val is None:
        data = [] + app.data_posts
    else:
        data = app.data_posts[:int(val)]
    data = [{"title": di["title"], "body": di["title"]} for di in data]
    print(app.last_time)
    return json.dumps(data)

class Item(BaseModel):
    a: str
    b: str
@app.post("/test/")
async def create_item(item: Item):
    print(item)
    return {"cool", 4}

@app.post("/files/")
async def create_file(file: UploadFile = File(...)):
    print(file.filename)
    if file.content_type != "image/png" and file.content_type != "image/jpeg":
        return "er"
    # file.file
    # with open(f"data/{file.filename}", "wb") as fptr:
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    img = ImageOps.invert(img.convert('RGB'))
    img.save(f"data/{file.filename}")
    # fptr.write(contents)
    # fptr.close()
    # return HTMLResponse(content=contents, status_code=200)
    return FileResponse(f"data/{file.filename}")


@app.get("/items")
async def read_item(q: Union[str, None] = None):
    return {"q": q}