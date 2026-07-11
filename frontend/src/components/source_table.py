import streamlit as st
import pandas as pd

def render_source_table(sources: list):
    """Render the source reliability table"""
    if not sources:
        st.write("No sources available.")
        return
    
    table_data = []
    for s in sources:
        table_data.append({
            "Source Name": s.get('name', 'Unknown'),
            "Sensor Type": s.get('sensor_type', 'N/A'),
            "Credibility": f"{s.get('credibility_baseline', 0)*100:.0f}%",
            "Metadata": f"{s.get('metadata_completeness', 0)*100:.0f}%",
            "Status": "Active" if s.get('is_active', True) else "Inactive"
        })
    
    df = pd.DataFrame(table_data)
    st.dataframe(df, hide_index=True, use_container_width=True)