import sys
import os
import json
from datetime import datetime, timedelta

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Source, Observation, Insight

def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    
    try:
        # Clear existing data
        db.query(Observation).delete()
        db.query(Insight).delete()
        db.query(Source).delete()
        db.commit()

        # Create Sources
        s1 = Source(
            name="Sentinel-2 Optical",
            sensor_type="Optical Satellite",
            resolution=10.0,
            credibility_baseline=0.85,
            metadata_completeness=0.9
        )
        s2 = Source(
            name="Sentinel-1 Radar",
            sensor_type="Radar Satellite",
            resolution=20.0,
            credibility_baseline=0.80,
            metadata_completeness=0.85
        )
        s3 = Source(
            name="IoT River Gauge",
            sensor_type="IoT Water Sensor",
            resolution=0.0,
            credibility_baseline=0.95,
            metadata_completeness=0.7
        )
        
        db.add_all([s1, s2, s3])
        db.commit()
        db.refresh(s1)
        db.refresh(s2)
        db.refresh(s3)

        # Create overlapping observations
        poly_s1 = {"type": "Polygon", "coordinates": [[[0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], [0.0, 0.0]]]}
        poly_s2 = {"type": "Polygon", "coordinates": [[[0.5, 0.5], [1.5, 0.5], [1.5, 1.5], [0.5, 1.5], [0.5, 0.5]]]}
        poly_s3 = {"type": "Polygon", "coordinates": [[[0.75, 0.75], [0.85, 0.75], [0.85, 0.85], [0.75, 0.85], [0.75, 0.75]]]}

        now = datetime.utcnow()
        obs1 = Observation(
            source_id=s1.id,
            timestamp=now - timedelta(hours=2),
            data_type="flood_extent",
            spatial_extent=poly_s1
        )
        obs2 = Observation(
            source_id=s2.id,
            timestamp=now - timedelta(hours=1),
            data_type="flood_extent",
            spatial_extent=poly_s2
        )
        obs3 = Observation(
            source_id=s3.id,
            timestamp=now,
            data_type="flood_extent",
            spatial_extent=poly_s3
        )

        db.add_all([obs1, obs2, obs3])
        db.commit()
        
        print("✅ Mock data seeded successfully!")
        print(f"Sources: {s1.name}, {s2.name}, {s3.name}")
        print("Observations: 3 overlapping flood extent polygons created.")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()