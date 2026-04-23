async function removeBackground() {
    const fileInput = document.getElementById('imageInput');
    const image = fileInput.files[0];
    const loader = document.getElementById('loader');
    const preview = document.getElementById('preview');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!image) {
        alert("Bhai, pehle photo toh select kar lo!");
        return;
    }

    loader.style.display = "block";

    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    // APNI ASLI API KEY YAHAN DALO
    // Example (Sahi tarika):
    const apiKey = "Hdv3HEYqp36gcfNzZRY8NgRu";

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 'X-Api-Key': apiKey },
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            preview.src = url;
            preview.style.display = "block";
            downloadBtn.href = url;
            downloadBtn.style.display = "inline-block";
        } else {
            alert("Galti ho gayi! Check karo API key sahi hai ya nahi.");
        }
    } catch (error) {
        console.error(error);
        alert("Server connect nahi ho raha!");
    } finally {
        loader.style.display = "none";
    }
}
async function removeBulkBackground() {
    const fileInput = document.getElementById('imageInput');
    const files = fileInput.files;
    const resultsArea = document.getElementById('resultsArea');
    
    if (files.length === 0) {
        alert("Bhai, kam se kam ek photo toh select karo!");
        return;
    }

    resultsArea.innerHTML = ""; // Purane results saaf karo
    const apiKey = "Hdv3HEYqp36gcfNzZRY8NgRu"; 

    // Loop through each file
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Ek placeholder card banao loader ke saath
        const cardId = `card-${i}`;
        resultsArea.innerHTML += `
            <div id="${cardId}" style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 12px; text-align: center;">
                <p style="font-size: 0.7rem; color: #888;">Processing...</p>
                <i class="fa-solid fa-spinner fa-spin" style="color: #00d2ff; margin-top: 10px;"></i>
            </div>
        `;

        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': apiKey },
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                
                // Card ko update karo result ke saath
                document.getElementById(cardId).innerHTML = `
                    <img src="${url}" style="width: 100%; border-radius: 8px; background: #222;">
                    <a href="${url}" download="bg-removed-${i}.png" 
                    style="color: #38ef7d; text-decoration: none; font-size: 0.7rem; font-weight: bold; display: block; margin-top: 5px;">
                    Download ⬇️
                    </a>
                `;
            } else {
                document.getElementById(cardId).innerHTML = `<p style="color: #ef4f5f; font-size: 0.7rem;">Limit Over!</p>`;
            }
        } catch (error) {
            document.getElementById(cardId).innerHTML = `<p style="color: #ef4f5f; font-size: 0.7rem;">Error!</p>`;
        }
    }
}

// File name update logic for multiple files
document.getElementById('imageInput').onchange = function() {
    const count = this.files.length;
    const fileNameSpan = document.getElementById('fileName');
    fileNameSpan.innerText = count > 0 ? `${count} photos selected` : "Select multiple photos";
    fileNameSpan.style.color = "#00d2ff";
};
async function removeBulkBackground() {
    const fileInput = document.getElementById('imageInput');
    const files = fileInput.files;
    const resultsArea = document.getElementById('resultsArea');
    const mainLoader = document.getElementById('mainLoader');
    
    if (files.length === 0) {
        alert("Bhai, pehle photo select toh kar lo!");
        return;
    }

    resultsArea.innerHTML = ""; // Clear purana results
    mainLoader.style.display = "block";
    
    const apiKey = "Hdv3HEYqp36gcfNzZRY8NgRu"; 

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const cardId = `card-${i}`;

        // Har image ke liye card banao
        resultsArea.innerHTML += `
            <div id="${cardId}" class="result-card">
                <i class="fa-solid fa-circle-notch fa-spin" style="color: #00d2ff; margin: 20px 0;"></i>
                <p style="font-size: 0.6rem; color: #555;">Cleaning...</p>
            </div>
        `;

        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': apiKey },
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                
                document.getElementById(cardId).innerHTML = `
                    <img src="${url}">
                    <a href="${url}" download="saraswati-ai-${i}.png" class="dl-link">
                        Save <i class="fa-solid fa-download"></i>
                    </a>
                `;
            } else {
                document.getElementById(cardId).innerHTML = `<p style="color: #ef4f5f; font-size: 0.7rem; padding: 20px 0;">Limit Over!</p>`;
            }
        } catch (error) {
            document.getElementById(cardId).innerHTML = `<p style="color: #ef4f5f; font-size: 0.7rem; padding: 20px 0;">Error!</p>`;
        }
    }
    mainLoader.style.display = "none";
}

// File name update logic
document.getElementById('imageInput').onchange = function() {
    const count = this.files.length;
    const fileNameSpan = document.getElementById('fileName');
    if(count > 0) {
        fileNameSpan.innerText = count === 1 ? this.files[0].name.substring(0, 15) + "..." : `${count} photos selected`;
        fileNameSpan.style.color = "#00d2ff";
    } else {
        fileNameSpan.innerText = "Tap to select photo(s)";
        fileNameSpan.style.color = "#666";
    }
};
