import streamlit as st
from ..config import Config

def render_trust_meter(trust_score: dict):
    """Render the trust meter component"""
    score = trust_score['score']
    
    if score >= Config.HIGH_TRUST_THRESHOLD:
        color = "green"
        label = "High Trust"
    elif score >= Config.MEDIUM_TRUST_THRESHOLD:
        color = "orange"
        label = "Medium Trust"
    else:
        color = "red"
        label = "Low Trust"
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Trust Score", f"{score:.1f} / 100")
        st.caption(f"Status: :{color}[{label}]")
    
    with col2:
        st.metric("Consistency (IoU)", f"{trust_score['consistency_weighted']*100:.1f}%")
    
    with col3:
        st.metric("Confidence", f"{trust_score['confidence']*100:.1f}%")
    
    with col4:
        st.metric("Anomaly Penalty", f"{trust_score['anomaly_penalty']*100:.1f}%")