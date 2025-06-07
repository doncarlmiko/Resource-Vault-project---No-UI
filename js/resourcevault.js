'use strict';
//importing the arrays from addResources.js
import {resourceLibraryArray, resourceCollectionArray} from './addResources.js';

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