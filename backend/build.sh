#!/usr/bin/env bash
# build.sh

echo "Building project..."
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
