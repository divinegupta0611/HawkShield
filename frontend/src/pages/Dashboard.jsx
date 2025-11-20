import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [safeLogs, setSafeLogs] = useState([]);
  const [threatLogs, setThreatLogs] = useState([]);

  const videoRefs = useRef({});
  const streams = useRef({});

  // Fetch cameras from backend API
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        console.log("Fetching cameras from backend...");
        
        const response = await fetch("http://127.0.0.1:8000/api/cameras/");
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received cameras:", data);
        
        // Backend returns {cameras: [...]}
        const camerasArray = data.cameras || [];
        
        setCameras(camerasArray);
        setError(null);
      } catch (error) {
        console.error("Error fetching cameras:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
    
    // Optional: Refresh cameras every 10 seconds
    const interval = setInterval(fetchCameras, 10000);
    return () => clearInterval(interval);
  }, []);

  // Start webcam stream for each camera
  useEffect(() => {
    cameras.forEach(async (cam) => {
      const camId = cam.cameraId || cam.id;
      
      if (!streams.current[camId]) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streams.current[camId] = stream;

          if (videoRefs.current[camId]) {
            videoRefs.current[camId].srcObject = stream;
          }
        } catch (e) {
          console.log("Camera access error:", e);
        }
      }
    });

    // Cleanup function
    return () => {
      Object.values(streams.current).forEach(stream => {
        stream.getTracks().forEach(track => track.stop());
      });
    };
  }, [cameras]);

  const captureFrame = (camId) => {
  const video = videoRefs.current[camId];
  if (!video) return null;

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg");
  });
};

const sendForDetection = async (cam) => {
  const camId = cam.cameraId;
  const camName = cam.cameraName;

  const frame = await captureFrame(camId);
  if (!frame) return;

  const formData = new FormData();
  formData.append("image", frame, "frame.jpg");

  try {
    const res = await fetch("http://127.0.0.1:8000/api/detection/threats/", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    const hasThreat =
      data.knife.length > 0 ||
      data.gun.length > 0 ||
      data.mask?.length > 0 ||
      data.emotion?.length > 0;

    const logEntry = `[${camId} | ${camName}] ${hasThreat ? "Threat detected" : "Safe"}`;

    if (hasThreat) {
      setThreatLogs((prev) => [...prev.slice(-20), logEntry]);
    } else {
      setSafeLogs((prev) => [...prev.slice(-20), logEntry]);
    }
  } catch (err) {
    console.log("Detection error:", err);
  }
};

useEffect(() => {
  const interval = setInterval(() => {
    cameras.forEach((cam) => {
      sendForDetection(cam);
    });
  }, 4000);

  return () => clearInterval(interval);
}, [cameras]);

  // REMOVE CAMERA FUNCTION
  const removeCamera = async (cameraId) => {
    if (!window.confirm("Are you sure you want to delete this camera?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cameras/delete/${cameraId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Stop webcam stream
        if (streams.current[cameraId]) {
          streams.current[cameraId].getTracks().forEach((t) => t.stop());
          delete streams.current[cameraId];
        }

        // Remove camera from list
        setCameras(cameras.filter((cam) => (cam.cameraId || cam.id) !== cameraId));
        alert("Camera removed successfully!");
      } else {
        throw new Error("Failed to remove camera");
      }
    } catch (error) {
      console.error("Error removing camera:", error);
      alert("Failed to remove camera. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <NavBar />
      <h1>Camera Dashboard</h1>
      <p>Live view of all connected cameras</p>

      {/* Loading State */}
      {loading && <p>Loading cameras...</p>}

      {/* Error State */}
      {error && (
        <div style={{ 
          padding: "20px", 
          background: "#ff3b3b22", 
          border: "1px solid #ff3b3b",
          borderRadius: "8px",
          color: "#ff3b3b",
          marginTop: "20px"
        }}>
          <strong>Error loading cameras:</strong> {error}
          <br />
          <small>Make sure your backend is running on http://127.0.0.1:8000</small>
        </div>
      )}
      <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
  
  {/* SAFE LOGS */}
  <div style={{
    flex: 1,
    background: "#d9d9d9ff",
    padding: "20px",
    borderRadius: "10px",
    color: "#00ff00",
    height: "300px",
    overflowY: "auto",
    border: "1px solid #064f06"
  }}>
    <h3>Safe Logs</h3>
    {safeLogs.map((log, i) => (
      <div key={i} style={{ marginBottom: "8px" }}>{log}</div>
    ))}
  </div>

  {/* THREAT LOGS */}
  <div style={{
    flex: 1,
    background: "#d9d9d9ff",
    padding: "20px",
    borderRadius: "10px",
    color: "#ff4d4d",
    height: "300px",
    overflowY: "auto",
    border: "1px solid #6b0a0a"
  }}>
    <h3>Threat Logs</h3>
    {threatLogs.map((log, i) => (
      <div key={i} style={{ marginBottom: "8px" }}>{log}</div>
    ))}
  </div>

</div>


      {/* Cameras Grid */}
      {!loading && !error && cameras.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {cameras.map((cam) => {
            const camId = cam.cameraId || cam.id;
            const camName = cam.cameraName || cam.name || "Unknown Camera";
            
            return (
              <div
                key={camId}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#111",
                  color: "white",
                  border: "1px solid #333",
                  position: "relative",
                }}
              >
                <h3>
                  {camName} ({camId})
                </h3>

                {/* Camera Stats */}
                <div style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>
                  {cam.people !== undefined && `People: ${cam.people} | `}
                  {cam.threats !== undefined && `Threats: ${cam.threats}`}
                </div>

                <button
                  onClick={() => removeCamera(camId)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "#ff3b3b",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>

                <video
                  ref={(el) => (videoRefs.current[camId] = el)}
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
            );
          })}
        </div>
      )}

      {/* No Cameras State */}
      {!loading && !error && cameras.length === 0 && (
        <div style={{ 
          padding: "40px", 
          textAlign: "center",
          background: "#f5f5f5",
          borderRadius: "12px",
          marginTop: "20px"
        }}>
          <h3>No cameras added yet</h3>
          <p>Add your first camera from the Home page!</p>
          <a 
            href="/" 
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px"
            }}
          >
            Go to Home
          </a>
        </div>
      )}

    </div>
  );
}