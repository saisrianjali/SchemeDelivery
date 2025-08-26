document.addEventListener("DOMContentLoaded", () => {
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotPopup = document.getElementById("chatbot-popup");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    // Toggle chatbot visibility
    chatbotButton.addEventListener("click", () => {
        chatbotPopup.classList.toggle("hidden");
    });

    closeChatbot.addEventListener("click", () => {
        chatbotPopup.classList.add("hidden");
    });

    // Add new message and communicate with server
    chatbotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            // Append user message
            const userBubble = document.createElement("div");
            userBubble.classList.add(
                "bg-gray-100",
                "p-2",
                "rounded-lg",
                "text-sm",
                "text-gray-700",
                "self-end",
                "text-right",
                "inline-block",
                "my-1",
                'text-right'
            );
            userBubble.textContent = userMessage;
            chatbotMessages.appendChild(userBubble);

            // Scroll to the bottom after user message
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Send user message to server and display response
            try {
                const response = await fetch('/chat', { // POST request to /chat
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userMessage }), // Send the message in JSON body
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }

                const data = await response.json(); // Assuming server responds with JSON
                const botMessage = data.message || "I'm sorry, I couldn't understand that.";

                // Append bot message
                const botBubble = document.createElement("div");
                botBubble.classList.add(
                    "bg-blue-100",       // Light blue background for bot messages
                    "p-3",              // Padding for the bubble
                    "rounded-lg",       // Rounded corners
                    "text-sm",          // Small text size
                    "text-gray-800",    // Slightly darker gray text
                    "inline-block",     // Display inline block for alignment
                    "my-2",             // Margin on top and bottom
                    "max-w-xs",
                    "text-left"// Restrict max width for the bubble
                );

                // Add bot message text
                botBubble.textContent = botMessage;

                // Add flex container for alignment
                const botContainer = document.createElement("div");
                botContainer.classList.add("flex", "justify-start", "items-start", "my-1");
                botContainer.appendChild(botBubble);

                // Append bot message to the chat container
                chatbotMessages.appendChild(botContainer);

                // Scroll to the bottom after bot response
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            } catch (error) {
                console.error("Error fetching bot response:", error);

                // Show error message
                const errorBubble = document.createElement("div");
                errorBubble.classList.add(
                    "bg-red-100",       // Light red background for error messages
                    "p-3",              // Padding for the bubble
                    "rounded-lg",       // Rounded corners
                    "text-sm",          // Small text size
                    "text-red-800",     // Dark red text for errors
                    "inline-block",     // Display inline block for alignment
                    "my-2",             // Margin on top and bottom
                    "max-w-xs"          // Restrict max width for the bubble
                );

                errorBubble.textContent = "An error occurred. Please try again later.";

                const errorContainer = document.createElement("div");
                errorContainer.classList.add("flex", "justify-start", "items-start", "my-1");
                errorContainer.appendChild(errorBubble);

                chatbotMessages.appendChild(errorContainer);

                // Scroll to the bottom after error response
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }

            // Clear input field
            chatbotInput.value = "";
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle]'); // Button for toggling
    const navbar = document.querySelector('#navbar-default'); // Navbar ul element

    // Add event listener to toggle the hidden class
    toggleButton.addEventListener('click', () => {
        navbar.classList.toggle('hidden');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalToggleButtons = document.querySelectorAll("[data-modal-toggle]");
    const modalCloseButtons = document.querySelectorAll("[data-modal-hide]");
    const modals = document.querySelectorAll(".fixed");

    // Toggle modal visibility
    modalToggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = document.getElementById(button.getAttribute("data-modal-target"));
            target.classList.toggle("hidden");
        });
    });

    // Close modal when clicking on close button
    modalCloseButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".fixed");
            modal.classList.add("hidden");
        });
    });

    // Close modal when clicking outside the modal content
    document.addEventListener("click", (event) => {
        modals.forEach(modal => {
            const modalContent = modal.querySelector(".relative");
            if (!modalContent.contains(event.target) && !event.target.closest("[data-modal-toggle]")) {
                modal.classList.add("hidden");
            }
        });
    });
});
