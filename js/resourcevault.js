'use strict';

// Constructor function
function Resources(title, description, collection, url, id) {
    this.resourceTitle = title;
    this.resourceDetails = description;
    this.resourceCollection = collection;
    this.resourceLink = url;
    this.resourceId = id;
}

const resourceLibraryArray = [];
const resourceCollectionArray = [];

const AddResourceButton = document.querySelector('#addResourceButton');

// Function to handle adding resources to the vault
function ResourceVault() {
    // Get form values when button is clicked
    const resourceTitle = document.querySelector('#resourceTitle').value.trim();
    const resourceDetailsInput = document.querySelector('#resourceDetails').value.trim();
    const resourceCollection = document.querySelector('#resourceCollection').value.trim();
    const resourceLink = document.querySelector('#resourceUrl').value.trim();
    
    let uuid = self.crypto.randomUUID();
    
    //instantiate a new Resources object
    // using the constructor function
    const resourceLibrary = new Resources(resourceTitle, resourceDetailsInput, resourceCollection, resourceLink, uuid);
    
    // Add to arrays
    resourceLibraryArray.push(resourceLibrary);
    
    const collectionExists = resourceCollectionArray.some(collection => collection.toLowerCase() === resourceLibrary.resourceCollection.toLowerCase());
    
    // Check if the collection already exists in the array
    // If it does not exist, add it to the collection array
    if(!collectionExists){
        resourceCollectionArray.push(resourceLibrary.resourceCollection);
    }
    
    console.log(resourceLibraryArray);
    console.log(resourceCollectionArray);
}

AddResourceButton.addEventListener('click', ResourceVault);