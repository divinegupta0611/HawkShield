import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const videoRefs = useRef({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hawkshield_cameras") || "[]");
    setCameras(saved);
  }, []);

  useEffect(() => {
    cameras.forEach(async (cam) => {
      if (cam.type === "webcam") {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRefs.current[cam.id]) {
          videoRefs.current[cam.id].srcObject = stream;
        }
      }
    });
  }, [cameras]);

  return (
    <div style={{ padding: "30px" }}>
        <NavBar/>
      <h1>Camera Dashboard</h1>
      <p>Live view of all connected cameras</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {cameras.map((cam) => (
          <div
            key={cam.id}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "#111",
              color: "white",
              border: "1px solid #333",
            }}
          >
            <h3>{cam.name} ({cam.id})</h3>

            <video
              ref={(el) => (videoRefs.current[cam.id] = el)}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                height: "240px",
                background: "black",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            ></video>
          </div>
        ))}
      </div>

      {cameras.length === 0 && <p>No cameras added yet.</p>}
    </div>
  );
}

