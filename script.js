const canvas = document.getElementById('gm-canvas');
const ctx = canvas.getContext('2d');
const messageInput = document.getElementById('message');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const langToggle = document.getElementById('lang-toggle'); // Get the language toggle switch
const categorySlider = document.getElementById('category-slider'); // Get the category slider
const senderUpload = document.getElementById('sender-upload');
const receiverUpload = document.getElementById('receiver-upload');
const senderCropperModal = document.getElementById('sender-cropper-modal');
const receiverCropperModal = document.getElementById('receiver-cropper-modal');
const senderImageToCrop = document.getElementById('sender-image-to-crop');
const receiverImageToCrop = document.getElementById('receiver-image-to-crop');
const senderCropConfirm = document.getElementById('sender-crop-confirm');
const receiverCropConfirm = document.getElementById('receiver-crop-confirm');
const senderCropCancel = document.getElementById('sender-crop-cancel');
const receiverCropCancel = document.getElementById('receiver-crop-cancel');
const senderPreview = document.getElementById('sender-preview');
const receiverPreview = document.getElementById('receiver-preview');
const senderPreviewImg = document.getElementById('sender-preview-img');
const receiverPreviewImg = document.getElementById('receiver-preview-img');
const senderChangeBtn = document.getElementById('sender-change-btn');
const receiverChangeBtn = document.getElementById('receiver-change-btn');
const senderRemoveBtn = document.getElementById('sender-remove-btn');
const receiverRemoveBtn = document.getElementById('receiver-remove-btn');

// The categories we'll use - must match the structure in quotes data
const CATEGORIES = ['family', 'friends', 'lover'];

let quotesData = { english: {}, urdu: {} }; // To store loaded quotes
let senderCropper = null;
let receiverCropper = null;
let croppedSenderImage = null;
let croppedReceiverImage = null;

// Array of Google Fonts for English text
const englishFonts = [
    'Whisper',
    'Libre Baskerville',
    'Plus Jakarta Sans',
    'Cormorant Garamond',
    'Zilla Slab'
];

// Array of dark colors for text
const textColors = [
    '#2D3047', // Dark blue-gray
    '#412234', // Dark burgundy
    '#2E4057', // Dark slate blue
    '#331E38', // Dark purple
    '#3E2F5B', // Indigo
    '#4A3F35', // Dark brown
    '#2F4858', // Dark teal
    '#3B3C36', // Dark olive
    '#451F14', // Dark rust
    '#35383F'  // Charcoal
];

const skyImages = [
    'sky/1.png',
    'sky/2.png',
   'sky/3.png',
   'sky/4.png',
   'sky/5.png',
   'sky/6.png',
   'sky/7.png',
   'sky/8.png',
   'sky/9.png',
   'sky/10.png',
   'sky/11.png',
   'sky/12.png',
  'sky/13.png',
  'sky/14.png',
  'sky/15.png',
  'sky/16.png',
  'sky/17.png',
  'sky/18.png',
  'sky/19.png',
  'sky/20.png',
  'sky/21.png',              
];

// Add frame images
const frameImages = [
    'frame/1.png',
    'frame/2.png',
    'frame/3.png',
    'frame/4.png',
    'frame/5.png',
    'frame/6.png',
    'frame/7.png',
    'frame/8.png',
    'frame/9.png',
    'frame/10.png',
    'frame/11.png',
    'frame/12.png',
    'frame/13.png'
];

