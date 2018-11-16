let butt = document.getElementById("buttAdd");

butt.onclick = () =>{
    checkEmpty();
};
let id = document.getElementById("textInputID");
let name = document.getElementById("textInputName");
let data = document.getElementById("textInputData");
let author = document.getElementById("textInputA");
//let stock = document.getElementById("textInputS");
function checkEmpty() {
    if(id.value==='' || name.value==='' || data.value===''){
        alert("Empty placeholder!\nEnter values!")
    }else addToJSONFile();
}

function addToJSONFile() {


    let o ={
        id: id.value,
        name: name.value,
        data: data.value,
        author: author.value,
        stock: "Yes",
        return_date: null,
        surname: null,
        name_t: null
    };
    addRequest(o);
    console.log(o);
    console.log(id.value+"-"+name.value+"-"+data.value);
    //sessionStorage.setItem("1",JSON.stringify(o));
    window.location = "/";

}
function addRequest(body) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
        if(this.readyState===4 && this.status === 400) {
            alert(JSON.parse(this.responseText).message);
        }
    };
    xhttp.open("PUT", '/ajax', true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(body,null,2));
}
