import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 114.8684359 -2.4665727, 114.8727274 -2.4633141, 114.8771906 -2.4593696, 114.8835421 -2.458169, 114.8890353 -2.455082, 114.8976183 -2.4537099, 114.9058581 -2.4514804, 114.9110079 -2.4466782, 114.9146128 -2.4410186, 114.9140978 -2.4346729, 114.9135828 -2.4276411, 114.909463 -2.4212953, 114.9031115 -2.4171791, 114.9013949 -2.4113478, 114.8986483 -2.4051734, 114.8971034 -2.3991706, 114.8984766 -2.3936822, 114.9012232 -2.3892229, 114.9037981 -2.3828769, 114.9048281 -2.3765309, 114.9032832 -2.3693273, 114.9013949 -2.3616092, 114.8964167 -2.3586934, 114.8931551 -2.3556061, 114.8868037 -2.3509752, 114.8830271 -2.3482309, 114.8807955 -2.3405126, 114.8799372 -2.3341664, 114.8794222 -2.326448, 114.8785639 -2.3202733

const Map = () => {
  const polyline = [
    // [-2.326448, 114.8684359],
    [-2.4633141, 114.8727274],
    [-2.4593696, 114.8771906],
    [-2.458169, 114.8835421],
    [-2.455082, 114.8890353],
    [-2.4537099, 114.8976183],
  ];

  const [domain, setDomain] = useState("");
  // const [latStart, setLatStart] = useState("");
  // const [latEnd, setLatEnd] = useState("");
  // const [longStart, setLongStart] = useState("");
  // const [longEnd, setLongEnd] = useState("");
  const [pol, setPol] = useState("");
  const [pod, setPod] = useState("");
  const [data, setData] = useState(null);
  const [center, setCenter] = useState([]);

  const handleSubmit = (e) => {
    // console.log(latStart);
    // console.log(latEnd);
    // console.log(longStart);
    // console.log(longEnd);
    e.preventDefault();
    // alert(`domain: ${domain}`);
    fetch(`http://localhost:8080/shipment-routes?pol=${pol}&pod=${pod}`)
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.data.route.map((r) => {
            return [r.lat, r.long];
          })
        )
      )
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label>Sub domain:</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          /> */}
          <label>pol:</label>
          <input
            type="text"
            value={pol}
            onChange={(e) => setPol(e.target.value)}
          />
          <label>pod:</label>
          <input
            type="text"
            value={pod}
            onChange={(e) => setPod(e.target.value)}
          />

          {/* <label>Longitude Awal:</label>
          <input
            type="text"
            value={longStart}
            onChange={(e) => setLongStart(e.target.value)}
          />

          <label>Longitude Akhir:</label>
          <input
            type="text"
            value={longEnd}
            onChange={(e) => setLongEnd(e.target.value)}
          /> */}
        </div>
        <button type="submit">Submit</button>
      </form>
      <MapContainer
        center={[-1.892101277846678, 114.84179590145313]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data && <Polyline positions={data} color="blue" />}
      </MapContainer>
    </>
  );
};

export default Map;
