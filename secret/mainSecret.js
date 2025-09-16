console.log("Le script fonctionne correctement.");
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".grid-item").forEach(item => {
    item.addEventListener("click", () => {
      modal.style.display = "block";
      modalTitle.textContent = item.getAttribute("data-label");
      modalDesc.textContent = item.getAttribute("data-description") || "Pas de description.";
      modalImage.src = item.getAttribute("data-image") || "";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if(e.target == modal){
      modal.style.display = "none";
    }
  });
});
