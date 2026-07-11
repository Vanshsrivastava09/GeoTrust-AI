import streamlit as st
from ..components.source_table import render_source_table
from ..services.api_client import APIClient

def render_source_analytics():
    """Source analytics page"""
    st.title("📊 Source Analytics")
    st.markdown("Monitor data source reliability and performance")
    
    api = APIClient()
    
    try:
        sources = api.get_sources()
        render_source_table(sources)
    except Exception as e:
        st.error(f"Error loading sources: {e}")