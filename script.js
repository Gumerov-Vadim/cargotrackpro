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

  $(document).ready(function() {
    cargoListChanger.addCargo({
        id: "CARGO003",
        name: "Груз 3",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    });
});