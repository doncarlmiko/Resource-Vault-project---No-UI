'use strict';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources} from './arrayData.js';

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
// Get the resourceId from the URL
const resourceId = urlParams.get('resourceId');  // This will be "abc123"

// Function to handle adding resources to the vault
function editResourceVault() {
    // Get form values when button is clicked
    resourceLibraryArray.forEach((resource)=>{
      if(resource.resourceId === resourceId){
        resource.resourceTitle = document.querySelector('#resourceTitle').value.trim();
        resource.resourceDetails = document.querySelector('#resourceDetails').value.trim();
        resource.resourceCollection = document.querySelector('#resourceCollection').value.trim();
        resource.resourceLink = document.querySelector('#resourceUrl').value.trim();

        const collectionExists = resourceCollectionArray.some(collection => collection.toLowerCase() === resource.resourceCollection.toLowerCase());
    
        // Check if the collection already exists in the array
        // If it does not exist, add it to the collection array
        if(!collectionExists){
          resourceCollectionArray.push(resource.resourceCollection);
          localStorage.setItem('resourceCollections', JSON.stringify(resourceCollectionArray));
        }

        localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));
      }
    });
    
    console.log(resourceLibraryArray);
    console.log(resourceCollectionArray);
    location.reload(); // Reload the page to reflect changes
}

// Function to view the editable resource
function viewEditableResource(){
    resourceLibraryArray.find(resource => {
      if(resource.resourceId === resourceId){
        document.querySelector('#resourceTitle').value = resource.resourceTitle;
        document.querySelector('#resourceDetails').value = resource.resourceDetails;
        document.querySelector('#resourceCollection').value = resource.resourceCollection;
        document.querySelector('#resourceUrl').value = resource.resourceLink;
      }
    });
}

//Function to delete a resource
function deleteResource() {
  const index = resourceLibraryArray.findIndex(resource => resource.resourceId === resourceId);

  if(index !== -1){
      resourceLibraryArray.splice(index, 1);
      localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));  
      location.reload();
  }
}

// Event listener for the save button
const saveResourceButton = document.querySelector('#saveResourceButton');
saveResourceButton.addEventListener('click', editResourceVault);


// Event listener for the delete button
const deleteResourceButton = document.querySelector('#deleteResourceButton');
deleteResourceButton.addEventListener('click', deleteResource);

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    viewEditableResource();
    // Now you can use this ID to load the correct resource
    console.log('Editing resource:', resourceId);

    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});



  