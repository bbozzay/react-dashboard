from typing import List
from sqlalchemy.orm import Session
from app.db.get_db import get_db

from fastapi import APIRouter, Depends
from app.models.grouped_findings import GroupedFindings

router = APIRouter()

@router.get("/")
def get_grouped_findings(db: Session = Depends(get_db)):
    grouped_findings = db.query(GroupedFindings).all()
    return grouped_findings
