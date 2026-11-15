
#!/bin/sh
set -e

python manage.py migrate --noinput
python manage.py init_storage

exec "$@"
