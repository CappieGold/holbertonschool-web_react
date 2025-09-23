interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: "Jérémy",
    lastName: "Carpentier",
    age: 32,
    location: "Anthy-sur-leman",
};

const student2: Student = {
    firstName: "Haris",
    lastName: "Hammache",
    age: 29,
    location: "Ambilly",
};

const studentsList: Student[] = [
    student1,
    student2,
];

document.addEventListener("DOMContentLoaded", () => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const thFirstName = document.createElement("th");
  thFirstName.textContent = "First name";

  const thLocation = document.createElement("th");
  thLocation.textContent = "Location";

  headerRow.appendChild(thFirstName);
  headerRow.appendChild(thLocation);
  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");

  for (const student of studentsList) {
    const row = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = student.firstName;

    const locationCell = document.createElement("td");
    locationCell.textContent = student.location;

    row.appendChild(firstNameCell);
    row.appendChild(locationCell);
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  document.body.appendChild(table);

  table.style.borderCollapse = "collapse";
  table.querySelectorAll("th, td").forEach((cell) => {
    (cell as HTMLTableCellElement).style.border = "1px solid #ccc";
    (cell as HTMLTableCellElement).style.padding = "6px 10px";
  });
});
