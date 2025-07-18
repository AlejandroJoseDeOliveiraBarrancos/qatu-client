import { registerProduct, uploadImageToImgBB } from "../services/ProductService.js";
import { fetchCatalogs } from "../services/CatalogService.js";
import productRegisterHTML from "../views/ProductRegister.html";
import "../assets/styles/ProductRegister.css";

export async function initializeProductRegisterViewModel(container) {
  container.innerHTML = productRegisterHTML;

  const form = container.querySelector(".form-container #register-product-form");
  const catalogSelect = form.querySelector("#catalogId");
  if (!form || !catalogSelect) {
    console.error("Formulario o catalogo no encontrado en el contenedor.");
    return;
  }

  try {
    const catalogs = await fetchCatalogs();
    populateSelect(catalogSelect, catalogs);
  } catch (error) {
    console.error("Error al obtener los catálogos:", error);
    alert("No se pudieron cargar los catálogos. Por favor, inténtalo más tarde.");
  }

  const imageInput = container.querySelector(".image-upload-container #image");
  const imagePreview = container.querySelector(".image-upload-container #image-preview");

  if (!imageInput || !imagePreview) {
    console.error("El campo de imagen o la vista previa no se encontraron.");
    return;
  }

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = "";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productData = {
      catalogId: form.catalogId.value,
      name: form.name.value,
      description: form.description.value,
      categoryId: '56f9f785-3f5f-4d2a-aead-9e545114d47a',
      price: parseFloat(form.price.value),
      status: form.status.value,
    };

    const imageFile = imageInput.files[0];
    if (imageFile) {
      try {
        const base64Image = await convertToBase64(imageFile);
        productData.image = await uploadImageToImgBB(base64Image);
      } catch (error) {
        alert("Error al cargar la imagen. Por favor, inténtalo de nuevo.");
        console.error("Error al subir la imagen:", error);
        return;
      }
    }

    try {
      await registerProduct(productData);
      alert("Producto registrado exitosamente.");
      form.reset();
      imagePreview.src = "";
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert("Hubo un error al registrar el producto.");
    }
  });
}

function populateSelect(selectElement, options) {
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    selectElement.appendChild(optionElement);
  });
}


function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export function integrateRegisterProduct(marketViewElement) {
  const modal = marketViewElement.querySelector("#register-product-modal");
  const registerProductContainer = marketViewElement.querySelector("#register-product-container");
  const showRegisterProductBtn = marketViewElement.querySelector("#show-register-product-btn");
  const closeBtn = marketViewElement.querySelector("#close-register-product");

  if (!modal || !registerProductContainer || !showRegisterProductBtn || !closeBtn) {
    console.error("Uno o más elementos necesarios para el modal no están presentes en el DOM.");
    return;
  }

  const currentRole = localStorage.getItem("role");
  if (currentRole.toLowerCase() !== "admin" && currentRole.toLowerCase() !== "seller") {
    showRegisterProductBtn.style.visibility = "hidden";
  }

  initializeProductRegisterViewModel(registerProductContainer);

  showRegisterProductBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", async () => {
    const reloadEvent = new Event('reloadProducts');
    window.dispatchEvent(reloadEvent);
    closeModal();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
  }
}