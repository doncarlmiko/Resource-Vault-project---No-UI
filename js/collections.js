'use strict';
//importing the arrays from arrayData.js
import {resourceLibraryArray,resourceCollectionArray, localStorageResources} from './arrayData.js';

function displayCollectionLibrary(){
    const collectionList = document.getElementById('collectionList');
    
    if (collectionList) {  // Add check for element existence
        collectionList.textContent = ''; // Clear existing items
        if(resourceCollectionArray.length === 0){
            collectionList.textContent = 'No collections found';
        }

        else{
            resourceCollectionArray.forEach((collection) => {
                //create a div element to store the collection informations
                const collectionDivItem = document.createElement('div');
    
                //create a h1 element to store the collection title
                const collectionTitleItem = document.createElement('h1');
                collectionTitleItem.textContent = collection.collectionName;
                
                //create a p element to store the collection description
                const collectionDetailsItem = document.createElement('p');

                if(collection.collectionDescription === undefined){
                    collectionDetailsItem.textContent = 'No description provided';
                }
                else{
                    collectionDetailsItem.textContent = collection.collectionDescription;
                }
                 
                // Add data attribute for collection ID
                collectionDivItem.setAttribute('data-collection-id', collection.collectionId);
                console.log(collection.collectionId);
    
                collectionDivItem.style.backgroundColor = 'lightblue';
    
                collectionDivItem.appendChild(collectionTitleItem);
                collectionDivItem.appendChild(collectionDetailsItem);
    
                // Add view resources button
                const viewResourcesButton = document.createElement('button');
                viewResourcesButton.textContent = 'View Resources';
                viewResourcesButton.style.marginLeft = '10px';
                viewResourcesButton.addEventListener('click', () => viewResources(collection.collectionId));

                collectionDivItem.appendChild(viewResourcesButton);

                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';
                deleteButton.addEventListener('click', () => deleteCollection(collection.collectionId,collection.collectionName));

                collectionDivItem.appendChild(deleteButton);
    
                collectionList.appendChild(collectionDivItem);
            });
        }
    }
}

function deleteCollection(collectionId,collectionName) {
    const index = resourceCollectionArray.findIndex(collection => collection.collectionId === collectionId);
    
    //filter the resources that are in the collection to be deleted
    const resourceFiltered = resourceLibraryArray.filter(resource => resource.resourceCollection.toLowerCase() === collectionName.toLowerCase());

    //delete the collection
    if(index !== -1){
        resourceCollectionArray.splice(index, 1);
        localStorage.setItem('resourceCollections', JSON.stringify(resourceCollectionArray));    
        alert('Collection deleted successfully');      
        location.reload();

        //delete the resources that are in the collection.
        if(resourceFiltered){
            resourceFiltered.forEach(resource => {
                resource.resourceCollection = '';
                localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));
            });
        }
    }
}

function viewResources(collectionId){
    const collection = resourceCollectionArray.find(collection => collection.collectionId === collectionId);
    if(collection){
        location.href = `collection resources item.html?collectionId=${collection.collectionId}`;
    } 
}

// Load collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources(); // Call this once
    displayCollectionLibrary(); // Then display the collections
    console.log('Loaded collections:', resourceCollectionArray);
});

