function bookingTracker() {
  let bookingCount = 0;
  const bookings = new Set();

  return {
    increment: function () {
      bookingCount++;
      return bookingCount;
    },
    getCount: function () {
      return bookingCount;
    },
    decrement: function () {
      bookingCount--;
      return bookingCount;
    },
    addBooking: function (name) {
      bookings.add(name.toLowerCase());
    },
    removeBooking: function (name) {
      bookings.delete(name.toLowerCase());
    },
    hasBooking: function (name) {
      return bookings.has(name.toLowerCase());
    },
  };
}

const tracker = bookingTracker();

function bookTable() {
  const customerName = document.getElementById("customerName").value.trim();
  const namePattern = /^[A-Za-z\s]+$/;

  if (!namePattern.test(customerName)) {
    showErrorModal("Please enter a valid name (letters and spaces only).");
    return;
  }

  if (tracker.hasBooking(customerName)) {
    showErrorModal(
      "This name has already been booked. Please enter a different name."
    );
    return;
  }

  const bookingList = document.getElementById("bookingList");
  const listItem = document.createElement("li");
  const currentBookingCount = tracker.increment();

  listItem.textContent = `${currentBookingCount}. ${customerName}`;
  listItem.setAttribute("data-booking-id", currentBookingCount);
  listItem.setAttribute("data-customer-name", customerName);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", () => editBooking(listItem));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => deleteBooking(listItem));

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  listItem.appendChild(buttonContainer);
  bookingList.appendChild(listItem);

  tracker.addBooking(customerName);

  document.getElementById(
    "bookingCount"
  ).textContent = `Total Bookings: ${tracker.getCount()}`;
  document.getElementById("customerName").value = "";
}

function editBooking(listItem) {
  const currentName = listItem.getAttribute("data-customer-name");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentName;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("save-btn");

  const buttonContainer = listItem.querySelector(".button-container");
  listItem.insertBefore(editInput, buttonContainer);
  listItem.insertBefore(saveBtn, buttonContainer);
  buttonContainer.style.display = "none";

  saveBtn.addEventListener("click", () => {
    const newName = editInput.value.trim();
    const namePattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(newName)) {
      showErrorModal("Please enter a valid name (letters and spaces only).");
      return;
    }

    if (
      newName.toLowerCase() !== currentName.toLowerCase() &&
      tracker.hasBooking(newName)
    ) {
      showErrorModal(
        "This name has already been booked. Please enter a different name."
      );
      return;
    }

    tracker.removeBooking(currentName);
    tracker.addBooking(newName);

    listItem.setAttribute("data-customer-name", newName);
    listItem.firstChild.textContent = `${listItem.getAttribute(
      "data-booking-id"
    )}. ${newName}`;

    listItem.removeChild(editInput);
    listItem.removeChild(saveBtn);
    buttonContainer.style.display = "flex";
  });
}

function deleteBooking(listItem) {
  const bookingList = document.getElementById("bookingList");
  const customerName = listItem.getAttribute("data-customer-name");

  bookingList.removeChild(listItem);
  tracker.decrement();
  tracker.removeBooking(customerName);

  document.getElementById(
    "bookingCount"
  ).textContent = `Total Bookings: ${tracker.getCount()}`;
}

function showErrorModal(message) {
  const errorModal = document.getElementById("errorModal");
  const errorMessage = document.getElementById("errorMessage");
  const closeBtn = document.querySelector(".close-btn");

  errorMessage.textContent = message;
  errorModal.style.display = "block";

  closeBtn.onclick = function () {
    errorModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == errorModal) {
      errorModal.style.display = "none";
    }
  };
}

document.getElementById("bookTableBtn").addEventListener("click", bookTable);
