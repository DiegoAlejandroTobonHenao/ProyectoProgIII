function openPlatformModalMessage(message){
    document.querySelector('#pMessage').innerHTML = message;
    openModal('modalMessage')
}

function openConfirmationModal(){
    openModal("modalConfirmation")
}

function openImageModal(){
    openModal("modalImage")
}

function openDesicionModal(){
    openModal("modalDesicion")
}

function openCommentModal(){
    openModal("modalComment")
}

let openModal = modalId => {
    var elem = document.querySelector(`#${modalId}`);
    var instance = M.Modal.init(elem, {});
    instance.open();
}