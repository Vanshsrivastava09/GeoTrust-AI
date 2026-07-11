import streamlit as st
from config import Config
from pages import render_dashboard, render_map_view, render_source_analytics

st.set_page_config(
    page_title=Config.APP_TITLE,
    page_icon=Config.APP_ICON,
    layout="wide",
    initial_sidebar_state="expanded"
)

if 'evaluate' not in st.session_state:
    st.session_state['evaluate'] = False

with st.sidebar:
    st.title(f"{Config.APP_ICON} GeoTrust AI")
    
    page = st.radio(
        "Navigation",
        ["Dashboard", "Map View", "Source Analytics"],
        index=0
    )
    
    st.markdown("---")
    st.markdown("### About")
    st.info("v1.0.0 - Hackathon Edition")

if page == "Dashboard":
    render_dashboard()
elif page == "Map View":
    render_map_view()
elif page == "Source Analytics":
    render_source_analytics()