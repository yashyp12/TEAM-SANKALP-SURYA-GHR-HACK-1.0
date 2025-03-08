from ultralytics import YOLO

# Load pre-trained YOLOv8 model
model = YOLO("yolov8n.pt")

def detect_ppe(image_path):
    results = model(image_path)  # Run detection
    return results

if __name__ == "__main__":
    result = detect_ppe("sample.jpg")  # Test with a sample image
    result.show()
