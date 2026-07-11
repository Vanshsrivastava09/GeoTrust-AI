.PHONY: install backend frontend db seed docker-up docker-down test

install:
	cd backend && pip install -r requirements.txt
	cd frontend && pip install -r requirements.txt

backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

frontend:
	cd frontend && streamlit run src/app.py

db:
	docker-compose up -d db

seed:
	cd backend && python scripts/seed_data.py

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

test:
	cd backend && pytest tests/ -v

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +