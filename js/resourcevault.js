'use strict';
//importing the arrays from arrayData.js
import {resourceLibraryArray,resourceCollectionArray, localStorageResources} from './arrayData.js';


function displayResourceLibrary(){
    const resourceList = document.getElementById('resources');
    
    if (resourceList) {  // Add check for element existence
        resourceList.textContent = ''; // Clear existing items
        
        resourceLibraryArray.forEach(resource => {
            const resourceItem = document.createElement('li');
            resourceItem.textContent = resource.resourceTitle;
            resourceList.appendChild(resourceItem);
        });
    }
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources(); // Call this once
    displayResourceLibrary(); // Then display the resources
    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});

