'use strict';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources, uuidCollection, getResourceId} from './arrayData.js';

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
      if(resource.resourceId === getResourceId()){
        // Trim content before saving
        trimTextContent(document.querySelector('#resourceTitle'));
        trimTextContent(document.querySelector('#resourceDetailsData'));
        /*trimTextContent(document.querySelector('#resourceCollectionData'));*/
        trimTextContent(document.querySelector('#resourceUrlData'));

        const collectionSelect = document.querySelector('#resourceCollectionData');
        const selectedCollection = collectionSelect.value;

        resource.resourceTitle = document.querySelector('#resourceTitle').textContent;
        resource.resourceDetails = document.querySelector('#resourceDetailsData').textContent;
        resource.resourceCollection = selectedCollection;
        resource.resourceLink = document.querySelector('#resourceUrlData').textContent;

        const collectionExists = resourceCollectionArray.some(collection => collection.collectionName.toLowerCase() === resource.resourceCollection.toLowerCase());
    
        // Check if the collection already exists in the array
        // If it does not exist, add it to the collection array
        if(!collectionExists && resource.resourceCollection !== ''){
          resourceCollectionArray.push({collectionId: uuidCollection, collectionName: resource.resourceCollection});
          localStorage.setItem('resourceCollections', JSON.stringify(resourceCollectionArray));
        }

        localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));
      }
    });
    
    alert('Resource updated successfully');
    location.reload(); // Reload the page to reflect changes
}

// Function to view the editable resource
function viewEditableResource(){
    resourceLibraryArray.find(resource => {
      if(resource.resourceId === getResourceId()){
        document.querySelector('#resourceTitle').textContent = resource.resourceTitle;
        document.querySelector('#resourceDetailsData').textContent = resource.resourceDetails;
        viewCollection(resource.resourceCollection);
        document.querySelector('#resourceUrlData').textContent = resource.resourceLink;

        // Trim content after loading
        trimTextContent(document.querySelector('#resourceTitle'));
        trimTextContent(document.querySelector('#resourceDetailsData'));
        /*trimTextContent(document.querySelector('#resourceCollectionData'));*/
        trimTextContent(document.querySelector('#resourceUrlData'));
      }
    });
}

function viewCollection(resourceCollectionName){
    const collectionList = document.querySelector('#resourceCollectionData');
    clearSelectOptions(collectionList); // Clear previous options

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a collection';
    collectionList.appendChild(defaultOption);

    resourceCollectionArray.forEach(collection => {
        const option = document.createElement('option');
        option.value = collection.collectionName;
        option.textContent = collection.collectionName;
        if (collection.collectionName.toLowerCase() === resourceCollectionName?.toLowerCase()) {
            option.selected = true;
        }
        collectionList.appendChild(option);
    });
}

//Function to delete a resource
function deleteResource() {
  const index = resourceLibraryArray.findIndex(resource => resource.resourceId === getResourceId());

  if(index !== -1){
      resourceLibraryArray.splice(index, 1);
      localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray)); 
      alert('Resource deleted successfully');
      location.href='../html/home page.html';
  }
}

// Function to view the reading mode resource
function readingModeResource(){
  localStorage.setItem('resourceId', getResourceId());
  location.href = `../html/reading mode resources.html?resourceId=${getResourceId()}`;
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    viewEditableResource();
    
    // Event listener for the save button
    const saveResourceButton = document.querySelector('#saveResourceButton');
    if (saveResourceButton) {
        saveResourceButton.addEventListener('click', editResourceVault);
    }

    // Event listener for the delete button
    const deleteResourceButton = document.querySelector('#deleteResourceButton');
    if (deleteResourceButton) {
        deleteResourceButton.addEventListener('click', deleteResource);
    }

    // Event listener for the reading mode button
    const readingModeResourceButton = document.querySelector('#readingModeResourceButton');
    if (readingModeResourceButton) {
        readingModeResourceButton.addEventListener('click', readingModeResource);
    }
});

function clearSelectOptions(selectElement) {
    while (selectElement.options.length > 0) {
        selectElement.remove(0);
    }
}



  