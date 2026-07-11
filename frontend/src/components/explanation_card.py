import streamlit as st

def render_explanation_card(explanation: str):
    """Render the explanation card component"""
    st.subheader("📖 AI Explanation")
    st.info(explanation)