
# PPE Detection System using YOLOv5

![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.8%2B-green)
![YOLOv5](https://img.shields.io/badge/YOLO-v5-ff69b4)

A computer vision system to detect Personal Protective Equipment (PPE) like helmets, vests, gloves, etc., using YOLOv5. 

## 📌 Overview
- Detects 7 PPE classes: `Dust Mask`, `Eye Wear`, `Glove`, `Protective Boots`, `Protective Helmet`, `Safety Vest`, `Shield`
- Trained on a custom dataset with YOLOv5
- Real-time inference support for images/videos

## 🚀 Features
- Custom-trained YOLOv5 model
- Easy-to-use inference scripts
- Training and validation metrics tracking

## 📥 Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/PPE-DETECTOR-HACK-1.0.git
   cd PPE-DETECTOR-HACK-1.0
   ```

2. **Install dependencies**:
   ```bash
   pip install -r yolov5/requirements.txt
   ```

## 🛠️ Usage
### Inference on Images/Videos
Run detection on your media:
```bash
python yolov5/detect.py \
  --weights runs/train/ppe_detector_v1/weights/best.pt \
  --source input.jpg \
  --conf 0.5
```

### Training
To retrain the model:
```bash
cd yolov5
python train.py \
  --img 640 \
  --batch 16 \
  --epochs 100 \
  --data ../PPE_Detection.v2i.yolov5pytorch/data.yaml \
  --weights yolov5s.pt \
  --name ppe_detector_v1
```

## 📂 Dataset
- **Structure**:
  ```
  PPE_Detection.v2i.yolov5pytorch/
    ├── train/
    │   ├── images/
    │   └── labels/
    ├── valid/
    └── data.yaml
  ```
- **Classes**: 7 PPE categories (see `data.yaml` for details).

## 📊 Results
![Training Metrics](yolov5/runs/train/ppe_detector_v1/results.png)  
*Example training metrics (mAP, loss, etc.)*

## 🤝 Contributing
1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📜 License
MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments
- [Ultralytics YOLOv5](https://github.com/ultralytics/yolov5)
- Roboflow for dataset support
```
