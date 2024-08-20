const categories = {
    "Bass": "bass-container",
    "Sunfish": "sunfish-container",
    "Catfish": "catfish-container"
    // Add more categories here if needed
};

const searchBar = document.getElementById('search-bar');
const dropdownList = document.getElementById('dropdown-list');
const categoryDropdown = document.getElementById('category-dropdown');

// Populate the categories dropdown
Object.keys(categories).forEach(category => {
    const option = document.createElement('option');
    option.value = `#${categories[category]}`;
    option.textContent = category;
    categoryDropdown.appendChild(option);
});

// Handle category dropdown change
categoryDropdown.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
        window.location.href = selectedCategory;
    }
});

fetch('fish-data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(fish => {
            const fishCard = document.createElement('div');
            fishCard.classList.add('fish-card');
            
            const fishImage = document.createElement('img');
            fishImage.src = fish.image;
            fishImage.alt = fish.name;
            
            const fishName = document.createElement('h3');
            fishName.textContent = fish.name;
            
            const fishDescription = document.createElement('p');
            fishDescription.textContent = fish.description;
            
            fishCard.appendChild(fishImage);
            fishCard.appendChild(fishName);
            fishCard.appendChild(fishDescription);
            
            // Add click event to redirect to fish page
            fishCard.addEventListener('click', () => {
                window.location.href = fish.page;
            });

            // Place the fish card in the appropriate category section
            const categoryContainer = document.getElementById(categories[fish.category]);
            if (categoryContainer) {
                categoryContainer.appendChild(fishCard);
            }
        });
    })
    .catch(error => console.error('Error loading fish data:', error));

fetch('fish-data.json')
    .then(response => response.json())
    .then(data => {
        let allFish = data;

        // Populate dropdown list with fish names
        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.toLowerCase();
            dropdownList.innerHTML = '';
            
            if (searchTerm.length > 0) {
                const filteredFish = allFish.filter(fish => fish.name.toLowerCase().includes(searchTerm));
                
                filteredFish.forEach(fish => {
                    const listItem = document.createElement('li');
                    listItem.textContent = fish.name;
                    
                    // Add click event to navigate to fish page
                    listItem.addEventListener('click', () => {
                        window.location.href = fish.page;
                    });

                    dropdownList.appendChild(listItem);
                });
                
                if (filteredFish.length > 0) {
                    dropdownList.style.display = 'block';
                } else {
                    dropdownList.style.display = 'none';
                }
            } else {
                dropdownList.style.display = 'none';
            }
        });

        // Hide dropdown when clicking outside of it
        document.addEventListener('click', (event) => {
            if (!searchBar.contains(event.target) && !dropdownList.contains(event.target)) {
                dropdownList.style.display = 'none';
            }
        });
    })
    .catch(error => console.error('Error loading fish data:', error));

    
