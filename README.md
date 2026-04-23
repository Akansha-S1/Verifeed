<img width="2816" height="1536" alt="Gemini_Generated_Image_80bze580bze580bz" src="https://github.com/user-attachments/assets/1caeb0fd-09a0-4e02-afa9-034ef5056473" /><img width="693" height="178" alt="image" src="https://github.com/user-attachments/assets/e80ab012-b3a7-4fd6-971c-f188eec08748" />**🚀 VeriFeed**

AI-Powered Cross-Platform System for Real-Time Deepfake Detection with Non-Intrusive Visual Alerts

**📌 Overview**

VeriFeed is a full-stack AI system designed to detect deepfake and manipulated media in real-time across social media platforms. It integrates a browser extension for content capture, a FastAPI backend, and a hybrid AI detection pipeline combining a custom CNN model with external verification APIs.

This hybrid approach ensures higher accuracy, robustness, and real-time performance, while maintaining a non-intrusive user experience through visual alert overlays.

**Key Features**
1) Real-Time Deepfake Detection
2) Hybrid AI Model (CNN + API Integration)
3) Cross-Platform Compatibility
4) Browser Extension for Feed Capture
5) Non-Intrusive Visual Alerts (Overlay-based)
6) FastAPI Backend for Scalable Inference
7) Image / Multi-frame Analysis Support


**Tech Stack**
<img width="693" height="178" alt="image" src="https://github.com/user-attachments/assets/dddd5a76-d628-4e13-97ab-d6fa93a6d7ad" />

📂**Project Structure**

<img width="455" height="371" alt="image" src="https://github.com/user-attachments/assets/3380ef57-83b6-4fc0-8855-a08282d8c0e8" />

**Installation & Setup
🔹 1. Clone the Repository**
git clone https://github.com/Akansha-S1/Verifeed.git
cd Verifeed
**🔹 2. Backend Setup (FastAPI)**
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

**Run the server:**

uvicorn main:app --reload

**Backend runs at:**

http://127.0.0.1:8000


**🔹 3. Frontend Setup (Chrome Extension)**


Open chrome://extensions/
Enable Developer Mode
Click Load Unpacked
Select the frontend/ folder

**API Workflow**

<img width="2816" height="1536" alt="Gemini_Generated_Image_80bze580bze580bz" src="https://github.com/user-attachments/assets/1d5fd018-10d0-4dbd-b9c3-0f9566e7fb7a" />


**Step	Description**

<img width="692" height="187" alt="image" src="https://github.com/user-attachments/assets/af902a16-78bd-41f0-a2b1-102cb169849b" />


**Example API Response**


{
  "status": "success",
  "prediction": "deepfake",
  "confidence": 0.92
}
**AI Model Strategy**

Hybrid Detection Approach

**VeriFeed uses a dual-layer AI pipeline:
🤖 Custom CNN Model**

Trained for image-based deepfake detection
Fast inference for real-time use
Handles core classification
🌐 External API (e.g., Sightengine)
Provides additional validation
Improves detection reliability
Handles edge cases
**Why Hybrid?**
✅ Higher accuracy than standalone models
✅ Reduced false positives/negatives
✅ More robust across diverse content
✅ Scalable for real-world deployment
🚧 Future Enhancements
🎥 Video-based deepfake detection
🧠 Advanced CNN / Transformer architectures
☁️ Cloud deployment (AWS / GCP)
📊 Analytics dashboard
🔐 Trust scoring system for media
🧩 Challenges Addressed
Real-time inference latency
Cross-platform media capture
Seamless UI overlay integration
Reliable backend communication
Handling dynamic and noisy input data
**Author**
Akansha Shetty
AI & Data Engineering | Jain University

**License**

This project is intended for academic and research purposes.

**💡 Vision**

VeriFeed aims to build a trust layer for digital content, enabling users to instantly identify manipulated media and make informed decisions in an era of rapidly spreading misinformation.
