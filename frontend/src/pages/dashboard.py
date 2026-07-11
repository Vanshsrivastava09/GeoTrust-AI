import streamlit as st
from datetime import datetime, timedelta
from ..components import render_trust_meter, render_spatial_map, render_explanation_card, render_source_table
from ..services.api_client import APIClient

def render_dashboard():
    """Main dashboard page"""
    st.title("🌍 GeoTrust AI Dashboard")
    st.markdown("### Multi-Source Geospatial Trust Evaluation")
    
    with st.sidebar:
        st.header("🔍 Query Parameters")
        
        insight_type = st.selectbox(
            "Insight Type",
            ["flood_extent", "crop_stress", "deforestation", "urban_growth"]
        )
        
        col1, col2 = st.columns(2)
        with col1:
            time_start = st.date_input("Start Date", datetime.utcnow() - timedelta(days=2))
        with col2:
            time_end = st.date_input("End Date", datetime.utcnow())
        
        if st.button("🚀 Evaluate Trust", type="primary", use_container_width=True):
            st.session_state['evaluate'] = True
            st.session_state['query_params'] = {
                "insight_type": insight_type,
                "time_start": time_start,
                "time_end": time_end
            }
            st.rerun()
    
    if st.session_state.get('evaluate'):
        query = st.session_state['query_params']
        api = APIClient()
        
        with st.spinner("Running Trust Evaluation Pipeline..."):
            try:
                region = {
                    "type": "Polygon",
                    "coordinates": [[[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]]
                }
                
                insight = api.submit_insight(
                    region=region,
                    time_start=query['time_start'].isoformat() + "Z",
                    time_end=query['time_end'].isoformat() + "Z",
                    insight_type=query['insight_type']
                )
                
                if insight.get('trust_score'):
                    render_trust_meter(insight['trust_score'])
                    
                    col1, col2 = st.columns([2, 1])
                    with col1:
                        render_spatial_map(insight['id'], region)
                    with col2:
                        render_explanation_card(insight['trust_score']['explanation'])
                    
                    st.markdown("---")
                    sources = api.get_sources()
                    st.subheader("📡 Source Reliability")
                    render_source_table(sources)
                else:
                    st.warning("Trust score not yet computed. Please wait...")
                    st.rerun()
                    
            except Exception as e:
                st.error(f"Evaluation failed: {str(e)}")