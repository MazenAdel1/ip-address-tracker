let ip = document.querySelector(`.ip`),
  locationE = document.querySelector(`.location`),
  timezone = document.querySelector(`.timezone`),
  isp = document.querySelector(`.isp`);

let input = document.querySelector(`input`),
  button = document.querySelector(`button`);

let map = L.map("map", {
  center: [34.04915, -118.09462],
  zoom: 15,
  layers: [
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }),
  ],
});

let myIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: ["", ""],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

let markerE = L.marker([34.04915, -118.09462], {
  icon: myIcon,
});

markerE.addTo(map);

googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

googleStreets.addTo(map);

button.onclick = function () {
  if (input.value != ``) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_9LoPSAcOoWorlNMtuOHjm7UpAG6Aq&ipAddress=${input.value}`
    )
      .then((x) => x.json())
      .then((data) => {
        if (data.ip != undefined) {
          ip.innerHTML = data.ip;
        }
        locationE.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.geonameId}`;
        timezone.innerHTML = `UTC ${data.location.timezone}`;
        isp.innerHTML = data.isp;

        document.querySelector(`.info-container`).style.display = `flex`;

        map.remove();
        markerE.remove();

        map = L.map("map", {
          center: [data.location.lat, data.location.lng],
          zoom: 15,
          layers: [
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
            }),
          ],
        });

        markerE = L.marker([data.location.lat, data.location.lng], {
          icon: myIcon,
        });

        markerE.addTo(map);
      });
  }
};

input.addEventListener(`keypress`, (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});
