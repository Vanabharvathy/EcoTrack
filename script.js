// Points for each waste type

const pointsPerItem = {

    "Plastic": 2,

    "Paper": 1,

    "Can": 2,

    "E-Waste": 10,

    "Cardboard": 2

};


// Store recycling records

let records =
    JSON.parse(localStorage.getItem("ecoRecords")) || [];


// Submit waste

function submitWaste() {

    const name =
        document.getElementById("studentName").value.trim();

    const department =
        document.getElementById("department").value;

    const waste =
        document.getElementById("wasteType").value;

    const quantity =
        Number(document.getElementById("quantity").value);


    // Validation

    if (!name || !department || !waste || quantity <= 0) {

        alert("Please fill all the details.");

        return;
    }


    // Calculate points

    const points =
        pointsPerItem[waste] * quantity;


    // Create record

    const record = {

        name: name,

        department: department,

        waste: waste,

        quantity: quantity,

        points: points

    };


    // Add record

    records.push(record);


    // Save data

    localStorage.setItem(
        "ecoRecords",
        JSON.stringify(records)
    );


    alert(
        `Successfully submitted! You earned ${points} Eco Points 🌱`
    );


    // Clear form

    document.getElementById("studentName").value = "";

    document.getElementById("department").value = "";

    document.getElementById("wasteType").value = "";

    document.getElementById("quantity").value = "";


    // Update website

    updateDashboard();

}


// Update leaderboard and statistics

function updateDashboard() {

    const students = {};


    let totalWaste = 0;

    let totalPoints = 0;


    records.forEach(record => {

        totalWaste += record.quantity;

        totalPoints += record.points;


        if (!students[record.name]) {

            students[record.name] = {

                name: record.name,

                department: record.department,

                points: 0

            };

        }


        students[record.name].points +=
            record.points;

    });


    // Convert to array

    const leaderboard =
        Object.values(students);


    // Sort highest points first

    leaderboard.sort(
        (a, b) => b.points - a.points
    );


    // Display leaderboard

    const table =
        document.getElementById("leaderboardBody");


    table.innerHTML = "";


    leaderboard.forEach((student, index) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.points}</td>

        `;


        table.appendChild(row);

    });


    // Statistics

    document.getElementById("totalWaste")
        .textContent = totalWaste;


    document.getElementById("totalStudents")
        .textContent = Object.keys(students).length;


    document.getElementById("totalPoints")
        .textContent = totalPoints;

}


// Scroll to recycling section

function goToRecycle() {

    document
        .getElementById("recycle")
        .scrollIntoView();

}


// Load saved data when page opens

updateDashboard();
// ===============================
// QR CODE SCANNER
// ===============================

function onScanSuccess(decodedText, decodedResult) {

    console.log("QR Code scanned:", decodedText);

    const result = document.getElementById("scan-result");

    result.textContent = "✅ Scanned: " + decodedText;

    const wasteType = document.getElementById("wasteType");

    if (decodedText.toLowerCase().includes("plastic")) {

        wasteType.value = "Plastic";

        alert("♻️ Plastic Bin Detected!");

        document.getElementById("recycle").scrollIntoView();

    }

    else if (decodedText.toLowerCase().includes("paper")) {

        wasteType.value = "Paper";

        alert("📄 Paper Bin Detected!");

        document.getElementById("recycle").scrollIntoView();

    }

    else if (decodedText.toLowerCase().includes("can")) {

        wasteType.value = "Can";

        alert("🥫 Can Bin Detected!");

        document.getElementById("recycle").scrollIntoView();

    }

    else if (decodedText.toLowerCase().includes("ewaste")) {

        wasteType.value = "E-Waste";

        alert("💻 E-Waste Bin Detected!");

        document.getElementById("recycle").scrollIntoView();

    }

    else if (decodedText.toLowerCase().includes("cardboard")) {

        wasteType.value = "Cardboard";

        alert("📦 Cardboard Bin Detected!");

        document.getElementById("recycle").scrollIntoView();

    }

    else {

        alert("QR Code detected, but waste type was not recognized.");

    }
}


// Start QR Scanner

const html5QrCode = new Html5Qrcode("reader");

const scannerConfig = {
    fps: 10,
    qrbox: {
        width: 250,
        height: 250
    }
};

html5QrCode.start(
    { facingMode: "environment" },
    scannerConfig,
    onScanSuccess
).catch(function(error) {

    console.log("QR Scanner could not start:", error);

});