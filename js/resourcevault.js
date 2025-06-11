'use strict';
//importing the arrays from arrayData.js
import {resourceLibraryArray,resourceCollectionArray, localStorageResources} from './arrayData.js';


function displayResourceLibrary(){
    const resourceList = document.getElementById('resourceList');
    
    if (resourceList) {  // Add check for element existence
        resourceList.textContent = ''; // Clear existing items
        if(resourceLibraryArray.length === 0){
            resourceList.textContent = 'No resources found';
        }

        else{
            resourceLibraryArray.forEach((resource) => {
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
                console.log(resource.resourceId);
    
                resourceDivItem.style.backgroundColor = 'lightblue';
    
                resourceDivItem.appendChild(resourceTitleItem);
                resourceDivItem.appendChild(resourceUrlItem);
                resourceDivItem.appendChild(resourceDetailsItem);
    
                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';
                deleteButton.addEventListener('click', () => deleteResource(resource.resourceId,resource.resourceCollection));
    
                resourceDivItem.appendChild(deleteButton);
    
                resourceList.appendChild(resourceDivItem);

                resourceDivItem.addEventListener('click', (e) => {
                    e.preventDefault();

                    if(e.target !== deleteButton){
                        localStorage.setItem('resourceId', resource.resourceId);
                        location.href = `edit resources page.html?resourceId=${resource.resourceId}`;

                        console.log(resource.resourceId);
                    }
                });
                
            });
        }
    }
}

function deleteResource(resourceId) {
    const index = resourceLibraryArray.findIndex(resource => resource.resourceId === resourceId);

    if(index !== -1){
        resourceLibraryArray.splice(index, 1);
        localStorage.setItem('resourceLibrary', JSON.stringify(resourceLibraryArray));          
        location.href = 'home page.html';
    }
}

// Load resources and collections from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    localStorageResources(); // Call this once
    displayResourceLibrary(); // Then display the resources
    console.log('Loaded resources:', resourceLibraryArray);
    console.log('Loaded collections:', resourceCollectionArray);
});

