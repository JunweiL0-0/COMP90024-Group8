FROM python:3-alpine3.14

WORKDIR /backend

COPY . /backend

RUN pip install -r requirements.txt

EXPOSE 5000

CMD python3 /backend/app/app.py