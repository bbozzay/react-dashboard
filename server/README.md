# About

- Connects to a SQLite DB with some sample data
- Uses FastAPI to provide two read-only endpoints
- Use SQLAlchemy for ORM

## Getting Started

1. install dependencies (see requirements.txt for more info)

```
pip install -r requirements.txt
```

2. Start the dev server:

```
python -m uvicorn main:app
```

3. Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

## API Endpoints

```
/api/v1/group-findings
/api/v1/raw-findings
/api/v1/raw-findings/:group_finding_id
```
