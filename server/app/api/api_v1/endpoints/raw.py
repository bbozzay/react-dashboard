from sqlalchemy.orm import Session
from app.db.get_db import get_db

from fastapi import APIRouter, Depends
from app.models.raw_findings import RawFindings

router = APIRouter()

@router.get("/")
def get_raw_findings(db: Session = Depends(get_db)):
    raw_findings = db.query(RawFindings).all()
    return raw_findings

@router.get("/{grouped_finding_id}")
def get_raw_findings_by_id(grouped_finding_id: int, db: Session = Depends(get_db)):
    # raw_findings = db.query(RawFindings).filter(RawFindings.id == id).first()
    # return raw_findings
    raw_findings = db.query(RawFindings).filter(RawFindings.grouped_finding_id == grouped_finding_id).first()
    return raw_findings