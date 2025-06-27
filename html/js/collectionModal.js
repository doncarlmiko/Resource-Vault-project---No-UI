// Handles opening and closing the Add Collection modal dialog

document.addEventListener('DOMContentLoaded', function() {
    const addCollectionButton = document.getElementById('addCollectionButton');
    const addCollectionModal = document.getElementById('addCollectionModal');
    const addCollectionCancel = document.getElementById('addCollectionCancel');

    if (addCollectionButton && addCollectionModal) {
        addCollectionButton.addEventListener('click', function(event) {
            event.preventDefault();
            addCollectionModal.showModal();
        });
    }
    if (addCollectionCancel && addCollectionModal) {
        addCollectionCancel.addEventListener('click', function() {
            addCollectionModal.close();
        });
    }
}); 