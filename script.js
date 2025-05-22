document.getElementById("deliver-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const idReceta = document.getElementById("prescriptionId").value.trim();
  const idFarmaceutico = document.getElementById("entregadoPor").value.trim();

  if (!idReceta || !idFarmaceutico) {
    alert("Por favor completa ambos campos.");
    return;
  }

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

    const result = await response.json();

    if (response.ok) {
      alert("✅ Entrega registrada con éxito\nReceta: " + result.data._id);
      document.getElementById("deliver-form").reset();
    } else {
      alert("❌ Error: " + (result.error || "No se pudo registrar la entrega."));
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    alert("⚠️ Error al conectar con el servidor");
  }
});

