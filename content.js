class CheckCanvas {
  static createArrDataSprint() {
    let listInDivCondensed = document.querySelectorAll(".item-group-condensed");

    let arrInObjDataSprint = [];

    listInDivCondensed.forEach((element) => {
      let objDataInSprint = {};

      objDataInSprint.tag = element.querySelector(".ig-list");
      objDataInSprint.nameSprint = element.ariaLabel;

      arrInObjDataSprint = [...arrInObjDataSprint, objDataInSprint];
    });
    return arrInObjDataSprint;
  }

  static addInputDisplay() {
    let count = 0;
    let arrInObjDataSprint = this.createArrDataSprint();

    arrInObjDataSprint.forEach((element) => {
      let listInAdmin = element.tag.querySelectorAll("div.ig-row.ig-published");

      listInAdmin.forEach((item) => {
        let itemAdmin = item.querySelector(".module-item-title");
        let itemDetails = item.querySelector(".ig-details");

        if (itemDetails.children.length >= 1) {
          itemAdmin.style.display = "flex";
          itemAdmin.style.justifyContent = "space-between";
          itemAdmin.style.flexDirection = "row-reverse";

          let input = document.createElement("input");
          input.setAttribute("type", "checkbox");
          input.setAttribute("id", `${count++}`);
          input.style.order = "-1";
          input.style.marginRight = "5px";
          input.classList.add("checkbox");
          itemAdmin.appendChild(input);
        }
      });
    });

    return arrInObjDataSprint;
  }

  static setOrRemoveInput() {
    let listInInput = document.querySelectorAll(".checkbox");
    let nameModules = document.querySelector("h1.screenreader-only");
    let user = document.querySelector(".ic-avatar > img");
    let user_data = document.querySelector("#current_user_progression_list");
    let id_user = user_data.classList[0].split("_")[1];

    listInInput.forEach((element) => {
      element.addEventListener("click", () => {
        const { id } = element;

        if (element.checked) {
          RequestApi.create(id, nameModules, user, id_user);

          let result = this.createArrDataSprint();
          this.arrInObjWithData(result);
        } else {
          RequestApi.delete(nameModules, id_user, id);

          let result = this.createArrDataSprint();
          this.arrInObjWithData(result);
        }
      });
    });

    listInInput.forEach((element) => {
      const { id } = element;

      RequestApi.oneCheck(
        nameModules,
        id_user,
        id,
        element,
        this.createArrDataSprint,
        this.arrInObjWithData
      );
    });
  }

  static arrInObjWithData(arrInObjDataSprint) {
    let arrFinal = [];

    arrInObjDataSprint.forEach((element) => {
      let objFinal = {};
      let arrListInput = element.tag.querySelectorAll(".checkbox");
      let count = 0;

      arrListInput.forEach((element) => {
        if (element.checked) {
          count++;
        }
      });

      objFinal.nameSprint = element.nameSprint;
      objFinal.numberTotal = arrListInput.length;
      objFinal.inputCheck = count;

      if (objFinal.nameSprint) {
        arrFinal = [...arrFinal, objFinal];
        count = 0;
      }
    });

    chrome.storage.sync.set({ arrFinal: arrFinal });
  }
}

let dataResult = CheckCanvas.addInputDisplay();

CheckCanvas.setOrRemoveInput();
CheckCanvas.arrInObjWithData(dataResult);
