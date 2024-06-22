let accordionArea = document.getElementById("accordions");
let addButton = document.getElementById("add-button");
let resultButton = document.getElementById("get-result");

function updateTitle(){
  let titles = document.querySelectorAll(".title");
  for(let x =0; x<titles.length;x++){
  
    if(document.getElementsByName("item-name")[x].value == ""){
      titles[x].innerText = `item ${x+1}`
    }
    
  }
};
updateTitle();


accordionArea.addEventListener("click", (e) => {
  let accordionHeader = document.querySelectorAll(".accordion-header");
  let accordionContent = document.querySelectorAll(".accordion-content-wrapper");
  let plus = document.querySelectorAll(".plus");
  let deleteButton = document.querySelectorAll(".delete-icon");
  for (let j = 0; j < accordionHeader.length; j++) {
    if (e.target.closest(".accordion-header") == accordionHeader[j]) {
      accordionContent[j].classList.toggle("accordion-active");
      plus[j].classList.toggle("open")
    }

    if(e.target.closest(".delete-icon")==deleteButton[j]){
      e.target.closest(".accordion-item").remove();
    }
  }
});

accordionArea.addEventListener("keyup", function(e){
  let titles = document.querySelectorAll(".title");
  for(let x =0; x<titles.length;x++){
    if (e.target.closest(`input[name="item-name"]`)==document.getElementsByName("item-name")[x]){
      document.getElementsByName("item-name")[x].addEventListener("keyup", function () {
        titles[x].innerText = document.getElementsByName("item-name")[x].value;
      })
    }
    
  }
  updateTitle();

})


addButton.addEventListener("click", function () {
  accordionArea.insertAdjacentHTML(
    "beforeend",
    `<div class="accordion-item">
            <div class="accordion-header">
            <div class="delete-icon"><i class="fa-solid fa-xmark"></i></div>
                <h3 class="title">Item 1</h3>
                <div class="plus-icon">
                    <div class="plus open"></div>
                    <div class="minus"></div>
                </div>
            </div>
            <div class="accordion-content-wrapper accordion-active">
                <div class="accordion-content">
                    <input type="text" name="item-name" placeholder="Enter item name" class="item-name">
                    <input type="number" name="item-price" placeholder="Price"> 
                </div>
            </div>
        </div>`
  );
  updateTitle();
});


function getOutput(){
    let inputProperties = document.getElementsByName("item-name");
    let inputValues = document.getElementsByName("item-price");
    let finalObject = {};
    for (let i = 0; i < inputProperties.length; i++) {
      finalObject[inputProperties[i].value] = inputValues[i].value;
    }

    return finalObject;
  
}

function totalAmount(){
  let obj = getOutput();
  let sum = 0;
  for(let key in obj){
    sum = sum + Number(obj[key]);
  }

  return sum;
}

function displayOutput(){
  let result = getOutput();
  for(let key in result){
    let resultText = document.createElement("h3");
    resultText.innerHTML = `${key}: ${result[key]}`;
    document.getElementById("results").appendChild(resultText)
    
  }
  let total = document.createElement("h3");
  total.innerHTML = `Total: ${totalAmount()}`;
  document.getElementById("results").appendChild(total);
}

resultButton.addEventListener("click",  function(){
  displayOutput();
});
