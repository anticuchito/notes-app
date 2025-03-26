from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from app.db.base import Base


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    content = Column(String)
    version = Column(Integer, nullable=False, default=1)
    owner_email = Column(String, ForeignKey("users.email"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    __mapper_args__ = {"version_id_col": version}
