import React, { useState, useRef } from "react";

import Webcam from "react-webcam";
import { runDetector } from "../utils/detector";
import { useNavigate } from "react-router-dom";

function Video() {
  const navigate = useNavigate();

  const inputResolution = {
    width: 1080,
    height: 900,
  };
  const videoConstraints = {
    width: inputResolution.width,
    height: inputResolution.height,
    facingMode: "user",
  };

  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = (videoNode) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    runDetector(video, canvasRef.current);
    setLoaded(true);
  };

  return (
    <div className="">
      <div>
        <button className="btn" onClick={() => navigate("/")}>
          Face landmark using Image
        </button>
      </div>
      <div>
        <Webcam
          width={inputResolution.width}
          height={inputResolution.height}
          style={{ visibility: "", position: "absolute" }}
          videoConstraints={videoConstraints}
          onLoadedData={handleVideoLoad}
        />
        <canvas
          ref={canvasRef}
          width={inputResolution.width}
          height={inputResolution.height}
          style={{ position: "absolute" }}
        />
        {loaded ? <></> : <header>Loading...</header>}
      </div>
    </div>
  );
}

export default Video;
