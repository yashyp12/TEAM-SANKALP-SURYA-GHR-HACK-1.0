const video = document.getElementById('webcam');
const canvas = document.getElementById('outputCanvas');
const startBtn = document.getElementById('startBtn');
const fileInput = document.getElementById('fileInput');
const resultsDiv = document.getElementById('detectionResults');
const statusMessage = document.getElementById('statusMessage');

let stream;

// Webcam initialization
async function initWebcam() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        startBtn.textContent = 'Stop Webcam';
        startDetection();
    } catch (err) {
        alert('Error accessing webcam: ' + err);
    }
}

// Start/Stop webcam handler
startBtn.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        startBtn.textContent = 'Start Webcam';
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    } else {
        initWebcam();
    }
});

// Image upload handler
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => processImage(img);
    }
});

// Process frame for detection
async function processImage(image) {
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    const response = await sendToBackend(imageData);
    updateUI(response);
}

// Send image to backend
async function sendToBackend(imageData) {
    statusMessage.textContent = 'Analyzing image...';
    
    const blob = await fetch(imageData).then(r => r.blob());
    const formData = new FormData();
    formData.append('image', blob, 'frame.jpg');

    try {
        const response = await fetch('http://localhost:5000/detect', {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch (err) {
        statusMessage.textContent = 'Error connecting to server';
        console.error(err);
    }
}

// Update UI with results
function updateUI(response) {
    resultsDiv.innerHTML = '';
    
    if (response.error) {
        statusMessage.textContent = response.error;
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    
    response.detections.forEach(d => {
        // Draw bounding boxes
        const [x1, y1, x2, y2] = d.bbox;
        ctx.strokeStyle = d.class === 'missing' ? '#dc3545' : '#28a745';
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        
        // Add results to list
        const item = document.createElement('div');
        item.className = 'detection-item';
        item.innerHTML = `
            <span class="class-name">${d.class}</span>
            <span class="confidence">${(d.confidence * 100).toFixed(1)}%</span>
        `;
        resultsDiv.appendChild(item);
    });

    // Show summary
    statusMessage.innerHTML = `
        <div class="summary">
            Required PPE: ${response.summary.required.join(', ')}<br>
            Detected: ${response.summary.detected.join(', ') || 'None'}<br>
            Missing: <span class="missing">${response.summary.missing.join(', ') || 'None'}</span>
        </div>
    `;
}

// Start periodic detection
function startDetection() {
    setInterval(() => {
        if (stream) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            processImage(canvas);
        }
    }, 1000); // Process every 1 second
}