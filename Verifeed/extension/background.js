

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "CHECK_FRAME") {

        console.log("📡 Sending FRAME → /predict_image");

        fetch("http://127.0.0.1:8000/predict_image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image: message.image
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log("✅ IMAGE RESPONSE:", data);

                sendResponse(data); // 🔥 IMPORTANT FIX
            })
            .catch(err => {
                console.error("❌ FRAME ERROR:", err);

                sendResponse({ label: "REAL", confidence: 0 });
            });

        return true; 
    }
});