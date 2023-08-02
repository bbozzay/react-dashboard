from typing import List, Optional, Union

from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, REAL, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class RawFindings(Base):
    __tablename__ = "raw_findings"

    id = Column(Integer, primary_key=True)
    source_security_tool_name = Column(String)
    source_security_tool_id = Column(String)
    source_collaboration_tool_name = Column(String)
    source_collaboration_tool_id = Column(String)
    severity = Column(String)
    finding_created = Column(String)
    ticket_created = Column(String)
    description = Column(String)
    asset = Column(String)
    status = Column(String)
    remediation_url = Column(String)
    remediation_text = Column(String)
    grouped_finding_id = Column(Integer, ForeignKey("grouped_findings.id"))
