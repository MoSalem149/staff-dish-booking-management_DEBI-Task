const customerNames = ["Mohamed", "Ali", "Omar", "Jana", "Dina", "Sara"];

function generateCustomerResults() {
  const customerGreetings = customerNames.map((name) => `Hello, ${name}!`);
  document.getElementById("greetingsOutput").textContent = JSON.stringify(
    customerGreetings,
    null,
    2
  );

  const letterToFilter = "A";
  const filteredCustomers = customerNames.filter((name) =>
    name.startsWith(letterToFilter)
  );
  document.getElementById("filteredOutput").textContent = JSON.stringify(
    filteredCustomers,
    null,
    2
  );

  const totalCharacters = customerNames.reduce(
    (total, name) => total + name.length,
    0
  );
  document.getElementById(
    "totalCharactersOutput"
  ).textContent = `Total characters: ${totalCharacters}`;

  const reversedCustomerNames = [...customerNames].reverse();
  document.getElementById("reversedOutput").textContent = JSON.stringify(
    reversedCustomerNames,
    null,
    2
  );
}

document
  .getElementById("generateResultsBtn")
  .addEventListener("click", generateCustomerResults);
