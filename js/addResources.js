'use strict';

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

    
    storeArrayToLocalStorage();
    //localStorageResources();
    location.reload(); // Reload the page to reflect changes
}

function storeArrayToLocalStorage() {
    //Save arrays to localStorage
    localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));
    localStorage.setItem('resourceCollections', JSON.stringify(resourceCollectionArray));
}

function localStorageResources(){
    // Load arrays from localStorage
    const savedLibrary = localStorage.getItem('resourceLibrary');
    const savedCollections = localStorage.getItem('resourceCollections');

    if (savedLibrary) {
        // Parse the stored JSON string back to an array
        const parsedLibrary = JSON.parse(savedLibrary);
        resourceLibraryArray.length = 0; // Clear existing array
        resourceLibraryArray.push(...parsedLibrary); // Add saved items
    }

    if (savedCollections) {
        const parsedCollections = JSON.parse(savedCollections);
        resourceCollectionArray.length = 0;
        resourceCollectionArray.push(...parsedCollections);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});

const resourceLibraryArray = [];
const resourceCollectionArray = [];


const AddResourceButton = document.querySelector('#addResourceButton');

/*document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        
        document.getElementById('resources').textContent=
        'displayResourceLibrary()';
    }, 2000); 
});*/

AddResourceButton.addEventListener('click', ResourceVault);


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



  