const BASE = "/api/list/singlyLinkedList";

let replayInterval = null;

function render(snapshot) {

    if (!snapshot) return;

    const container = document.getElementById("visualization");
    container.innerHTML = "";

    snapshot.state.forEach((value, index) => {

        const node = document.createElement("div");
        node.className = "node";
        node.innerText = value;

        if (snapshot.changedIndex === index) {
            if (snapshot.action === "ADD") {
                node.classList.add("added");
            }
            if (snapshot.action === "REMOVE") {
                node.classList.add("removed");
            }
        }

        container.appendChild(node);
    });
}

function callAPI(endpoint) {
    fetch(endpoint, { method: "POST" })
        .then(res => res.json())
        .then(data => render(data))
        .catch(err => console.error("API Error:", err));
}

// ================= ADD OPERATIONS =================

function addFirst() {
    const value = document.getElementById("valueInput").value;
    if (!value) return;
    callAPI(`${BASE}/addFirst/${value}`);
}

function addLast() {
    const value = document.getElementById("valueInput").value;
    if (!value) return;
    callAPI(`${BASE}/addLast/${value}`);
}

function addAt() {
    const value = document.getElementById("valueInput").value;
    const idx = document.getElementById("indexInput").value;

    if (!value || idx === "") return;

    callAPI(`${BASE}/addAt/${value}/${idx}`);
}

// ================= REMOVE OPERATIONS =================

function removeFirst() {
    callAPI(`${BASE}/removeFirst`);
}

function removeLast() {
    callAPI(`${BASE}/removeLast`);
}

function removeAt() {
    const idx = document.getElementById("indexInput").value;
    if (idx === "") return;
    callAPI(`${BASE}/removeAt/${idx}`);
}

// ================= REPLAY =================

function replay() {

    fetch(`${BASE}/history`)
        .then(res => res.json())
        .then(history => {

            if (replayInterval) {
                clearInterval(replayInterval);
            }

            let i = 0;

            replayInterval = setInterval(() => {

                render(history[i]);
                i++;

                if (i >= history.length) {
                    clearInterval(replayInterval);
                }

            }, 600);
        });
}

// ================= RESET =================

function resetSystem() {

    if (replayInterval) {
        clearInterval(replayInterval);
    }

    fetch(`${BASE}/clearHistory`, {
        method: "POST"
    }).then(() => {
        document.getElementById("visualization").innerHTML = "";
    });
}
