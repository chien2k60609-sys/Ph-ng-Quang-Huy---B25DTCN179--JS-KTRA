let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editId = null;

function saveData() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function resetForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputDob").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputAddress").value = "";

  document.getElementById("formTitle").innerText = "Thêm nhân viên mới";
  document.getElementById("btnSubmit").innerText = "Thêm nhân viên";

  editId = null;
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

function handleSubmit() {
  let name = document.getElementById("inputName").value.trim();
  let dob = document.getElementById("inputDob").value;
  let email = document.getElementById("inputEmail").value.trim();
  let address = document.getElementById("inputAddress").value.trim();

  if (name === "") {
    alert("Không được để trống tên");
    return;
  }

  if (dob === "") {
    alert("Không được để trống ngày sinh");
    return;
  }

  if (email === "") {
    alert("Không được để trống email");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Email sai định dạng");
    return;
  }

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].email === email && employees[i].id !== editId) {
      alert("Email đã tồn tại");
      return;
    }
  }

  if (editId === null) {
    let newEmp = {
      id: employees.length + 1,
      name: name,
      dob: dob,
      email: email,
      address: address,
    };

    employees.push(newEmp);
    alert("Thêm thành công!");
  }
  else {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === editId) {
        employees[i].name = name;
        employees[i].dob = dob;
        employees[i].email = email;
        employees[i].address = address;
      }
    }

    alert("Cập nhật thành công!");
  }

  saveData();
  render();
  resetForm();
}
function deleteEmployee(id) {
  let index = -1;

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    let confirmDelete = confirm(
      "Bạn có chắc muốn xóa " + employees[index].name + " không?"
    );

    if (confirmDelete) {
      employees.splice(index, 1);
      saveData();
      render();
      alert("Xóa thành công!");
    }
  }
}

function editEmployee(id) {
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id === id) {
      document.getElementById("inputName").value =
        employees[i].name;
      document.getElementById("inputDob").value =
        employees[i].dob;
      document.getElementById("inputEmail").value =
        employees[i].email;
      document.getElementById("inputAddress").value =
        employees[i].address;

      editId = id;
      document.getElementById("formTitle").innerText =
        "Cập nhật nhân viên";
      document.getElementById("btnSubmit").innerText =
        "Lưu thay đổi";
    }
  }
}

function formatDate(date) {
  let d = new Date(date);
  let day = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let year = d.getFullYear();
  return day + "/" + month + "/" + year;
}

function render() {
  let tbody = document.getElementById("tableBody");
  let empty = document.getElementById("emptyState");

  tbody.innerHTML = "";

  if (employees.length === 0) {
    empty.style.display = "block";
    return;
  } else {
    empty.style.display = "none";
  }

  for (let i = 0; i < employees.length; i++) {
    let e = employees[i];

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${e.name}</td>
        <td>${formatDate(e.dob)}</td>
        <td>${e.email}</td>
        <td>${e.address}</td>
        <td>    
          <button onclick="editEmployee(${e.id})">Sửa</button>
          <button onclick="deleteEmployee(${e.id})">Xóa</button>
        </td>
      </tr>
    `;
  }

  document.getElementById("totalBadge").innerText =
    employees.length + " nhân viên";
}

document
  .getElementById("btnSubmit")
  .addEventListener("click", handleSubmit);

document
  .querySelector(".btn-secondary")
  .addEventListener("click", resetForm);

renderTable();