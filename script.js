window.onload = function() {
    const canvas = document.getElementById('dotsCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    // Define properties for the dots
    const numDots = 100; // Number of dots to draw
    const baseColor = 'rgba(120, 0, 255, .25)'; // Base color for the gradient

    // Array to store dot objects
    const dots = [];

    // Initialize dot positions and velocities
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 40 + 90, // Random radius between 10 and 50
            dx: (Math.random() * .1 - 1) / 25, // Random x velocity between -1 and 1
            dy: (Math.random() * 1 - 1) / 25  // Random y velocity between -1 and 1
        });
    }

    function drawRandomDots() {
        ctx.clearRect(0, 0, width, height); // Clear the canvas

        for (const dot of dots) {
            // Create radial gradient
            const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.radius);
            gradient.addColorStop(0, baseColor); // Center color
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Edge color (transparent)

            // Draw the dot with the gradient
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Update dot position based on velocity
            dot.x += dot.dx;
            dot.y += dot.dy;

            // Bounce off edges
            if (dot.x + dot.radius > width || dot.x - dot.radius < 0) {
                dot.dx *= -1;
            }
            if (dot.y + dot.radius > height || dot.y - dot.radius < 0) {
                dot.dy *= -1;
            }
        }
    }

    function animate() {
        drawRandomDots();
        requestAnimationFrame(animate); // Continue the animation
    }

    animate(); // Start the animation

    // Redraw dots if the window is resized
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};
