from sqlalchemy.orm import Session
from schemas import User, UserCreate, UserDelete
import model

def get_users(db: Session):
    return db.query(model.User).all()
    
def get_user_by_id(db: Session, user_id: int):
    return db.query(model.User).filter(model.User.id == user_id).first()
    
def create_User(db: Session, user: UserCreate):
    db_user = model.User(email= user.email, f_name=user.f_name, l_name = user.l_name, presentation="")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user  

def update_User(db: Session, user: User):
    db_user = db.query(model.User).get(user.id)
    db_user.email = user.email
    db_user.f_name = user.f_name
    db_user.l_name = user.l_name
    db_user.presentation = user.presentation
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_User(db: Session, user: UserDelete):
    db_user = db.query(model.User).filter(model.User.email == user.email).first()
    db.delete(db_user)
    db.commit()
    return db_user