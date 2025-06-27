'use strict';

//exporting the arrays to be used in other files
export const resourceLibraryArray = [];
export const resourceCollectionArray = [];

// Function to get the current resourceId from URL
export function getResourceId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('resourceId');
}

export function getCollectionId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('collectionId');
}

//unique ID for resources
export let uuid = self.crypto.randomUUID();
//unique ID for collections
export let uuidCollection = self.crypto.randomUUID();

//function to load the arrays from localStorage
export function localStorageResources(){
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

export function storeArrayToLocalStorage() {
    //Save arrays to localStorage
    localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));
    localStorage.setItem('resourceCollections', JSON.stringify(resourceCollectionArray));
}