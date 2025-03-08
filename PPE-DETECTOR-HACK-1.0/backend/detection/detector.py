from ultralytics import YOLO
import cv2
import numpy as np

class PPE_Detector:
    def __init__(self, model_path):
        self.model = YOLO(model_path)
    
    def detect(self, image):
        img = cv2.imdecode(np.frombuffer(image, np.uint8), cv2.IMREAD_COLOR)
        results = self.model(img)
        return self.parse_results(results)
    
    def parse_results(self, results):
   