const assetImages = [
    'gm/alarm.png',
    'gm/baloon.png',
    'gm/basket-orange.png',
    'gm/bird2.png',
    'gm/bird3.png',
    'gm/birds.png',
    'gm/bow.png',
    'gm/butterfly.png',
    'gm/butterfly2.png',
    'gm/cat.png',
    'gm/cat2.png',
    'gm/chick.png',
    'gm/chick2.png',
    'gm/dog.png',
    'gm/dog2.png',
    'gm/fire.png',
    'gm/flower-boquet.png',
    'gm/flower-light.png',
    'gm/flower-tulip.png',
    'gm/flower.png',
    'gm/flower10.png',
    'gm/flower2.png',
    'gm/flower3.png',
    'gm/flower4.png',
    'gm/flower6.png',
    'gm/flower9.png',
    'gm/guitar.png',
    'gm/heart-glitter.png',
    'gm/heart-light.png',
    'gm/heart-outline.png',
    'gm/heart.png',
    'gm/heart2.png',
    'gm/kettle.png',
    'gm/ladybug.png',
    'gm/leaf.png',
    'gm/moon.png',
    'gm/ommelte.png',
    'gm/pancake.png',
    'gm/pigeon.png',
    'gm/star.png',
    'gm/star2.png',
    'gm/sun.png',
    'gm/sun2.png',
    'gm/tea.png'
];

const headingImages = [
    'gm/text/1.png',
    'gm/text/11.png',
    'gm/text/12.png',
    'gm/text/13.png',
    'gm/text/14.png',
    'gm/text/15.png',
    'gm/text/16.png',
    'gm/text/17.png',
    'gm/text/2.png',
    'gm/text/3.png',
    'gm/text/4.png',
    'gm/text/5.png',
    'gm/text/6.png',
    'gm/text/7.png'
];

const borderImages = [
    'gm/borders/1.png',
    'gm/borders/2.png',
    'gm/borders/3.png',
    'gm/borders/4.png',
    'gm/borders/5.png',
    'gm/borders/6.png',
    'gm/borders/7.png',
    'gm/borders/8.png',
    'gm/borders/9.png'
];

const headingImagesUrdu = [
    'gm/text2/1.png',
    'gm/text2/2.png',
    'gm/text2/3.png',
    'gm/text2/4.png',
    'gm/text2/5.png',
    'gm/text2/6.png',
    'gm/text2/7.png',
    'gm/text2/8.png'
];

// Function to load Google Fonts
function loadGoogleFonts() {
    // Create a link element for Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    
    // Build the Google Fonts URL with all fonts
    const fontFamilies = englishFonts.map(font => font.replace(/ /g, '+')).join('&family=');
    fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
    
    // Add the link to the document head
    document.head.appendChild(fontLink);
    
    console.log('Google Fonts loaded:', englishFonts);
}

