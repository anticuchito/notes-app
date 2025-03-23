from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from app.db.base import Base
import datetime


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    description = Column(String)
    version = Column(Integer, default=1, nullable=False)
    owner_email = Column(String, ForeignKey("users.email"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
