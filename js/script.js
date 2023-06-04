const form = document.getElementById("generate-form")
const qr = document.getElementById("qrcode")


const onGetQRCode = (e) => {
    e.preventDefault()

    clearUI()

    const url = document.getElementById("url").value
    const size = document.getElementById("size").value

    if(url == ""){
        alert("Please enter URL")
    }else{
        showSpinner()

        setTimeout(() => {
            hideSpinner()
            generateQRCode(size, url);
            setTimeout(() => {
                const saveUrl = qr.querySelector("img").src
                createSaveBtn(saveUrl)
            }, 50)
        }, 2000)
    }
}

const generateQRCode = (size, url) =>{
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

const showSpinner = () =>{
    document.getElementById("spinner").style.display = "block"
}
const hideSpinner = () =>{
    document.getElementById("spinner").style.display = "none"
}

const clearUI = () =>{
    qr.innerHTML = "";
    const saveLink = document.getElementById("save-link")
    if(saveLink) saveLink.remove()
}

function createSaveBtn (saveUrl){
    const link = document.createElement("a")
    link.id = "save-link"
    link.classList = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto "
    link.href  = saveUrl
    link.download = "qrcode"
    link.innerHTML = "Save Image"
    document.getElementById("generated").appendChild(link)
}

hideSpinner()

form.addEventListener("submit", onGetQRCode)