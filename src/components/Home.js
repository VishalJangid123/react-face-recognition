import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import SampleImage from "../SampleImage";
import { sampleImages } from "../constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [detector, setDetector] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: "tfjs",
      };

      const detector = await faceLandmarksDetection.createDetector(
        model,
        detectorConfig
      );
      setDetector(detector);
      console.log("Face Landmarks Detection model loaded");
    };

    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const drawLandmarks = (ctx, landmarks) => {
    ctx.fillStyle = "aqua";
    console.log(landmarks);
    landmarks.forEach(([x, y]) => {
      console.log("object = ", x, y);
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 3 * Math.PI);
      ctx.fill();
    });
  };

  const resizeImage = (img, maxWidth = 800) => {
    const aspectRatio = img.width / img.height;
    const newWidth = Math.min(maxWidth, img.width);
    const newHeight = newWidth / aspectRatio;
    return { width: newWidth, height: newHeight };
  };

  const detectLandmarks = async () => {
    if (detector && imageRef.current && canvasRef.current) {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const { width, height } = resizeImage(img);
      canvas.width = width;
      canvas.height = height;
      console.log(canvas.width);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      try {
        const tensor = tf.browser.fromPixels(canvas);
        const predictions = await detector.estimateFaces(tensor);
        console.log("pred = ", predictions);
        if (predictions.length > 0) {
          setIsFaceDetected(true);
          predictions.forEach((prediction) => {
            if (prediction && prediction.keypoints) {
              const landmarks = prediction.keypoints;
              console.log("pre - landmarks ", landmarks);
              const faceLandmarks2D = landmarks.map((point) => [
                point.x,
                point.y,
              ]);
              drawLandmarks(ctx, faceLandmarks2D);
            } else {
              console.error(
                "Spatial keypoints not found in prediction:",
                prediction
              );
            }
          });
        } else {
          setIsFaceDetected(false);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (imageSrc && detector) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        imageRef.current = img;
        detectLandmarks();
      };

      img.onerror = (err) => {
        console.error("Error loading image:", err);
      };
    }
  }, [imageSrc, detector]);

  return (
    <div className="App">
      <h1>
        Face Landmark Detection with TensorFlow.js /
      </h1>
        <button className="btn" onClick={() => navigate("video")}>
          Face landmark using web cam 
        </button>
      <div style={{ position: "relative", display: "inline-block" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        ></canvas>
      </div>
      <input type="file" onChange={handleImageUpload} />
      {isFaceDetected ? <p>Face detected!</p> : <p>No face detected</p>}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <h2>Sample Images</h2>
        {sampleImages.map((image, index) => (
          <SampleImage
            key={index}
            image={image}
            index={index}
            onSelectImage={() => setImageSrc(image.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
