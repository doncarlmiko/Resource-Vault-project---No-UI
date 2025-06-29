'use strict';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources, getResourceId} from './arrayData.js';

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
        trimTextContent(document.querySelector('#resourceUrlData'));

        //Get the selected options from the dropdown collections
        const collectionSelect = document.querySelector('#resourceCollectionData');
        const selectedOption = collectionSelect.options[collectionSelect.selectedIndex];
        const selectedCollectionId = selectedOption.getAttribute('collection-id');

        resource.resourceTitle = document.querySelector('#resourceTitle').textContent;
        resource.resourceDetails = document.querySelector('#resourceDetailsData').value;
        resource.collectionId = selectedCollectionId;
        resource.resourceLink = document.querySelector('#resourceUrlData').textContent;

        // No need to check or add collection here, as collections are managed separately

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
        document.querySelector('#resourceDetailsData').value = resource.resourceDetails;
        viewCollection(resource.collectionId); // Pass collectionId
        document.querySelector('#resourceUrlData').textContent = resource.resourceLink;

        // Trim content after loading
        trimTextContent(document.querySelector('#resourceTitle'));
        trimTextContent(document.querySelector('#resourceDetailsData'));
        trimTextContent(document.querySelector('#resourceUrlData'));
      }
    });
}

// Function to view the collection options (dropdown menu)
function viewCollection(selectedCollectionId){
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
        option.setAttribute('collection-id', collection.collectionId);
        if (collection.collectionId === selectedCollectionId) {
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
      location.href='../html/index.html';
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



  