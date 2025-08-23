   // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Scroll animations
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const appearOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            appearOnScroll.observe(element);
        });
        
        // Modal functionality
        const sponsorModal = document.getElementById('sponsorModal');
        const supportModal = document.getElementById('supportModal');
        const supportBtns = document.querySelectorAll('.support-btn');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        
        // Sponsor a Child button
        document.querySelector('a[href="#sponsor"]').addEventListener('click', (e) => {
            e.preventDefault();
            sponsorModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Support a Cause buttons
        supportBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cause = btn.getAttribute('data-cause');
                document.getElementById('causeTitle').textContent = cause;
                
                let description = '';
                if (cause === 'Infrastructure') {
                    description = 'classrooms, libraries, and sanitation facilities';
                } else if (cause === 'Learning Materials') {
                    description = 'textbooks, stationery, computers, and other educational resources';
                } else if (cause === 'Sponsorships') {
                    description = 'education, feeding programs, and healthcare for children';
                }
                
                document.getElementById('causeDescription').textContent = description;
                supportModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modals
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sponsorModal.style.display = 'none';
                supportModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === sponsorModal) {
                sponsorModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (e.target === supportModal) {
                supportModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Form submissions
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            e.target.reset();
        });
        
        document.getElementById('sponsorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for choosing to sponsor a child! We will contact you with more details.');
            e.target.reset();
            sponsorModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        document.getElementById('supportForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your support! Your contribution will make a difference.');
            e.target.reset();
            supportModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#sponsor') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active'); // toggle icon style
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active'); // reset icon
        });
    });

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    function adjustLogo() {
        const root = document.documentElement;
        root.style.setProperty('--logo-scale', window.innerWidth < 768 ? '0.7' : '1');
    }

    adjustLogo();
    window.addEventListener('resize', adjustLogo);
});
 // Function to go back to main website
        function goBackToHome() {
            // You can customize this based on your website structure
            // Option 1: Go back in browser history
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Option 2: Go to specific homepage URL
                window.location.href = 'index.html'; // Change this to your actual homepage
            }
        }

        // Gallery functionality
        let currentImageIndex = 0;
        const galleryImages = [];

        // Initialize gallery data
        document.addEventListener('DOMContentLoaded', function() {
            // Collect all gallery images
            document.querySelectorAll('.gallery-item img').forEach((img, index) => {
                galleryImages.push({
                    src: img.src,
                    alt: img.alt,
                    element: img.parentElement
                });
            });

            // Set up gallery item clicks
            document.querySelectorAll('.gallery-item').forEach((item, index) => {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    openFullscreen(index);
                });
            });

            // Set up modal event listeners
            const modal = document.getElementById('fullscreenModal');
            if (modal) {
                // Close when clicking on dark background
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeFullscreen();
                    }
                });
            }

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeFullscreen();
                }
                // Navigate with arrow keys
                if (e.key === 'ArrowLeft') {
                    previousImage();
                }
                if (e.key === 'ArrowRight') {
                    nextImage();
                }
            });

            // Load images with animation
            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                // If image is already loaded (from cache)
                if (img.complete) {
                    img.style.opacity = '1';
                }
            });
        });

        function openFullscreen(index) {
            currentImageIndex = index;
            const modal = document.getElementById('fullscreenModal');
            const fullscreenImg = document.getElementById('fullscreenImage');
            const counter = document.getElementById('imageCounter');
            
            if (galleryImages[index] && modal && fullscreenImg) {
                fullscreenImg.src = galleryImages[index].src;
                fullscreenImg.alt = galleryImages[index].alt;
                counter.textContent = `${index + 1} / ${galleryImages.length}`;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeFullscreen() {
            const modal = document.getElementById('fullscreenModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        function nextImage() {
            if (galleryImages.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateFullscreenImage();
            }
        }

        function previousImage() {
            if (galleryImages.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateFullscreenImage();
            }
        }

        function updateFullscreenImage() {
            const fullscreenImg = document.getElementById('fullscreenImage');
            const counter = document.getElementById('imageCounter');
            
            if (fullscreenImg && counter && galleryImages[currentImageIndex]) {
                // Add fade effect
                fullscreenImg.style.opacity = '0';
                
                setTimeout(() => {
                    fullscreenImg.src = galleryImages[currentImageIndex].src;
                    fullscreenImg.alt = galleryImages[currentImageIndex].alt;
                    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
                    fullscreenImg.style.opacity = '1';
                }, 150);
            }
        }
          function openExploreModal(element) {
            const img = element.querySelector('img');
            const modal = document.getElementById('exploreModal');
            const modalImg = document.getElementById('exploreModalImage');
            
            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            document.body.style.overflow = 'hidden';
        }

        function closeExploreModal() {
            const modal = document.getElementById('exploreModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside the image
        document.getElementById('exploreModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeExploreModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeExploreModal();
            }
        });