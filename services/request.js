class RequestApi {
  static create(id, nameModules, user, id_user) {
    fetch("https://checkinputcanvas.herokuapp.com/api/create", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numInput: id,
        nameModule: nameModules.innerText,
        user: user.alt,
        id_user: id_user,
      }),
    }).then((res) => res.json());
  }

  static oneCheck(
    name_module,
    id_user,
    id,
    element,
    createArrDataSprint,
    arrInObjWithData
  ) {
    fetch(
      `https://checkinputcanvas.herokuapp.com/api/one/?name_module=${name_module.innerText}&id_user=${id_user}&num_input=${id}`,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          element.checked = true;
          let result = createArrDataSprint();
          arrInObjWithData(result);
        }
      });
  }

  static delete(name_module, id_user, id) {
    fetch(
      `https://checkinputcanvas.herokuapp.com/api/delete/?name_module=${name_module.innerText}&id_user=${id_user}&num_input=${id}`,
      {
        method: "delete",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  }
}
