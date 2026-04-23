import random

def calculate_risk(url):
    score = 0

    # Basic rules (you can upgrade later)
    if "https" not in url:
        score += 30

    if "login" in url or "verify" in url:
        score += 25

    if len(url) > 50:
        score += 20

    # Random factor (simulate intelligence)
    score += random.randint(0, 25)

    # Classification
    if score <= 30:
        status = "Safe"
    elif score <= 70:
        status = "Suspicious"
    else:
        status = "Unsafe"

    return score, status