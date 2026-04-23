document.addEventListener("DOMContentLoaded", () => {

    chrome.storage.local.get("result", (data) => {

        const statusEl = document.getElementById("status");
        const scoreEl = document.getElementById("score");

        if (!data.result) {
            statusEl.innerText = "No data";
            return;
        }

        const res = data.result;

        statusEl.innerText = res.status;
        scoreEl.innerText = "Score: " + res.score;

        if (res.status === "Safe") statusEl.style.color = "green";
        else if (res.status === "Suspicious") statusEl.style.color = "orange";
        else statusEl.style.color = "red";
    });
});