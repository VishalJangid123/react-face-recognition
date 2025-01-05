# Face Landmark Detection with TensorFlow.js

This project is a **React application** that uses **TensorFlow.js** to perform **face landmark detection** on images or live video from a webcam. Users can either upload an image or enable their webcam, and the app will detect and mark facial landmarks in real time.

## Live Demo
 - Video : https://vishaljangid123.github.io/react-face-recognition/#/video
 - Image : https://vishaljangid123.github.io/react-face-recognition/

## Tech Stack

- **React**
- **TensorFlow.js**: A JavaScript library for training and deploying machine learning models in the browser.
- **@tensorflow-models/face-landmarks-detection**: A pre-trained TensorFlow model for detecting facial landmarks in images and video.
- **HTML5 Canvas**: Used for drawing the landmarks on the uploaded image or the live video feed.

## Screenshots
| Image | Image | Web cam |
|-------|--------|------------|
|<img width="1468" alt="Screenshot 2568-01-05 at 17 09 18" src="https://github.com/user-attachments/assets/144e3667-ef44-4f11-a752-d3d0235f6cab" /> | <img width="1468" alt="Screenshot 2568-01-05 at 17 08 39" src="https://github.com/user-attachments/assets/8f92732f-03c5-4887-b0c1-2c84bc095814" />| <img width="1468" alt="Screenshot 2568-01-05 at 17 36 42" src="https://github.com/user-attachments/assets/02ab2676-e12d-401d-860b-4551b49e70d5" />|





## Features

1. **Image Upload Route:**
    - Users can upload an image and the app will detect and display the facial landmarks on the image.
    - If a face is detected, the landmarks (e.g., eyes, nose, mouth) are drawn on the canvas overlaying the image.
2. **Webcam Route:**
    - Users can enable their webcam, and the app will continuously detect and display facial landmarks on the live webcam video feed.
    - This allows for real-time face tracking.

## How to Use

### 1. **Image Upload Route:**

- On the home page, you can upload an image using the file input. Once the image is uploaded, the app will automatically detect and display facial landmarks.
- The canvas will be drawn on top of the uploaded image, and the facial landmarks will be shown in red.

### 2. **Webcam Route:**

- You can also click on a button to start the webcam. Once the webcam is opened, the app will detect the face landmarks in real-time.
- The app will continuously detect and display facial landmarks as long as the webcam is active.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/VishalJangid123/react-face-recognition.git
cd react-face-recognition
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm start
```

Your app will now be running at `http://localhost:3000`.

## Folder Structure

```bash
/src
  /components
    - Home.js  # Handles face detection for image
    - Video.js          # Handles webcam video stream and face detection
```

## Notes

- Ensure that you have a webcam connected to your computer if you want to use the live webcam feature.
- The app might take some time to load the face detection model for the first time, so please be patient.
- Make sure to use an up-to-date browser that supports TensorFlow.js (Chrome, Firefox, Edge, etc.).
