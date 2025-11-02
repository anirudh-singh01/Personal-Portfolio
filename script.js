let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height && id) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            const activeLink = document.querySelector('header nav a[href*=' + id +']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    })
}

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        menuIcon.classList.toggle('fa-bars');
        navbar.classList.toggle('active');
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(this); // Collect form data
        const popup = document.getElementById('popup-notification'); // Pop-up notification

        // Hide popup initially
        if (popup) {
            popup.classList.add('hidden');
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showPopup('Message successfully sent!', 'success');
                this.reset(); // Reset form fields
            } else {
                showPopup('Error sending message. Please try again later.', 'error');
            }
        } catch (error) {
            showPopup('Error sending message. Please try again later.', 'error');
        }
    });
}

/*
 * Function to Show Pop-up Notification
 */
function showPopup(message, type) {
    const popup = document.getElementById('popup-notification');
    if (!popup) return;
    
    popup.textContent = message;

    // Add success or error class
    popup.className = `popup ${type}`;

    // Show popup
    popup.classList.remove('hidden');

    // Hide popup after 3 seconds 
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}
