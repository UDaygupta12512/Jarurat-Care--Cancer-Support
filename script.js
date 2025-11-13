document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote');
    const contactForm = document.getElementById('contact-form');

    // Array of fallback quotes in case the API fails
    const fallbackQuotes = [
        {
            text: "You beat cancer by how you live, why you live, and in the manner in which you live.",
            author: "Stuart Scott"
        },
        {
            text: "Cancer can take away all of my physical abilities. It cannot touch my mind, it cannot touch my heart, and it cannot touch my soul.",
            author: "Jim Valvano"
        },
        {
            text: "Hope is the only thing stronger than fear.",
            author: "Suzanne Collins"
        }
    ];

    // Function to fetch a random quote from the Quotable API
    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            return {
                text: data.content,
                author: data.author
            };
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Return a random fallback quote if API fails
            return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        }
    }

    // Function to update the quote display
    async function updateQuote() {
        quoteText.textContent = 'Loading...';
        quoteAuthor.textContent = '';
        
        const quote = await fetchQuote();
        quoteText.textContent = `"${quote.text}"`;
        if (quote.author) {
            quoteAuthor.textContent = `— ${quote.author}`;
        }
    }

    // Event listener for the new quote button
    newQuoteBtn.addEventListener('click', updateQuote);

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert and reset the form
        alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
        contactForm.reset();
    });

    // Load the first quote when the page loads
    updateQuote();
});
