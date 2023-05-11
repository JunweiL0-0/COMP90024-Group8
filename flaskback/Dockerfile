FROM python:3.11.3-alpine3.16
WORKDIR /app
#COPY requirements.txt.txt /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 8080
CMD ["python3", "app.py"]