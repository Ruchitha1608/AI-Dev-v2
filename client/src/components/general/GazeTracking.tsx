import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const GazeTracking: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isLookingAway, setIsLookingAway] = useState<boolean>(false);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                startVideo();
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };

        const startVideo = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((err) => console.error("Error starting video:", err));
        };

        const analyzeGaze = async () => {
            if (videoRef.current) {
                const detections = await faceapi
                    .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks();

                if (detections) {
                    const leftEye = detections.landmarks.getLeftEye();
                    const rightEye = detections.landmarks.getRightEye();

                    const eyeDirection = checkEyeDirection(leftEye, rightEye);
                    setIsLookingAway(eyeDirection === "away");
                }
            }
        };

        const checkEyeDirection = (
            leftEye: faceapi.Point[],
            rightEye: faceapi.Point[]
        ): "forward" | "away" => {
            const leftEyeX = leftEye[0].x;
            const rightEyeX = rightEye[3].x;

            if (rightEyeX - leftEyeX < 20) {
                return "away";
            }
            return "forward";
        };

        loadModels();

        const interval = setInterval(analyzeGaze, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Gaze Tracking Demo</h1>
            <video ref={videoRef} autoPlay muted width="600" height="400" />
            <p>
                Status:{" "}
                <strong style={{ color: isLookingAway ? "red" : "green" }}>
                    {isLookingAway ? "Looking Away" : "Focused"}
                </strong>
            </p>
        </div>
    );
};

export default GazeTracking;
