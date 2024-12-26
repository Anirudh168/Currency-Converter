let convertbtn = document.querySelector('.convertbtn');
let selectbtn = document.querySelectorAll('.currency');
const inputval = document.getElementById('inputval');
const convertedval = document.getElementById('convertedval');
async function currencyConverter() {
    let response = await fetch('https://api.frankfurter.dev/v1/currencies');
    let data = Object.entries(await response.json());
    for(let i=0;i<data.length;i++)
    {
       let opt =  `<option value="${data[i][0]}">${data[i][0]}</option>`
       selectbtn[0].innerHTML += opt;
       selectbtn[1].innerHTML += opt;
    }
    convertbtn.onclick = function()
    {
        let l1 = selectbtn[0].value;
        let l2 = selectbtn[1].value;
        if(l1==l2)
        {
            alert("select different currency");
        }
        else 
        {
            inputval.value = inputval.value==""||inputval.value<=0?1:inputval.value;
            convert(l1,l2,inputval.value);
        }
    }
}
function convert(l1, l2, inputval) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${l1}&symbols=${l2}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (inputval * data.rates[l2]).toFixed(2);
        convertedval.value = convertedAmount;
      });
    }
currencyConverter();