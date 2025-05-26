document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js cargado correctamente");

  document.getElementById("deliver-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const idReceta = document.getElementById("prescriptionId").value.trim();
    const idFarmaceutico = document.getElementById("entregadoPor").value.trim();

    if (!idReceta || !idFarmaceutico) {
      alert("Por favor completa ambos campos.");
      return;
    }

    const datos = {
      entregadoPor: idFarmaceutico
    };

    const url = `https://medication-request.onrender.com/api/medicationrequest/${idReceta}/deliver`;
    console.log("➡️ Enviando PUT a:", url);
    console.log("➡️ Datos enviados:", datos);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Entrega registrada con éxito\nReceta: " + result.data._id);
        document.getElementById("deliver-form").reset();
      } else {
        alert("❌ Error del servidor: " + (result.error || "No se pudo registrar la entrega."));
      }

    } catch (error) {
      console.error("❌ Error de conexión:", error);
      alert("⚠️ No se pudo conectar con el servidor");
    }
  });
});
