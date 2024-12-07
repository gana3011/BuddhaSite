// Wrap slider initialization in a function
function initializeSlider() {
    let list = document.querySelector('.slider .list');
    let items = document.querySelectorAll(".slider .list .item");
    let dots = document.querySelectorAll(".slider .dots li");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let productTitle = document.getElementById("product-title");
    let productText = document.getElementById("product-text");
    let productMaterial = document.getElementById("product-material");
    let productSize = document.getElementById("product-size");

    let active = 0;
    let lengthItems = items.length - 1;

    const productDetails = [
        {
            title: "Sitting Buddha Statue",
            description: "Transform your space into a haven of peace and serenity with this exquisite Sitting Buddha statue. Skillfully handcrafted with precision and care, this statue embodies the essence of meditation and inner calm.",
            material: "Resin",
            size: "18cm"
        },
        {
            title: "Standing Buddha Statue",
            description: "Elevate your surroundings with the majestic presence of the Standing Buddha statue. This masterpiece exudes strength, serenity, and compassion, serving as a beacon of positivity and balance.",
            material: "Bronze",
            size: "20cm"
        },
        {
            title: "Laughing Buddha Statue",
            description: "Bring happiness and good fortune into your life with the delightful Laughing Buddha statue. Known for its cheerful energy and abundance symbolism, this statue is a perfect addition to any space.",
            material: "Gold",
            size: "18cm"
        },
        {
            title: "Angry Buddha Statue",
            description: "Invoke strength and determination with the powerful Angry Buddha statue. This unique depiction symbolizes the fierce protection of righteousness and the eradication of negativity, embodying a dynamic spiritual energy.",
            material: "Resin",
            size: "18cm"
        },
        {
            title: "Teaching Buddha Statue",
            description: "Embrace wisdom and enlightenment with the serene Teaching Buddha statue. This meaningful depiction represents the sharing of knowledge and the path to spiritual growth, inspiring harmony and mindfulness.",
            material: "Bronze",
            size: "18cm"
        }
    ];

    function reloadSlider() {
        if (!list || !productTitle) return;

        let checkLeft = items[active].offsetLeft;
        list.style.left = -checkLeft + 'px';

        let lastActiveDot = document.querySelector(".slider .dots li.active");
        if (lastActiveDot) lastActiveDot.classList.remove("active");
        
        dots[active].classList.add("active");
        productTitle.textContent = productDetails[active].title;
        productText.textContent = productDetails[active].description;
        productMaterial.textContent = productDetails[active].material;
        productSize.textContent = productDetails[active].size;
    }

    if (next) {
        next.onclick = function () {
            if (active + 1 > lengthItems) {
                active = 0;
            } else {
                active += 1;
            }
            reloadSlider();
        }
    }

    if (prev) {
        prev.onclick = function () {
            if (active - 1 < 0) {
                active = lengthItems;
            } else {
                active = active - 1;
            }
            reloadSlider();
        }
    }

    if (dots && dots.length > 0) {
        dots.forEach((li, key) => {
            li.addEventListener('click', function () {
                active = key;
                reloadSlider();
            })
        });
    }
}

// Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();

    // Form and navigation buttons
    const getStartedButtons = document.querySelectorAll("#get-started-btn, #buy-now-btn");
    getStartedButtons.forEach(element => {
        element.addEventListener("click", function () {
            window.location.href = "form.html"
        });
    });

    // Load header and footer
    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header not found');
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error(error));

    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer not found');
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error(error));

    // EmailJS initialization
    (function() {
        emailjs.init('yCx1zaxP9c1SJd9UC'); 
    })();

    // Contact form submission handling
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const email = document.getElementById("email").value;
            const name = document.getElementById("name").value;
            const product = document.querySelector('input[name="product"]:checked');
            const message = document.querySelector(".message");

            if (!emailRegex.test(email)) {
                message.innerHTML = "Enter a valid email.";
                message.style.display = "block";
                return;
            }

            if (!product) {
                message.innerHTML = "Please select a product.";
                message.style.display = "block";
                return;
            }

            message.style.display = "none";

            const emailParams = {
                email: email,
                to_name: name,
                message: `Thank you for wishlisting ${product.value} on our BuddhaGrace Website. We will contact you as soon as we finish the product for getting further details. Thank you for your patronage. (PS: This is not a real product. Only a fictional product for the website)`
            };

            try {
                emailjs.send('service_iu5wbdm', 'template_5g3srlj', emailParams) 
                    .then(function(response) {
                        alert('Thank you for your patronage! Please check your mail');
                        contactForm.reset(); 
                        message.style.display = "none"; 
                        window.location.href = "index.html"
                    },
                    function(error) {
                        console.error('Error details:', error);
                        alert('Failed to send email: ' + JSON.stringify(error));
                    });
            } catch (error) {
                alert('An unexpected error occurred: ' + error.message);
            }
        });
    }
});