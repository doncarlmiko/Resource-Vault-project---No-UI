'use strict';
//import {localStorageResources} from './resourcevault.js';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources, storeArrayToLocalStorage, uuid, uuidCollection} from './arrayData.js';

const AddResourceButton = document.querySelector('#addResourceButton');
AddResourceButton.addEventListener('click', ResourceVault);

// Constructor function
function Resources(title, description, collection, url, id) {
    this.resourceTitle = title;
    this.resourceDetails = description;
    this.resourceCollection = collection;
    this.resourceLink = url;
    this.resourceId = id;
}
// Function to handle adding resources to the vault
function ResourceVault() {
    // Get form values when button is clicked
    const resourceTitle = document.querySelector('#resourceTitle').value.trim();
    const resourceDetailsInput = document.querySelector('#resourceDetails').value.trim();
    const resourceCollection = document.querySelector('#resourceCollection').value.trim();
    const resourceLink = document.querySelector('#resourceUrl').value.trim();
    
    //instantiate a new Resources object
    // using the constructor function
    const resourceLibrary = new Resources(resourceTitle, resourceDetailsInput, resourceCollection, resourceLink, uuid);
    
    // Add to arrays
    resourceLibraryArray.push(resourceLibrary);
    
    const collectionExists = resourceCollectionArray.some(collection => collection.collectionName.toLowerCase() === resourceLibrary.resourceCollection.toLowerCase());
    
    // Check if the collection already exists in the array
    // If it does not exist, add it to the collection array
    if(!collectionExists && resourceLibrary.resourceCollection !== ""){
        resourceCollectionArray.push({collectionId: uuidCollection, collectionName: resourceLibrary.resourceCollection});
    }
    
    storeArrayToLocalStorage();
    //localStorageResources();
    alert('Resource added successfully');
    location.reload(); // Reload the page to reflect changes
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});

//check if localStorage is available
// This function checks if localStorage is available and not full
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  console.log('Yippee! We can use localStorage awesomeness');
} else {
  console.log('Too bad, no localStorage for us');
}



  