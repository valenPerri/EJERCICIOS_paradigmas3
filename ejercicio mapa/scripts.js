// Inicializar el mapa
const map = L.map('map').setView([-27.4833, -58.8167], 13); // Centrado en Corrientes, Argentina

// Cargar las capas de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para cargar los marcadores desde localStorage
function loadMarkers() {
    const markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers.forEach(marker => {
        L.marker([marker.lat, marker.lng])
            .addTo(map)
            .bindPopup(`Lat: ${marker.lat.toFixed(4)}, Lng: ${marker.lng.toFixed(4)}`);
    });
}

// Función para limpiar el mapa
function clearMap() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    localStorage.removeItem('markers'); // Elimina los datos de los marcadores en localStorage
    alert('Mapa limpiado y marcadores eliminados.');
}

// Agregar un evento al mapa para colocar un marcador al hacer clic
map.on('click', function(e) {
    const { lat, lng } = e.latlng;
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`)
        .openPopup(); // Abrir el popup automáticamente
    saveMarker(lat, lng); // Guardar el nuevo marcador en localStorage
});

// Función para guardar un nuevo marcador en localStorage
function saveMarker(lat, lng) {
    const markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers.push({ lat, lng });
    localStorage.setItem('markers', JSON.stringify(markers));
}

// Asignar eventos a los botones
document.getElementById('clearMap').addEventListener('click', clearMap);

// Cargar los marcadores al iniciar
loadMarkers();
