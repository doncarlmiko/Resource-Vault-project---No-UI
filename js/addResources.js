'use strict';
//import {localStorageResources} from './resourcevault.js';
import {resourceLibraryArray, resourceCollectionArray, localStorageResources, storeArrayToLocalStorage, uuid, uuidCollection} from './arrayData.js';

const AddResourceButton = document.querySelector('#addResourceButton');
AddResourceButton.addEventListener('click', ResourceVault);

// Constructor function
function Resources(title, description, collection, url, resourceId,collectionsId) {
    this.resourceTitle = title;
    this.resourceDetails = description;
    this.resourceCollection = collection;
    this.resourceLink = url;
    this.resourceId = resourceId;
    this.collectionId = collectionsId;
}
// Function to handle adding resources to the vault
function ResourceVault() {
    // Get form values when button is clicked
    const resourceTitle = document.querySelector('#resourceTitle').value.trim();
    const resourceDetailsInput = document.querySelector('#resourceDetails').value.trim();

    //Get the value of the selected collection and it's unique ID
    const collectionSelect = document.querySelector('#resourceCollectionData');
    const selectedOption = collectionSelect.options[collectionSelect.selectedIndex];
    const resourceCollection = selectedOption.value;
    const resourceCollectionId = selectedOption.getAttribute('collection-id');

    const resourceLink = document.querySelector('#resourceUrl').value.trim();
    const resourceExists = resourceLibraryArray.filter((resource)=> resource.resourceTitle.toLowerCase() === resourceTitle.toLowerCase());

    let collectionId;

    if(resourceExists.length > 0){
      alert('Resource already exists');
      return;
    }

    if(resourceTitle === ""){
        alert('Please fill in all fields');
        return;
    }

    if(resourceCollectionId === '') return;

    //instantiate a new Resources object
    // using the constructor function
    const resourceLibrary = new Resources(resourceTitle, resourceDetailsInput, resourceCollection, resourceLink, uuid, resourceCollectionId);
    
    // Add to arrays
    resourceLibraryArray.push(resourceLibrary);
    
    storeArrayToLocalStorage();
    //localStorageResources();
    alert('Resource added successfully');
    location.reload(); // Reload the page to reflect changes
}

// Function to view the collection options (dropdown menu)

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
      if (option !== '') {
        option.selected = true;
        option.setAttribute('collection-id',collection.collectionId);
    }
      collectionList.appendChild(option);
  });
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    viewCollection();
    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});

function clearSelectOptions(selectElement) {
  while (selectElement.options.length > 0) {
      selectElement.remove(0);
  }
}

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



  