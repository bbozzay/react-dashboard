from sqlalchemy import select, func
from sqlalchemy.orm import Session
from app.db.get_db import get_db

from fastapi import APIRouter, Depends
from app.models.grouped_findings import GroupedFindings, GroupedFindingsStats
from typing import List

# Define query to select severity and count rows for each distinct value
query = (select([GroupedFindings.severity, func.count(GroupedFindings.id)]).group_by(GroupedFindings.severity))

router = APIRouter()

@router.get("/")
def get_grouped_findings(db: Session = Depends(get_db), skip: int = 0, limit: int = 50):
    grouped_findings = db.query(GroupedFindings).offset(skip).limit(limit).all()
    return grouped_findings

@router.get("/severity-stats/", response_model=List[GroupedFindingsStats])
def get_severity_count(db: Session = Depends(get_db)):
    results = db.query(GroupedFindings.severity, func.count(GroupedFindings.id)).group_by(GroupedFindings.severity).all()
    return [GroupedFindingsStats(severity=row[0], count=row[1]) for row in results]
