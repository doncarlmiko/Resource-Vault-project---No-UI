'use strict';
//import {localStorageResources} from './resourcevault.js';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources, storeArrayToLocalStorage} from './arrayData.js';

const saveResourceButton = document.querySelector('#saveResourceButton');
saveResourceButton.addEventListener('click', editResourceVault);

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
// Get the resourceId from the URL
const resourceId = urlParams.get('resourceId');  // This will be "abc123"

// Constructor function
function Resources(title, description, collection, url, id) {
    this.resourceTitle = title;
    this.resourceDetails = description;
    this.resourceCollection = collection;
    this.resourceLink = url;
    this.resourceId = id;
}
// Function to handle adding resources to the vault
function editResourceVault() {
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

function editResource(){
    resourceLibraryArray.find(resource => {
      if(resource.resourceId === resourceId){
        document.querySelector('#resourceTitle').value = resource.resourceTitle;
        document.querySelector('#resourceDetails').value = resource.resourceDetails;
        document.querySelector('#resourceCollection').value = resource.resourceCollection;
        document.querySelector('#resourceUrl').value = resource.resourceLink;
        return resource;
      }
    });
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    editResource();
    // Now you can use this ID to load the correct resource
    console.log('Editing resource:', resourceId);

    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});



  