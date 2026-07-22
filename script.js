// Mock Database Array
const dogsData = [
  { id: 1, name: "Buddy", age: 2, breed: "Nepalese Mix", size: "Medium", environment: "Apartment Friendly" },
  { id: 2, name: "Max", age: 4, breed: "Local Stray", size: "Large", environment: "House with Yard" },
  { id: 3, name: "Bella", age: 1, breed: "Terrier Mix", size: "Small", environment: "Apartment Friendly" },
  { id: 4, name: "Rocky", age: 3, breed: "Huskie Mix", size: "Large", environment: "House with Yard" }
];

const dogGrid = document.getElementById("dogGrid");
const sizeFilter = document.getElementById("sizeFilter");
const envFilter = document.getElementById("envFilter");
const modal = document.getElementById("adoptionModal");
const closeModal = document.getElementById("closeModal");
const adoptForm = document.getElementById("adoptForm");

// Dynamic Aspect 1: Filter function
function renderDogs() {
  const selectedSize = sizeFilter.value;
  const selectedEnv = envFilter.value;

  dogGrid.innerHTML = "";

  const filtered = dogsData.filter(dog => {
    const matchSize = selectedSize === "All" || dog.size === selectedSize;
    const matchEnv = selectedEnv === "All" || dog.environment === selectedEnv;
    return matchSize && matchEnv;
  });

  if (filtered.length === 0) {
    dogGrid.innerHTML = "<p>No matching pets found.</p>";
    return;
  }

  filtered.forEach(dog => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${dog.name} (Age ${dog.age})</h3>
      <p><strong>Breed:</strong> ${dog.breed}</p>
      <p><strong>Size:</strong> ${dog.size}</p>
      <p><strong>Fits:</strong> ${dog.environment}</p>
      <button class="btn" onclick="openAdoptionForm('${dog.name}')">Adopt Application</button>
    `;
    dogGrid.appendChild(card);
  });
}

// Open Form Modal
function openAdoptionForm(dogName) {
  document.getElementById("selectedDog").value = dogName;
  modal.style.display = "flex";
}

// Close Modal
closeModal.onclick = () => modal.style.display = "none";

// Dynamic Aspect 2: Form Submission
adoptForm.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("adopterName").value;
  const dog = document.getElementById("selectedDog").value;
  alert(`Thank you, ${name}! Your interest in adopting ${dog} has been registered.`);
  modal.style.display = "none";
  adoptForm.reset();
};

// Event Listeners for Live Filtering
sizeFilter.addEventListener("change", renderDogs);
envFilter.addEventListener("change", renderDogs);

// Initial Render
renderDogs();