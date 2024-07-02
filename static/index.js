let btn = document.querySelector('button');
let inpt = document.querySelector('input');
let dataList = document.getElementById('dataList');
let bdy = document.querySelector('body');
let listItems = document.querySelectorAll('.listItem');

window.onload = function () {
    fetchData()
}

btn.addEventListener('click', async ()=>{
    let tasktmp = {name: inpt.value}
    inpt.value=""
    const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasktmp), 
      });
    if(response.status == 200) fetchData()
})

function populatePage(data, id) {
    let divtmp = document.createElement('div');
    divtmp.id = id;
    divtmp.className = "listItem bg-slate-400 py-1 px-3 rounded-2xl my-3 hover:bg-slate-500/60 ease-linear cursor-pointer"
    let ptmp = document.createElement('p');
    ptmp.textContent = data
    divtmp.appendChild(ptmp)
    dataList.appendChild(divtmp)
    // event listener for deleting tasks
    divtmp.addEventListener('click', async ()=>{
        let response = await fetch(`http://localhost:3000/delete/${divtmp.id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }, 
          });
        if(response.status == 200) fetchData()
    })
}

async function fetchData() {
    let data = await fetch('http://localhost:3000').then(res=> res.json());
    console.log(data.message)
    // if (dataList.hasChildNodes()) {
    //     while (dataList.firstChild) {
    //         dataList.removeChild(dataList.firstChild);
    //     }
    // }
    // data.forEach(listEl => {
    //     console.log(listEl)
    //     populatePage(listEl.name, listEl.id)
    // });
}