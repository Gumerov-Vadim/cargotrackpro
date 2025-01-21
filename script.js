const cargoList = JSON.parse(localStorage.getItem("cargoList")) || [
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24"
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26"
    }
  ];
  const cargoStatuses = [{
        name: "В пути",
        class: "btn btn-primary"
    },
    {
        name: "Ожидает отправки",
        class: "btn btn-warning"
    },
    {
        name: "Доставлен",
        class: "btn btn-success"
    }];
  const cargoListChanger = {
    updateLocalStorage: function() {
      localStorage.setItem("cargoList", JSON.stringify(cargoList));
    },
    addCargo: function(cargo) {
      cargoList.push(cargo);
      cargoListChanger.updateLocalStorage();
    },
    removeCargo: function(cargo) {
      cargoList.splice(cargoList.findIndex(c=>c.id === cargo.id), 1);
      cargoListChanger.updateLocalStorage();
    },
    updateCargo: function(cargo) {
      cargoList[cargoList.findIndex(c=>c.id === cargo.id)] = cargo;
      cargoListChanger.updateLocalStorage();
    }
  }
  function handleStatusChange(cargoId, status) {
    const cargo = cargoList.find(c=>c.id === cargoId);
    cargoListChanger.updateCargo({
        ...cargo,
        status: status
    });
    showCargoList(cargoList);
  }

  function showCargoList(cargoList) {
    $("#cargoList tbody").html("");
    cargoList.forEach(cargo => {
        $("#cargoList tbody").append(`<tr><td>${cargo.id}</td><td>${cargo.name}</td><td>
           <div class="dropdown">
                    <button class="btn ${cargoStatuses.find(status => status.name === cargo.status).class} dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${cargo.status}
                    </button>
                    <ul class="dropdown-menu">
                      ${cargoStatuses.map(status => `<li><button class="btn dropdown-item" onclick="handleStatusChange('${cargo.id}', '${status.name}')">${status.name}</button></li>`).join('')}
                    </ul>
            </div> 
            </td><td>${cargo.origin}</td><td>${cargo.destination}</td><td>${cargo.departureDate}</td></tr>`);
    });
  }

  $(document).ready(function() {
    // cargoListChanger.addCargo({
    //     id: "CARGO003",
    //     name: "Груз 3",
    //     status: "В пути",
    //     origin: "Москва",
    //     destination: "Казань",
    //     departureDate: "2024-11-24"
    // });
});
showCargoList(cargoList);