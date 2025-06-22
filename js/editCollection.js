'use strict';
import { resourceCollectionArray, storeArrayToLocalStorage, localStorageResources } from './arrayData.js';

const editCollectionConfirm = document.querySelector('#editCollectionConfirm');
const editCollectionCancel = document.querySelector('#editCollectionCancel');

editCollectionConfirm.addEventListener('click', handleEditCollection);
editCollectionCancel.addEventListener('click', closeEditModal);

function handleEditCollection(event) {
    event.preventDefault();
    const editModal = document.getElementById('editCollectionModal');
    const collectionId = editModal.getAttribute('data-collection-id');
    const collectionTitle = document.querySelector('#editCollectionTitle').value.trim();
    const collectionDescription = document.querySelector('#editCollectionDescription').value.trim();

    if (!collectionTitle) {
        alert('Collection title is required.');
        return;
    }

    // Find the collection to edit
    const collectionIndex = resourceCollectionArray.findIndex(collection => collection.collectionId === collectionId);
    
    if (collectionIndex === -1) {
        alert('Collection not found.');
        return;
    }

    // Check for duplicate collection name (case-insensitive) - exclude current collection
    const exists = resourceCollectionArray.some(
        (collection, index) => 
            index !== collectionIndex && 
            collection.collectionName.toLowerCase() === collectionTitle.toLowerCase()
    );
        
    if (exists) {
        alert('A collection with this title already exists.');
        return;
    }

    // Update the collection
    resourceCollectionArray[collectionIndex].collectionName = collectionTitle;
    resourceCollectionArray[collectionIndex].collectionDescription = collectionDescription;
    
    storeArrayToLocalStorage();
    alert('Collection updated successfully');
    
    closeEditModal();
    location.reload();
}

function closeEditModal() {
    const editModal = document.getElementById('editCollectionModal');
    editModal.close();
    
    // Clear the form
    document.querySelector('#editCollectionTitle').value = '';
    document.querySelector('#editCollectionDescription').value = '';
    editModal.removeAttribute('data-collection-id');
}

document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    console.log('Edit collection functionality loaded');
}); 