// Function to load an image
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Function to get cryptographically secure random integer using Web Crypto API
function getCryptoRandomInteger(min, max) {
    if (!window.crypto || !window.crypto.getRandomValues) {
        console.warn("Crypto API not available, falling back to Math.random");
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Create byte array for random values
    const range = max - min + 1;
    // Calculate how many bits we need
    const bitsNeeded = Math.ceil(Math.log2(range));
    // Calculate how many bytes we need to store those bits
    const bytesNeeded = Math.ceil(bitsNeeded / 8);
    // Create a typed array to hold the random values
    const randomBytes = new Uint8Array(bytesNeeded);
    
    // Get values
    window.crypto.getRandomValues(randomBytes);
    
    // Convert the random bytes to a number
    let value = 0;
    for (let i = 0; i < bytesNeeded; i++) {
        value = (value << 8) + randomBytes[i];
    }
    
    // Apply a bit mask to only keep the bits we need
    value = value & ((1 << bitsNeeded) - 1);
    
    // Map the result to our range and return
    // If value >= range, we need to try again to avoid modulo bias
    if (value >= range) {
        return getCryptoRandomInteger(min, max); // Recursive call
    }
    return min + value;
}

// Function to get a random element using Crypto API
function getRandomElement(arr) {
    if (!arr || arr.length === 0) return null;
    const index = getCryptoRandomInteger(0, arr.length - 1);
    return arr[index];
}

// Function to get a cryptographically secure random float between min and max
function getCryptoRandomFloat(min, max) {
    if (!window.crypto || !window.crypto.getRandomValues) {
        console.warn("Crypto API not available, falling back to Math.random");
        return Math.random() * (max - min) + min;
    }
    
    // Get a 32-bit unsigned integer
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    
    // Convert to float between 0 and 1
    const randomFloat = array[0] / (0xFFFFFFFF + 1);
    
    // Scale to our range
    return min + randomFloat * (max - min);
}

// Function to calculate scale to fit within bounds
function calculateScaleToFit(imgWidth, imgHeight, maxWidth, maxHeight) {
    const widthScale = maxWidth / imgWidth;
    const heightScale = maxHeight / imgHeight;
    return Math.min(widthScale, heightScale); // Use the smaller scale to fit entirely
}

// Function to draw image centered within bounds
function drawImageCentered(img, x, y, width, height) {
    const scale = calculateScaleToFit(img.width, img.height, width, height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    const drawX = x + (width - scaledWidth) / 2;
    const drawY = y + (height - scaledHeight) / 2;
    ctx.drawImage(img, drawX, drawY, scaledWidth, scaledHeight);
}

// Function to draw image centered with rotation
function drawImageCenteredWithRotation(img, x, y, width, height, degrees) {
    const scale = calculateScaleToFit(img.width, img.height, width, height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    const drawX = x + (width - scaledWidth) / 2;
    const drawY = y + (height - scaledHeight) / 2;
    const centerX = drawX + scaledWidth / 2;
    const centerY = drawY + scaledHeight / 2;

    ctx.save(); // Save the current state
    ctx.translate(centerX, centerY); // Move the origin to the center of the image
    ctx.rotate(degrees * Math.PI / 180); // Rotate
    ctx.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight); // Draw the image centered around the new origin
    ctx.restore(); // Restore the original state
}

// Improved wrapText function to handle RTL languages properly
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const isRTL = context.textAlign === 'right'; // Check if we're dealing with RTL text
    
    const lines = []; // Store lines to draw them later
    
    // First determine all line breaks
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    
    // Add the last line
    lines.push(line);
    
    // Draw all lines with proper alignment
    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, currentY);
        currentY += lineHeight;
    }
}

// Function to get the current category based on slider value
function getCurrentCategory() {
    // Get the slider value (0, 1, or 2)
    const sliderValue = parseInt(categorySlider.value);
    
    // Map to the appropriate category
    return CATEGORIES[sliderValue];
}

