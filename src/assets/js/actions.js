function openPlatformModalMessage(message){
    document.querySelector('#pMessage').innerHTML = message;
    openModal('modalMessage')
}

function openConfirmationModal(){
    openModal("modalConfirmation")
}
let openModal = modalId => {
    var elem = document.querySelector(`#${modalId}`);
    var instance = M.Modal.init(elem, {});
    instance.open();
}