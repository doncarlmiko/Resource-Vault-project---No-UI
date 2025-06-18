'use strict';
import { resourceLibraryArray, resourceCollectionArray, localStorageResources, getResourceId } from './arrayData.js';

// Function to trim text content while preserving structure
function trimTextContent(element) {
    if (element) {
        const text = element.textContent;
        element.textContent = text.trim();
    }
}

// Function to view the resource in reading mode
function viewResources(){
    const resource = resourceLibraryArray.find(resource => resource.resourceId === getResourceId());
    
    if (resource) {
        document.querySelector('#resourceTitle').textContent = resource.resourceTitle;
        document.querySelector('#resourceDetailsData').textContent = resource.resourceDetails;
        document.querySelector('#resourceCollectionData').textContent = resource.resourceCollection;
        document.querySelector('#resourceUrlData').textContent = resource.resourceLink;

        // Trim content after loading
        trimTextContent(document.querySelector('#resourceTitle'));
        trimTextContent(document.querySelector('#resourceDetailsData'));
        trimTextContent(document.querySelector('#resourceCollectionData'));
        trimTextContent(document.querySelector('#resourceUrlData'));
    } else {
        console.error('Resource not found:', getResourceId());
    }
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    viewResources();
    
    console.log('Reading resource:', getResourceId());
    console.log('Loaded resources:', resourceLibraryArray);
});

