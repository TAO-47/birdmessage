document.addEventListener("DOMContentLoaded", function () {
    const birdContainer = document.querySelector(".clickable-area");
    const egg = document.getElementById("egg");
    const crackedEgg = document.getElementById("cracked-egg");
    const message = document.getElementById("secret-message");

    birdContainer.addEventListener("click", function () {
        // Reset elements
        egg.style.display = "block";
        crackedEgg.style.display = "none";
        message.style.display = "none"; // Ensure message is hidden
        message.textContent = ""; // Clear old message
        message.style.transform = "scale(0.5) translateY(0)"; // Reset grow effect

        // Restart egg animation
        egg.classList.remove("fall");
        void egg.offsetWidth; // Forces reflow to restart animation
        egg.classList.add("fall");

        // After the egg falls, replace it with the cracked egg
        setTimeout(() => {
            egg.style.display = "none";
            crackedEgg.style.display = "block"; // Show cracked egg

            // Fetch the secret message from Flask
            fetch("/message")
                .then(response => response.json())
                .then(data => {
                    message.textContent = data.message;
                    
                    // Ensure message is visible before animation
                    message.style.display = "block";
                    message.style.transform = "scale(0.5) translateY(0)"; // Reset before animation
                    
                    // Add a slight delay before revealing
                    setTimeout(() => {
                        message.classList.add("revealed");
                    }, 100); // 100ms delay ensures transition triggers
                });

        }, 1800); // Wait for longer fall animation to complete
    });
});
