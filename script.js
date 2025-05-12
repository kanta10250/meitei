 window.addEventListener("DOMContentLoaded", () => {
     
  const weightInput = document.getElementById("weight");
  const addButton = document.getElementById("add");

  const initialSakeInputs = document.querySelectorAll("#sake input");
  initialSakeInputs.forEach((input) => {
    input.addEventListener("input", calculateTotals);
  });
  weightInput.addEventListener("input", calculateTotals);

  addButton.addEventListener("click", addSakeRow);

  function addSakeRow() {
    const originalSake = document.querySelector("#sake");

    const menu = document.getElementById("menu");

    const clonedSake = originalSake.cloneNode(true);

    const clonedInputs = clonedSake.querySelectorAll("input");
    clonedInputs.forEach((input) => {
      input.value = "";
    });

    menu.appendChild(clonedSake);

    clonedInputs.forEach((input) => {
      input.addEventListener("input", calculateTotals);
    });
  }

  function calculateTotals() {
    
    const weightValue = parseFloat(weightInput.value) || 0;

    const sakeBlocks = document.querySelectorAll(".sake");

    let totalVolume = 0;       
    let totalPureAlcohol = 0;  

    sakeBlocks.forEach((block) => {
      const abvInput = block.querySelector("#dosu");   
      const volInput = block.querySelector("#ryou");   

      const abvValue = parseFloat(abvInput?.value) || 0;  
      const volValue = parseFloat(volInput?.value) || 0;  

      totalVolume += volValue;

      const pureAlcohol = volValue * (abvValue / 100) * 0.8;
      totalPureAlcohol += pureAlcohol;
    });

    let bacPercentage = 0;
    if (weightValue > 0) {
      bacPercentage = (totalPureAlcohol / (weightValue * 0.68)) * 100;
    }

    let metabolizeTime = 0; 
    if (weightValue > 0) {
      const decompositionRate = 0.1; 
      metabolizeTime = totalPureAlcohol / (weightValue * decompositionRate);
    }
    document.getElementById("gokei").textContent = `${totalVolume}ml`;
    document.getElementById("sou").textContent = `${totalPureAlcohol.toFixed(2)}g`;
    document.getElementById("noudo").textContent = `${bacPercentage.toFixed(2)}％`;
    document.getElementById("jikan").textContent = `${metabolizeTime.toFixed(2)}時間`;
  }
  
});