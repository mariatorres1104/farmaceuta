document.getElementById("deliver-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const idReceta = document.getElementById("prescriptionId").value;
  const idFarmaceutico = document.getElementById("pharmacistId").value;

  try {
    const response = await fetch(`https://medication-request-api.onrender.com/api/medicationrequest/${idReceta}/deliver`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        entregadoPor: idFarmaceutico
      })
    });

    if (response.ok) {
      const data = await response.json();
      alert("Entrega registrada con éxito\nReceta: " + data.data._id);
      document.getElementById("deliver-form").reset();
    } else {
      alert("No se pudo registrar la entrega");
    }

  } catch (error) {
    alert("Error al conectar con el servidor");
    console.error(error);
  }
});
