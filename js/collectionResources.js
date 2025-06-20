'use strict';
//importing the arrays from arrayData.js
import {resourceLibraryArray,resourceCollectionArray, localStorageResources, getCollectionId} from './arrayData.js';

//function to display the resources in the collection
function displayResourceLibrary(){
    const resourceList = document.getElementById('resourceList');
    const collectionName = document.getElementById('collectionName');
    const collectionId = getCollectionId();
    
    //find the collection name from the collectionId
    const getResourceCollection = resourceCollectionArray.find(collection => collection.collectionId === collectionId);

    collectionName.textContent = getResourceCollection.collectionName;

    if (resourceList) {  // Add check for element existence
        resourceList.textContent = ''; // Clear existing items
        
        if(getResourceCollection === undefined){
            resourceList.textContent = 'Collection not found';
        }
        else {
            // Check if there are any resources in this collection
            const resourcesInCollection = resourceLibraryArray.filter(resource => 
                resource.resourceCollection.toLowerCase() === getResourceCollection.collectionName.toLowerCase()
            );
            
            if(resourcesInCollection.length === 0){
                resourceList.textContent = 'No resources found in this collection';
            }
            else {
                resourceLibraryArray.forEach((resource) => {
                    if(resource.resourceCollection.toLowerCase() === getResourceCollection.collectionName.toLowerCase()){
                        //create a div element to store the resources informations
                        const resourceDivItem = document.createElement('div');
            
                        //create a h1 element to store the resource title
                        const resourceTitleItem = document.createElement('h1');
                        resourceTitleItem.textContent = resource.resourceTitle;
            
                        //create a p element to store the resource url
                        const resourceUrlItem = document.createElement('p');
                        resourceUrlItem.textContent = resource.resourceLink;
            
                        const resourceDetailsItem = document.createElement('p');
                        resourceDetailsItem.textContent = resource.resourceDetails;
                        
                        // Add data attribute for resource ID
                        resourceDivItem.setAttribute('data-resource-id', resource.resourceId);
            
                        resourceDivItem.style.backgroundColor = 'lightblue';
            
                        resourceDivItem.appendChild(resourceTitleItem);
                        resourceDivItem.appendChild(resourceUrlItem);
                        resourceDivItem.appendChild(resourceDetailsItem);
            
                        // Add delete button
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Remove from Collection';
                        deleteButton.style.marginLeft = '10px';
                        deleteButton.addEventListener('click', () => deleteResource(resource.resourceId));
            
                        resourceDivItem.appendChild(deleteButton);
            
                        resourceList.appendChild(resourceDivItem);

                        resourceDivItem.addEventListener('click', (e) => {
                            e.preventDefault();

                            if(e.target !== deleteButton){
                                localStorage.setItem('resourceId', resource.resourceId);
                                location.href = `edit resources page.html?resourceId=${resource.resourceId}`;
                            }
                        });
                    } 
                });
            }
        }
    }
}

function deleteResource(resourceId) {
    const index = resourceLibraryArray.findIndex(resource => resource.resourceId === resourceId);

    if(index !== -1){
        resourceLibraryArray[index].resourceCollection = '';
        localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));          
        location.reload();
    }
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources(); // Call this once
    displayResourceLibrary(); // Then display the resources

});

