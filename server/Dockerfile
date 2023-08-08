# Use Python 3.10.2 slim image as base
FROM python:3.10.2-slim-bullseye

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Expose port 8000
EXPOSE 8000

# Run API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
