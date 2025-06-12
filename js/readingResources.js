'use strict';
import { resourceLibraryArray, resourceCollectionArray, localStorageResources } from './arrayData.js';

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
// Get the resourceId from the URL
const resourceId = urlParams.get('resourceId');

// Function to trim text content while preserving structure
function trimTextContent(element) {
    if (element) {
        const text = element.textContent;
        element.textContent = text.trim();
    }
}

// Function to view the resource in reading mode
function viewResources(){
    const resource = resourceLibraryArray.find(resource => resource.resourceId === resourceId);
    
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
        console.error('Resource not found:', resourceId);
    }
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources();
    viewResources();
    
    console.log('Reading resource:', resourceId);
    console.log('Loaded resources:', resourceLibraryArray);
});

