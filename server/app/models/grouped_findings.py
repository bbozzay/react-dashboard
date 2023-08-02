from typing import List, Optional, Union

from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, REAL
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class GroupedFindings(Base):
    __tablename__ = "grouped_findings"

    id = Column(Integer, primary_key=True, index=True)
    grouping_type = Column(String)
    grouping_key = Column(String)
    severity = Column(String)
    grouped_finding_created = Column(String)
    sla = Column(String)
    description = Column(String)
    security_analyst = Column(String)
    owner = Column(String)
    status = Column(String)
    progress = Column(REAL)
