let staffRoles = new Set();

const roleInput = document.getElementById("roleInput");
const addRoleBtn = document.getElementById("addRoleBtn");
const roleList = document.getElementById("roleList");
const roleCount = document.getElementById("roleCount");
const roleCheckResult = document.getElementById("roleCheckResult");
const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeBtn = document.querySelector(".close-btn");

function updateRoleList() {
  roleList.innerHTML = "";
  staffRoles.forEach((role) => {
    const li = document.createElement("li");
    li.textContent = role;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editRole(role);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteRole(role);

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(buttonContainer);
    roleList.appendChild(li);
  });
  roleCount.textContent = `Total unique roles: ${staffRoles.size}`;
}

function deleteRole(role) {
  staffRoles.delete(role);
  updateRoleList();
}

function editRole(role) {
  const li = [...roleList.children].find((item) =>
    item.textContent.includes(role)
  );
  const currentRole = role;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentRole;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("save-btn");

  const buttonContainer = li.querySelector(".button-container");
  li.insertBefore(editInput, buttonContainer);
  li.insertBefore(saveBtn, buttonContainer);
  buttonContainer.style.display = "none";

  saveBtn.addEventListener("click", () => {
    const newRole = editInput.value.trim();
    const validRolePattern = /^[A-Za-z\s]+$/;

    if (!validRolePattern.test(newRole)) {
      showError("Role must contain only letters and spaces.");
      return;
    }

    if (newRole !== currentRole && staffRoles.has(newRole)) {
      showError("Role already exists.");
      return;
    }

    staffRoles.delete(currentRole);
    staffRoles.add(newRole);

    li.firstChild.textContent = newRole;
    li.removeChild(editInput);
    li.removeChild(saveBtn);
    buttonContainer.style.display = "flex";
    updateRoleList();
  });
}

addRoleBtn.addEventListener("click", () => {
  const newRole = roleInput.value.trim();

  const validRolePattern = /^[A-Za-z\s]+$/;

  if (newRole === "" || !validRolePattern.test(newRole)) {
    showError("Role cannot be empty and must contain only letters and spaces.");
  } else if (staffRoles.has(newRole)) {
    showError("Role already exists.");
  } else {
    staffRoles.add(newRole);
    roleInput.value = "";
    updateRoleList();
  }
});

function showError(message) {
  errorMessage.textContent = message;
  errorModal.style.display = "block";
}

closeBtn.onclick = function () {
  errorModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == errorModal) {
    errorModal.style.display = "none";
  }
};

updateRoleList();
