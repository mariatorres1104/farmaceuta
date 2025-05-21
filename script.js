document.getElementById("deliver-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const id = document.getElementById("prescriptionId").value;

  const response = await fetch(`https://medication-request-api.onrender.com/api/medicationrequest/${id}/deliver`, {
    method: "PUT"
  });

  if (response.ok) {
    alert("Entrega registrada correctamente");
    document.getElementById("deliver-form").reset();
  } else {
    alert("Error al registrar la entrega");
  }
});
