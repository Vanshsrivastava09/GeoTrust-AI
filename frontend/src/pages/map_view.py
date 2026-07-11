import streamlit as st
from ..components.spatial_map import render_spatial_map

def render_map_view():
    """Map view page"""
    st.title("🗺️ Spatial View")
    st.markdown("Interactive map visualization of geospatial insights")
    
    insight_id = st.number_input("Enter Insight ID", min_value=1, value=1)
    
    if st.button("Load Map"):
        render_spatial_map(insight_id)