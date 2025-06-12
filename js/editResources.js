'use strict';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources} from './arrayData.js';

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
// Get the resourceId from the URL
const resourceId = urlParams.get('resourceId');  // This will be "abc123"
const nonExistingResource = document.querySelector('body');

// Function to trim text content while preserving structure
function trimTextContent(element) {
    if (element) {
        const text = element.textContent;
        element.textContent = text.trim();
    }
}

// Function to handle adding edited resources to the vault
function editResourceVault() {
    // Get form values when button is clicked
    resourceLibraryArray.forEach((resource)=>{
      if(resource.resourceId === resourceId){
        // Trim content before saving
        trimTextContent(document.querySelector('#resourceTitle'));
        trimTextContent(document.querySelector('#resourceDetailsData'));
        trimTextContent(document.querySelector('#resourceCollectionData'));
        trimTextContent(document.querySelector('#resourceUrlData'));

        resource.resourceTitle = document.querySelector('#resourceTitle').textContent;
        resource.resourceDetails = document.querySelector('#resourceDetailsData').textContent;
        resource.resourceCollection = document.querySelector('#resourceCollectionData').textContent;
        resource.resourceLink = document.querySelector('#resourceUrlData').textContent;

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
    alert('Resource updated successfully');
    location.reload(); // Reload the page to reflect changes
}

// Function to view the editable resource
function viewEditableResource(){
    resourceLibraryArray.find(resource => {
      if(resource.resourceId === resourceId){
        document.querySelector('#resourceTitle').textContent = resource.resourceTitle;
        document.querySelector('#resourceDetailsData').textContent = resource.resourceDetails;
        document.querySelector('#resourceCollectionData').textContent = resource.resourceCollection;
        document.querySelector('#resourceUrlData').textContent = resource.resourceLink;

        // Trim content after loading
        trimTextContent(document.querySelector('#resourceTitle'));
        trimTextContent(document.querySelector('#resourceDetailsData'));
        trimTextContent(document.querySelector('#resourceCollectionData'));
        trimTextContent(document.querySelector('#resourceUrlData'));
      }
    });
}

//Function to delete a resource
function deleteResource() {
  const index = resourceLibraryArray.findIndex(resource => resource.resourceId === resourceId);

  if(index !== -1){
      resourceLibraryArray.splice(index, 1);
      localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray)); 
      alert('Resource deleted successfully');
      location.href='../html/home page.html';
  }
}

// Function to view the reading mode resource
function readingModeResource(){
  localStorage.setItem('resourceId', resourceId);
  location.href = `../html/reading mode resources.html?resourceId=${resourceId}`;
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    localStorageResources();
    viewEditableResource();
    
    // Event listener for the save button
    const saveResourceButton = document.querySelector('#saveResourceButton');
    console.log('Save button element:', saveResourceButton);
    if (saveResourceButton) {
        saveResourceButton.addEventListener('click', editResourceVault);
    }

    // Event listener for the delete button
    const deleteResourceButton = document.querySelector('#deleteResourceButton');
    console.log('Delete button element:', deleteResourceButton);
    if (deleteResourceButton) {
        deleteResourceButton.addEventListener('click', deleteResource);
    }

    // Event listener for the reading mode button
    const readingModeResourceButton = document.querySelector('#readingModeResourceButton');
    console.log('Reading mode button element:', readingModeResourceButton);
    if (readingModeResourceButton) {
        readingModeResourceButton.addEventListener('click', readingModeResource);
    }

    // Now you can use this ID to load the correct resource
    console.log('Editing resource:', resourceId);
    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});



  