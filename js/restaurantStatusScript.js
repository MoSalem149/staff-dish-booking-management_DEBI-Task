document.addEventListener("DOMContentLoaded", () => {
  let availableDishes = new Set();
  const dishNameInput = document.getElementById("dishName");
  const addDishBtn = document.getElementById("addDishBtn");
  const dishList = document.getElementById("dishList");
  const openingTimeInput = document.getElementById("openingTime");
  const closingTimeInput = document.getElementById("closingTime");
  const currentTimeInput = document.getElementById("currentTime");
  const checkStatusBtn = document.getElementById("checkStatusBtn");
  const statusResult = document.getElementById("statusResult");

  const errorModal = document.getElementById("errorModal");
  const errorMessage = document.getElementById("errorMessage");
  const closeBtn = document.querySelector(".close-btn");

  function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = "block";
  }

  closeBtn.addEventListener("click", () => {
    errorModal.style.display = "none";
  });

  function updateDishList() {
    dishList.innerHTML = "";
    availableDishes.forEach((dish) => {
      const li = document.createElement("li");
      li.textContent = dish;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = () => editDish(dish);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteDish(dish);

      buttonContainer.appendChild(editBtn);
      buttonContainer.appendChild(deleteBtn);

      li.appendChild(buttonContainer);
      dishList.appendChild(li);
    });
  }

  function deleteDish(dish) {
    availableDishes.delete(dish);
    updateDishList();
  }

  function editDish(dish) {
    const li = [...dishList.children].find((item) =>
      item.textContent.includes(dish)
    );
    const currentDish = dish;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentDish;

    // Create a save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("save-btn");

    const buttonContainer = li.querySelector(".button-container");
    li.insertBefore(editInput, buttonContainer);
    li.insertBefore(saveBtn, buttonContainer);
    buttonContainer.style.display = "none";

    saveBtn.addEventListener("click", () => {
      const newDish = editInput.value.trim();
      const specialCharPattern = /[^a-zA-Z\s]/;
      const numberPattern = /\d/;

      if (
        newDish === "" ||
        specialCharPattern.test(newDish) ||
        numberPattern.test(newDish)
      ) {
        showError(
          "Dish name cannot be empty, contain special characters, or include numbers."
        );
        return;
      }

      if (newDish !== currentDish && availableDishes.has(newDish)) {
        showError("Dish already exists.");
        return;
      }

      availableDishes.delete(currentDish);
      availableDishes.add(newDish);

      li.firstChild.textContent = newDish;
      li.removeChild(editInput);
      li.removeChild(saveBtn);
      buttonContainer.style.display = "flex";
      updateDishList();
    });
  }

  addDishBtn.addEventListener("click", () => {
    const newDish = dishNameInput.value.trim();
    const specialCharPattern = /[^a-zA-Z\s]/;
    const numberPattern = /\d/;

    if (
      newDish === "" ||
      specialCharPattern.test(newDish) ||
      numberPattern.test(newDish)
    ) {
      showError(
        "Dish name cannot be empty, contain special characters, or include numbers."
      );
    } else if (availableDishes.has(newDish)) {
      showError("Dish already exists.");
    } else {
      availableDishes.add(newDish);
      dishNameInput.value = "";
      updateDishList();
      showError("Dish added successfully!");
    }
  });

  checkStatusBtn.addEventListener("click", () => {
    const openingTime = openingTimeInput.value;
    const closingTime = closingTimeInput.value;
    const currentTime = currentTimeInput.value;

    if (!openingTime || !closingTime || !currentTime) {
      showError("Please fill in all the times.");
      return;
    }

    const openingDate = new Date(`1970-01-01T${openingTime}:00`);
    const closingDate = new Date(`1970-01-01T${closingTime}:00`);
    const currentDate = new Date(`1970-01-01T${currentTime}:00`);

    if (closingDate <= openingDate) {
      closingDate.setDate(closingDate.getDate() + 1);
    }

    if (currentDate >= openingDate && currentDate < closingDate) {
      statusResult.textContent = "The restaurant is OPEN.";
      statusResult.style.color = "green";
    } else {
      statusResult.textContent = "The restaurant is CLOSED.";
      statusResult.style.color = "red";
    }
  });

  updateDishList();
});
