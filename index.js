chrome.storage.sync.get(['arrFinal'], function(result) {
 let arrFinal = result.arrFinal
 let main = document.querySelector("#main")

 arrFinal.forEach(element => {
  let size = element.inputCheck * (280 / element.numberTotal)

  let dataHTML = `
    <h2 class="NameSprint">${element.nameSprint}</h2>
    <div class="divProgress">
        <div class="progressTotal">
            <div class="progressReached" style='width:${size}px'></div>
        </div>
        <div class="dataNumber">
            <h3>${element.inputCheck}/${element.numberTotal}</h3>
        </div>
    </div>
 `

 const div = document.createElement("div")
 div.classList.add("card")
 div.innerHTML = dataHTML

 main.appendChild(div)
 })
});
