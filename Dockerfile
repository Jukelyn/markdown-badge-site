FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install curl
RUN apt-get update && apt-get install --no-install-recommends -y curl && rm -rf /var/lib/apt/lists/*

COPY . .

RUN groupadd -g 1000 appuser && useradd -u 1000 -g appuser appuser \
    && mkdir -p /app/data \
    && chown -R appuser:appuser /app/data

USER appuser

EXPOSE 5000
CMD ["python", "run.py"]

HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:5000/health || exit 1