// Function to load quotes from JSON
async function loadQuotes() {
    try {
        const response = await fetch('quotes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        quotesData = await response.json();
        console.log('Quotes loaded:', quotesData);
    } catch (error) {
        console.error('Error loading quotes:', error);
        alert('Failed to load quotes. Please run this application on a web server to avoid CORS issues.');
    }
}

// Modal-based Cropper.js functions for image upload and cropping
function setupImageCropper() {
    // Sender upload handler
    senderUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                senderImageToCrop.src = e.target.result;
                senderCropperModal.style.display = 'flex';
                
                // Initialize cropper
                if (senderCropper) senderCropper.destroy();
                senderCropper = new Cropper(senderImageToCrop, {
                    aspectRatio: 1,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 0.8,
                    cropBoxResizable: true,
                    responsive: true
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });
    
    // Receiver upload handler
    receiverUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                receiverImageToCrop.src = e.target.result;
                receiverCropperModal.style.display = 'flex';
                
                // Initialize cropper
                if (receiverCropper) receiverCropper.destroy();
                receiverCropper = new Cropper(receiverImageToCrop, {
                    aspectRatio: 1,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 0.8,
                    cropBoxResizable: true,
                    responsive: true
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });
    
    // Sender crop confirmation
    senderCropConfirm.addEventListener('click', () => {
        if (!senderCropper) return;
        
        const canvas = senderCropper.getCroppedCanvas({
            width: 250,
            height: 250,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });
        
        croppedSenderImage = canvas.toDataURL('image/png');
        
        // Update preview
        senderPreviewImg.src = croppedSenderImage;
        senderPreview.style.display = 'flex';
        
        // Close modal
        senderCropperModal.style.display = 'none';
        senderCropper.destroy();
        senderCropper = null;
        
        // Regenerate image
        generateImage();
    });
    
    // Receiver crop confirmation
    receiverCropConfirm.addEventListener('click', () => {
        if (!receiverCropper) return;
        
        const canvas = receiverCropper.getCroppedCanvas({
            width: 250,
            height: 250,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });
        
        croppedReceiverImage = canvas.toDataURL('image/png');
        
        // Update preview
        receiverPreviewImg.src = croppedReceiverImage;
        receiverPreview.style.display = 'flex';
        
        // Close modal
        receiverCropperModal.style.display = 'none';
        receiverCropper.destroy();
        receiverCropper = null;
        
        // Regenerate image
        generateImage();
    });
    
    // Cancel buttons
    senderCropCancel.addEventListener('click', () => {
        if (senderCropper) {
            senderCropper.destroy();
            senderCropper = null;
        }
        senderCropperModal.style.display = 'none';
    });
    
    receiverCropCancel.addEventListener('click', () => {
        if (receiverCropper) {
            receiverCropper.destroy();
            receiverCropper = null;
        }
        receiverCropperModal.style.display = 'none';
    });
    
    // Change buttons
    senderChangeBtn.addEventListener('click', () => {
        senderUpload.click();
    });
    
    receiverChangeBtn.addEventListener('click', () => {
        receiverUpload.click();
    });
    
    // Remove buttons
    senderRemoveBtn.addEventListener('click', () => {
        croppedSenderImage = null;
        senderPreview.style.display = 'none';
        senderUpload.value = '';
        generateImage();
    });
    
    receiverRemoveBtn.addEventListener('click', () => {
        croppedReceiverImage = null;
        receiverPreview.style.display = 'none';
        receiverUpload.value = '';
        generateImage();
    });
}

// Function to generate the image
async function generateImage() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define Grid Areas (adjust percentages/pixels as needed)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Heading Area (Red in example)
    const headingArea = {
        x: canvasWidth * 0.2, // 20% from left
        y: canvasHeight * 0.13, // 13% from top
        width: canvasWidth * 0.6, // 60% width
        height: canvasHeight * 0.2 // 20% height
    };

    // Message Area - Will be redefined based on border image later
    let messageArea = {
        x: canvasWidth * 0.3, // Initial placeholder
        y: canvasHeight * 0.35, // Initial placeholder
        width: canvasWidth * 0.2, // Initial placeholder
        height: canvasHeight * 0.25 // Initial placeholder
    };

    // Asset Slot Areas (Purple in example)
    const assetSlotSize = { width: canvasWidth * 0.18, height: canvasHeight * 0.22 }; // Example size
    const assetSlots = [
        // Top row
        { x: canvasWidth * 0.1, y: canvasHeight * 0.35, ...assetSlotSize }, // Slot 1
        { x: canvasWidth * 0.725, y: canvasHeight * 0.35, ...assetSlotSize }, // Slot 2
        // Bottom row
        { x: canvasWidth * 0.05, y: canvasHeight * 0.65, ...assetSlotSize }, // Slot 3
        { x: canvasWidth * 0.31, y: canvasHeight * 0.7, ...assetSlotSize }, // Slot 4
        { x: canvasWidth * 0.53, y: canvasHeight * 0.7, ...assetSlotSize }, // Slot 5
        { x: canvasWidth * 0.77, y: canvasHeight * 0.65, ...assetSlotSize }  // Slot 6
    ];

    try {
        // 0. Load and draw random sky background
        const skySrc = getRandomElement(skyImages);
        const skyImg = await loadImage(skySrc);
        ctx.drawImage(skyImg, 0, 0, canvas.width, canvas.height);

        // Add semi-transparent beige overlay
        ctx.fillStyle = 'rgba(238, 225, 203, 0)'; // Beige with 10% opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. Select heading images based on language toggle
        const currentHeadingImages = langToggle.checked ? headingImagesUrdu : headingImages;
        if (currentHeadingImages.length === 0) {
            console.error('No heading images available for the selected language.');
            alert('Cannot generate image: Missing heading assets for the selected language.');
            return; // Stop generation if no assets
        }
        const headingSrc = getRandomElement(currentHeadingImages);
        const headingImg = await loadImage(headingSrc);
        drawImageCentered(headingImg, headingArea.x, headingArea.y, headingArea.width, headingArea.height);

        // 2. Load and draw the border image for the message area
        const borderSrc = getRandomElement(borderImages);
        const borderImg = await loadImage(borderSrc);

        // Redefine messageArea based on the border image size, centered horizontally, and scaled
        const borderMaxHeight = canvasHeight * 0.4; // Max height for border
        const borderMaxWidth = canvasWidth * 0.6; // Max width for border
        const borderBaseScale = calculateScaleToFit(borderImg.width, borderImg.height, borderMaxWidth, borderMaxHeight);
        const borderScaleFactor = 1.25; // Apply 1.25 scaling
        const finalBorderScale = borderBaseScale * borderScaleFactor;

        // Ensure scaled border doesn't exceed canvas bounds (optional, but good practice)
        let borderScaledWidth = Math.min(borderImg.width * finalBorderScale, canvasWidth * 0.95); // Limit to 95% canvas width
        let borderScaledHeight = Math.min(borderImg.height * finalBorderScale, canvasHeight * 0.95); // Limit to 95% canvas height

        // Adjust scale proportionally if one dimension hit the limit
        if (borderImg.width * finalBorderScale > canvasWidth * 0.95) {
            borderScaledHeight = borderImg.height * (borderScaledWidth / borderImg.width);
        } else if (borderImg.height * finalBorderScale > canvasHeight * 0.95) {
            borderScaledWidth = borderImg.width * (borderScaledHeight / borderImg.height);
        }

        messageArea = {
            x: (canvasWidth - borderScaledWidth) / 2,
            y: canvasHeight * 0.30, // Position below heading (might need adjustment)
            width: borderScaledWidth,
            height: borderScaledHeight
        };
        ctx.drawImage(borderImg, messageArea.x, messageArea.y, messageArea.width, messageArea.height);


        // 3. Load and draw unique random assets in all slots
        const numAssetsToPlace = assetSlots.length; // Fill all slots
        const availableAssetImages = [...assetImages]; // Create a copy to modify
        const assetPromises = [];
        const slotsToUse = [...assetSlots]; // Use all slots
        const selectedAssetSrcs = [];

        if (availableAssetImages.length < numAssetsToPlace) {
            console.warn('Not enough unique assets to fill all slots. Some assets might repeat.');
            // Handle repetition or stop if needed
        }

        // Randomly select unique assets using crypto-secure randomness
        for (let i = 0; i < numAssetsToPlace && availableAssetImages.length > 0; i++) {
            const randomIndex = getCryptoRandomInteger(0, availableAssetImages.length - 1);
            const selectedSrc = availableAssetImages.splice(randomIndex, 1)[0]; // Remove and get the selected asset source
            selectedAssetSrcs.push(selectedSrc);
            assetPromises.push(loadImage(selectedSrc));
        }

        const loadedAssets = await Promise.all(assetPromises);

        // Draw assets in their slots with crypto-secure random rotation
        loadedAssets.forEach((assetImg, index) => {
            const slot = slotsToUse[index];
            const randomRotation = getCryptoRandomFloat(-5, 5); // Random angle between -5 and 5 degrees
            drawImageCenteredWithRotation(assetImg, slot.x, slot.y, slot.width, slot.height, randomRotation);
        });

        // 4. Determine the text to draw (user input or random quote from selected category)
        const userMessage = messageInput.value.trim();
        let textToDraw = '';

        if (userMessage === '') {
            // Input is empty, use a random quote from the selected category
            const selectedLanguage = langToggle.checked ? 'urdu' : 'english';
            const selectedCategory = getCurrentCategory();
            
            // Get quotes for the selected language and category
            const quotesForCategory = quotesData[selectedLanguage]?.[selectedCategory];
            
            if (quotesForCategory && quotesForCategory.length > 0) {
                textToDraw = getRandomElement(quotesForCategory);
            } else {
                // Fallback if quotes for the language/category aren't loaded or empty
                textToDraw = selectedLanguage === 'urdu' ? 
                    "کوئی قول دستیاب نہیں" : 
                    "No quote available for " + selectedCategory;
                console.warn(`No quotes found for language: ${selectedLanguage}, category: ${selectedCategory}`);
            }
        } else {
            // Input is not empty, use user's message
            textToDraw = userMessage;
        }

        // 5. Draw the determined text inside the border
        if (textToDraw) {
            // Select a random dark color for text
            const textColor = getRandomElement(textColors);
            ctx.fillStyle = textColor;
            ctx.textBaseline = 'middle'; // Adjust baseline for multi-line

            const selectedLanguage = langToggle.checked ? 'urdu' : 'english';
            const padding = 45; // Increased padding for the larger border
            const maxTextWidth = messageArea.width - (padding * 2);
            const maxTextHeight = messageArea.height - (padding * 2);

            // Set text alignment and direction based on language
            if (selectedLanguage === 'urdu') {
                ctx.textAlign = 'right';
                // Set RTL direction for Urdu text
                ctx.direction = 'rtl';
            } else {
                ctx.textAlign = 'center';
                ctx.direction = 'ltr';
            }

            // --- Font Selection and Size Adjustment ---
            let fontSize = 30; // Start with a base font size
            let lineHeight;
            let selectedFont;

            // Select a random font for English
            if (selectedLanguage === 'english') {
                selectedFont = getRandomElement(englishFonts);
            }

            // Adjust font size dynamically to fit text within the padded area
            do {
                if (selectedLanguage === 'urdu') {
                    ctx.font = `${fontSize}px 'Jameel Noori Nastaleeq Kasheeda', sans-serif`;
                } else {
                    ctx.font = `${fontSize}px '${selectedFont}', serif`;
                }
                lineHeight = fontSize * 1.2; // Approximate line height

                // Estimate height needed for wrapped text (simplified)
                const words = textToDraw.split(' ');
                let currentLine = '';
                let lines = 1;
                for (const word of words) {
                    const testLine = currentLine + word + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxTextWidth && currentLine !== '') {
                        lines++;
                        currentLine = word + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                const estimatedHeight = lines * lineHeight;

                if ((estimatedHeight > maxTextHeight || ctx.measureText(textToDraw).width > maxTextWidth * lines /* Rough check */) && fontSize > 10) {
                    fontSize -= 1;
                } else {
                    break; // Font size is suitable or minimum reached
                }
            } while (fontSize > 10);

            // Set final font and line height
            if (selectedLanguage === 'urdu') {
                ctx.font = `${fontSize}px 'Jameel Noori Nastaleeq Kasheeda', sans-serif`;
            } else {
                // For English, apply different font weights based on the selected font
                let fontWeight = 'normal';
                
                // Customize font weight based on font family
                if (selectedFont === 'Libre Baskerville' || selectedFont === 'Zilla Slab') {
                    fontWeight = 'regular';
                } else if (selectedFont === 'Whisper') {
                    fontWeight = 'normal'; // Whisper looks better normal
                } else if (selectedFont === 'Plus Jakarta Sans') {
                    fontWeight = '400'; // Semi-bold for Plus Jakarta
                } else if (selectedFont === 'Cormorant Garamond') {
                    fontWeight = '200'; // Medium for Cormorant
                }
                
                ctx.font = `${fontWeight} ${fontSize}px '${selectedFont}', serif`;
            }
            lineHeight = fontSize * 1.2;

            // Calculate starting X position based on alignment
            let textX;
            if (ctx.textAlign === 'right') {
                textX = messageArea.x + messageArea.width - 55;
            } else { // 'left' or 'center' (though we set center for English)
                textX = messageArea.x+165;
            }
 
            // Adjust Y based on estimated number of lines to center vertically
            const words = textToDraw.split(' ');
            let currentLine = '';
            let lines = 1;
            for (const word of words) {
                const testLine = currentLine + word + ' ';
                const metrics = ctx.measureText(testLine);
                // Check width against maxTextWidth for wrapping
                if (metrics.width > maxTextWidth && currentLine !== '') {
                    lines++;
                    currentLine = word + ' ';
                } else {
                    currentLine = testLine;
                }
            }
            const totalTextHeight = lines * lineHeight;
            // Calculate starting Y position to vertically center the text block
            const textY = messageArea.y + padding + (maxTextHeight - totalTextHeight) / 2 + (lineHeight / 2) - (selectedLanguage === 'urdu' ? fontSize * 0.1 : 0); // Start Y for first line, adjusted for baseline and Urdu font
 
            // Draw the wrapped text
            wrapText(ctx, textToDraw, textX, textY, maxTextWidth, lineHeight);
        }
        
        // 7. Draw Cropped Sender/Receiver Images (if they exist)
        const userImageSize = assetSlotSize.height * 1.2; // Slightly smaller than assets
        const featherAmount = userImageSize * 0.15; // Feather edge size
 
        // Function to draw feathered ellipse image
        async function drawFeatheredEllipse(imgSrc, x, y, width, height) {
            if (!imgSrc) return;
            const img = await loadImage(imgSrc);
            
            // Create a temporary canvas for the effect
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
 
            // Draw the image onto the temp canvas
            tempCtx.drawImage(img, 0, 0, width, height);
 
            // Create the elliptical mask
            tempCtx.globalCompositeOperation = 'destination-in';
            tempCtx.fillStyle = 'black'; // Color doesn't matter for mask
            tempCtx.beginPath();
            tempCtx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
            tempCtx.fill();
 
            // Apply feathering (radial gradient mask)
            tempCtx.globalCompositeOperation = 'destination-in'; // Apply gradient as mask
            const gradient = tempCtx.createRadialGradient(
                width / 2, height / 2, width / 2 - featherAmount, // Inner circle (fully opaque)
                width / 2, height / 2, width / 2 // Outer circle (fully transparent)
            );
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            tempCtx.fillStyle = gradient;
            tempCtx.fillRect(0, 0, width, height);
 
            // Draw the result onto the main canvas
            ctx.drawImage(tempCanvas, x, y);
        }
 
        // Calculate positions relative to heading area
        const senderX = headingArea.x - 20; // Left of heading, with padding
        const receiverX = headingArea.x + 300; // Right of heading, with padding
        const imageY = headingArea.y + (headingArea.height - userImageSize) / 2; // Vertically centered with heading
 
        // Draw sender image
        await drawFeatheredEllipse(croppedSenderImage, senderX, imageY, userImageSize, userImageSize);
 
        // Draw receiver image
        await drawFeatheredEllipse(croppedReceiverImage, receiverX, imageY, userImageSize, userImageSize);
        
        // 6. Add a decorative frame to the canvas
        const frameSrc = getRandomElement(frameImages);
        const frameImg = await loadImage(frameSrc);
        
        // Draw the frame centered on the canvas, at full canvas size
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        
    } catch (error) {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image. Please check the console for details.');
    }
 }
 
 // Function to download the canvas image
 function downloadImage() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'good-morning.png';
    link.click();
 }
 
 // Event Listeners
 generateBtn.addEventListener('click', () => {
    generateImage();
 });
 downloadBtn.addEventListener('click', downloadImage);
 langToggle.addEventListener('change', generateImage); // Regenerate image on language change
 categorySlider.addEventListener('change', generateImage); // Regenerate image when category changes
 
 // Initial setup: Load quotes and generate the first image
 async function initializeApp() {
    // Load Google Fonts first
    loadGoogleFonts();
    
    // Set up image cropper
    setupImageCropper();
    
    // Load quotes
    await loadQuotes(); 
    
    // Generate the initial image
    generateImage();
 }
 
 // Initialize the app when the DOM is ready
 document.addEventListener('DOMContentLoaded', initializeApp);