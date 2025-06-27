'use strict';
import { resourceCollectionArray, uuidCollection, storeArrayToLocalStorage, localStorageResources } from './arrayData.js';

const addCollectionConfirm = document.querySelector('#addCollectionConfirm');
addCollectionConfirm.addEventListener('click', handleAddCollection);

// Constructor function for Collection
function Collection(title, description, id) {
    this.collectionName = title;
    this.collectionDescription = description;
    this.collectionId = id;
}

function handleAddCollection(event) {
    event.preventDefault();
    const collectionTitle = document.querySelector('#collectionTitle').value.trim();
    const collectionDescription = document.querySelector('#collectionDescription').value.trim();

    if (!collectionTitle) {
        alert('Collection title is required.');
        return;
    }

    // Check for duplicate collection name (case-insensitive)
    const exists = resourceCollectionArray.some(
        collection => collection.collectionName.toLowerCase() === collectionTitle.toLowerCase());
        
    if (exists) {
        alert('A collection with this title already exists.');
        return;
    }

    // Create and add new collection
    const newCollection = new Collection(collectionTitle, collectionDescription,uuidCollection);
    resourceCollectionArray.push(newCollection);
    storeArrayToLocalStorage();
    alert('Collection added successfully');
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    console.log('Loaded collections:', resourceCollectionArray);
}); 