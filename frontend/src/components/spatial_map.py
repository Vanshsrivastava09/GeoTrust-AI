import streamlit as st
import folium
from streamlit_folium import st_folium
from ..config import Config
from ..services.api_client import APIClient

def render_spatial_map(insight_id: int, region: dict = None):
    """Render the spatial map component"""
    api = APIClient()
    
    try:
        observations = api.get_observations(insight_id)
        sources = api.get_sources()
        source_map = {s['id']: s for s in sources}
    except Exception as e:
        st.error(f"Error loading map data: {e}")
        return
    
    m = folium.Map(
        location=Config.DEFAULT_MAP_CENTER,
        zoom_start=Config.DEFAULT_ZOOM,
        tiles="CartoDB positron"
    )
    
    # Add queried region if provided
    if region:
        folium.GeoJson(
            region,
            name="Queried Region",
            style_function=lambda x: {
                "fillOpacity": 0,
                "color": "black",
                "weight": 2,
                "dashArray": "5, 5"
            }
        ).add_to(m)
    
    # Add observation polygons
    colors = ['blue', 'red', 'green', 'purple', 'orange', 'darkred']
    for i, obs in enumerate(observations):
        source = source_map.get(obs['source_id'], {})
        source_name = source.get('name', f"Source {obs['source_id']}")
        color = colors[i % len(colors)]
        
        folium.GeoJson(
            obs['spatial_extent'],
            name=f"{source_name} ({obs['data_type']})",
            style_function=lambda x, c=color: {
                "fillColor": c,
                "color": c,
                "weight": 2,
                "fillOpacity": 0.4
            }
        ).add_to(m)
    
    folium.LayerControl().add_to(m)
    st_folium(m, width=700, height=500)