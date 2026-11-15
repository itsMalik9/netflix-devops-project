
FROM python:3.12-slim AS build

WORKDIR /media-service

COPY requirements.txt .

RUN pip install --no-cache-dir --prefix=/install -r requirements.txt


FROM python:3.12-slim

WORKDIR /media-service

COPY --from=build /install /usr/local

COPY . .

RUN chmod +x /media-service/entrypoint.sh

USER 10001

EXPOSE 8000

# --timeout 600: video uploads take longer than gunicorn's default 30s and would be killed
CMD ["gunicorn", "media_service.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "600", "--access-logfile", "-"]
