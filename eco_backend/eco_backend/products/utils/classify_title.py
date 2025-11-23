"""
eco_backend/products/utils/classify_title.py

Utility to classify a product title into category & subcategory using NVIDIA API.

Environment:
    export NV_API_KEY="your_real_api_key"

Usage:
    from eco_backend.products.utils.classify_title import classify_title
    result = classify_title("Natural Clean Bamboo Toothbrush - with Charcoal Bristles")
"""

import os
import json
import re
import requests
from typing import Dict, Optional

BASE = "https://integrate.api.nvidia.com/v1/chat/completions"
MODEL = "meta/llama-4-maverick-17b-128e-instruct"


def build_messages(title: str) -> list:
    """Build message list for NVIDIA chat API."""
    system = {
        "role": "system",
        "content": (
            "You receive a single product title. Predict the best single 'category' "
            "and 'subcategory' for that title. Output ONLY valid JSON with exactly two keys: "
            "'category' and 'subcategory'. Use lowercase single words or short phrases. "
            "Do NOT add any extra text or formatting."
        ),
    }

    examples = [
        {"role": "user", "content": "title: 'Natural Clean Bamboo Toothbrush – with Charcoal Bristles'"},
        {"role": "assistant", "content": json.dumps({"category": "personal care", "subcategory": "toothbrush"})},
        {"role": "user", "content": "title: 'Ecotyl Cold Pressed Almond Oil - Sweet'"},
        {"role": "assistant", "content": json.dumps({"category": "personal care", "subcategory": "haircare"})},
        {"role": "user", "content": "title: 'Green Leaf Wrap Envelop(5 x 8) inches(PACK OF 12)'"},
        {"role": "assistant", "content": json.dumps({"category": "stationary", "subcategory": "envelope"})},
        {"role": "user", "content": f"title: '{title}'"},
    ]
    return [system] + examples


def extract_json_from_text(text: str) -> Optional[Dict]:
    """Try to find the first JSON object in text and parse it."""
    match = re.search(r"\{.*?\}", text, flags=re.DOTALL)
    if not match:
        return None
    json_str = match.group(0)
    json_str = re.sub(r",\s*}", "}", json_str)
    json_str = re.sub(r",\s*\]", "]", json_str)
    try:
        return json.loads(json_str)
    except Exception:
        alt = json_str.replace("'", '"')
        try:
            return json.loads(alt)
        except Exception:
            return None


def classify_title(title: str) -> Dict:
    """
    Classify a product title into category/subcategory.
    Returns a dict with keys: category, sub_category, raw_model_output.
    """

    api_key = os.getenv("NV_API_KEY")
    if not api_key:
        raise EnvironmentError("NV_API_KEY not set in environment variables")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": build_messages(title),
        "temperature": 0.0,
        "top_p": 1.0,
        "max_tokens": 120,
    }

    resp = requests.post(BASE, headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    data = resp.json()

    content = None
    try:
        content = data["choices"][0]["message"]["content"]
    except Exception:
        content = data["choices"][0].get("text")

    if not content:
        return {"error": "No content in model response", "raw": data}

    parsed = extract_json_from_text(content)
    if not parsed:
        return {"error": "Could not parse JSON", "model_output": content}

    category = parsed.get("category", "").strip().lower()
    subcategory = parsed.get("subcategory", "").strip().lower()

    return {
        "category": category,
        "sub_category": subcategory,
        "raw_model_output": content,
    }
