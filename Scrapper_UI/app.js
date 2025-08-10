// ✅ Upload Excel file
function uploadFile() {
  const fileInput = document.getElementById('excelFile');
  const file = fileInput.files[0];
  const uploadStatus = document.getElementById("uploadStatus");
  const runButton = document.getElementById("runTestsBtn");

  if (!file) {
    uploadStatus.innerText = "❗ Please select an Excel file first.";
    runButton.disabled = true;
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:8080/upload-excel", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    uploadStatus.innerText = "✅ " + data;
    runButton.disabled = false; // Enable the Run button
  })
  .catch(error => {
    uploadStatus.innerText = "❌ Upload error: " + error;
    runButton.disabled = true;
  });
}

// ✅ Clear file input field
function clearFileInput() {
  document.getElementById("excelFile").value = "";
  document.getElementById("uploadStatus").innerText = "📁 File selection cleared.";
  document.getElementById("runTestsBtn").disabled = true; // Disable Run button again
}

// ✅ Run Test Trigger
function runTests() {
  const status = document.getElementById("status");
  status.innerText = "⏳ Running tests... Please wait.";

  fetch("http://localhost:8080/run-tests", {
    method: "POST"
  })
  .then(response => response.text())
  .then(data => {
    status.innerHTML = "✅ " + data;
  })
  .catch(error => {
    status.innerText = "❌ Error: " + error;
  });
}
