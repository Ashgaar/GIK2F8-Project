from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import database, model, crud, schemas
from fastapi.middleware.cors import CORSMiddleware

model.Base.metadata.create_all(bind=database.engine)

### uvicorn app:app --reload
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Connecting to db#
def connect_db():
    db=database.SessionLocal()
    try:
        yield db
    finally:
        db.close

#Reads users#
@app.get("/users")
def get_users(db:Session = Depends(connect_db)):
    users = crud.get_users(db)
    return users

#Reads specific user based on user ID#
@app.get("/users/{user_id}")
def get_user_by_id(user_id: int, db:Session = Depends(connect_db)):
    db_user = crud.get_user_by_id(db, user_id)
    return db_user  

#Creates a user#
@app.post("/users")
def create_user(user: schemas.UserCreate, db:Session = Depends(connect_db)):
    db_user = crud.create_User(db, user)
    return db_user

#Updates a user#
@app.put("/users/{user_id}")
def update_user(user: schemas.User, db:Session=Depends(connect_db)):
    db_user = crud.update_User(db,user)
    return db_user

#Deletes a used based on user email#
@app.delete("/users/{user_id}")
def delete_user(user: schemas.UserDelete,db:Session = Depends(connect_db), ):
    db_user = crud.delete_User(db, user=user)
    return db_user