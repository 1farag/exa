// alert("hello world!")
const clintIo = io("http://localhost:3000")

// clintIo.emit('sendMessage','hello from FE')
// clintIo.on('BEMessage',(data)=>{
//     console.log({data});
// })

clintIo.emit('updateSocketId','62eb6a9171ee0cdb9b952763')
// clintIo.on('reply',(data)=>{
//     console.log({data});
// })

// $("#addNote").click(function () {

//     const assignObj = {
//         text: $("#title").val(),
//         createdBy: $("#desc").val(),
//         destID: ''///////////////////////////////
//     }

//     clintIo.emit("privetMessage", assignObj)


// })

clintIo.on('reply', (data) => {
    // displayData([data.data]) //1
    console.log([data]);
})



function displayData(data) {
console.log(data);
    let cartoona = '';
    for (let i = 0; i < data.length; i++) {
        const text = data[i].text
        const createdBy = data[i].createdBy
        cartoona += `
              <div class="col-md-4 my-2">
              <div class="p-2">
                  <div class="card text-center" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">${text}</h5>
                          <p class="card-text">${createdBy}</p>
                      </div>
                  </div>
              </div>
          </div>
              `
     

    }
    $(".rowData").html(cartoona)
}

