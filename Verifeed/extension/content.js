

let lastSrc = null;
let isProcessing = false;


function createDot(color) {
    let existing = document.getElementById("verifeed-dot");
    if (existing) existing.remove();

    const dot = document.createElement("div");
    dot.id = "verifeed-dot";

    dot.style.position = "fixed";
    dot.style.top = "20px";
    dot.style.right = "20px";
    dot.style.width = "18px";
    dot.style.height = "18px";
    dot.style.borderRadius = "50%";
    dot.style.zIndex = "999999";
    dot.style.background = color;
    dot.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

    document.body.appendChild(dot);
}

function captureFrame(video) {
    try {
        if (!video.videoWidth || !video.videoHeight) {
            console.log("⚠ Video not ready yet");
            return null;
        }

        const canvas = document.createElement("canvas");

        const w = video.videoWidth;
        const h = video.videoHeight;
        const size = Math.min(w, h);

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            video,
            (w - size) / 2,
            (h - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
        );

        return canvas.toDataURL("image/jpeg");
    } catch (e) {
        console.log("❌ Frame capture failed:", e);
        return null;
    }
}


async function processVideo(video) {

    if (isProcessing) return;
    isProcessing = true;

    console.log("🎥 Processing NEW video (multi-frame)...");

    try {
        let results = [];

        for (let i = 0; i < 3; i++) {

            const frame = captureFrame(video);
            if (!frame) {
                await new Promise(r => setTimeout(r, 300));
                continue;
            }

            const response = await new Promise((resolve) => {
                chrome.runtime.sendMessage({ type: "CHECK_FRAME", image: frame },
                    resolve
                );
            });

            if (response && response.confidence !== undefined) {
                console.log(`📊 Frame ${i + 1}:`, response);
                results.push(response);
            }

            await new Promise(r => setTimeout(r, 400));
        }

        isProcessing = false;

        if (results.length === 0) {
            console.log("⚠ No valid results");
            return;
        }

        // 🔥 Average confidence
        let avg = results.reduce((sum, r) => sum + r.confidence, 0) / results.length;

        console.log("📊 FINAL AVERAGE:", avg);

        if (avg > 0.6) {
            createDot("red");
        } else {
            createDot("green");
        }

    } catch (e) {
        isProcessing = false;
        console.log("❌ Processing error:", e);
    }
}

setInterval(() => {

    const video = document.querySelector("video");

    if (!video) return;

    const currentSrc = video.currentSrc || video.src;

    if (currentSrc !== lastSrc) {
        lastSrc = currentSrc;

        console.log("🎯 New VIDEO CONTENT detected!");

        setTimeout(() => {
            if (
                video.readyState === 4 &&
                video.currentTime > 1 &&
                video.videoWidth > 0
            ) {
                processVideo(video);
            } else {
                console.log("⏳ Waiting for stable frame...");
            }
        }, 1200);
    }

}, 1500);