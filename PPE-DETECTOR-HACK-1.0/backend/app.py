from flask import Flask, request, jsonify
from detection.detector import PPE_Detector

app = Flask(__name__)
detector = PPE_Detector('models/yolov8n-ppe.pt')

@app.route('/detect', methods=['POST'])
def detect():
    image = request.files['image'].read()
    results = detector.detect(image)
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5000)