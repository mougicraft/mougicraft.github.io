// Copy to clipboard functionality with sound
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        // Play coin sound for successful copy
        if (typeof playSound === 'function') {
            playSound('coin');
        }

        if (type === 'java') {
            const copiedText = document.querySelector('.java-copied');
            if (copiedText) {
                copiedText.style.display = 'block';
                setTimeout(() => {
                    copiedText.style.display = 'none';
                }, 2000);
            }
        } else if (type === 'bedrock') {
            const copiedText = document.querySelector('.bedrock-copied');
            if (copiedText) {
                copiedText.style.display = 'block';
                setTimeout(() => {
                    copiedText.style.display = 'none';
                }, 2000);
            }
        }
    });
}

// Rank data
const ranks = [
    {
        name: "ELITE",
        price: "15K",
        features: ["Fly :/fly"],
        nameColor: "text-primary",
    },
    {
        name: "VIP",
        price: "30K",
        features: ["Set Home 4 :/home", "Fly :/fly", "Colour Chat", "Limit Blok = 13.000"],
        nameColor: "text-primary",
    },
    {
        name: "VIP+",
        price: "45K",
        features: ["Set Home 8 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Limit Blok = 18.000"],
        nameColor: "text-primary",
    },
    {
        name: "MVP",
        price: "60K",
        features: ["Set Home 15 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Limit Blok = 30.000"],
        nameColor: "text-gold",
        popular: true,
    },
    {
        name: "MVP+",
        price: "180K",
        features: ["Set Home 20 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Limit Blok = 45.000"],
        nameColor: "text-gold",
        popular: true,
    },
    {
        name: "LEGEND",
        price: "220K",
        features: ["Set Home 25 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Feed :/feed", "Smiting Table :/smitingtable", "Limit Blok = 75.000"],
        nameColor: "text-legend",
    },
    {
        name: "SULTAN",
        price: "260K",
        features: ["Set Home 30 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Repair :/erepair", "Feed :/feed", "Smiting Table :/smitingtable", "Heal :/heal", "Limit Blok = 110.000"],
        nameColor: "text-sultan",
    },
    {
        name: "MYTHIC",
        price: "380K",
        features: ["Set Home ∞ :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Repair :/erepair", "Feed :/feed", "Smiting Table :/smitingtable", "Heal :/heal", "Enchant :/enchant", "Limit Blok = 150.000"],
        nameColor: "text-mythic",
    },
    {
        name: "DONATOR",
        price: "720K",
        features: ["Set Home ∞ :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Repair :/erepair", "Feed :/feed", "Smiting Table :/smitingtable", "Heal :/heal", "Godmode :/godmode", "Enchant :/enchant", "Time Set :/time set", "Weather Set :/weather set", "Lightning :/lightning", "Limit Blok = 200.000"],
        nameColor: "text-donator",
    },
    {
        name: "KING DONATOR",
        price: "1.600K",
        features: ["All Donator features", "Ultimate rank privileges"],
        nameColor: "text-king",
    },
];

// Generate rank cards with retro animations
function generateRankCards() {
    const rankGrid = document.querySelector('.rank-grid');
    if (!rankGrid) return;

    ranks.forEach((rank, index) => {
        const card = document.createElement('div');
        card.className = `rank-card ${rank.popular ? 'popular' : ''} pixel-bounce-card`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        let featuresHTML = '';
        rank.features.forEach(feature => {
            featuresHTML += `<li><span>◆</span><span>${feature}</span></li>`;
        });

        card.innerHTML = `
            ${rank.popular ? '<span class="popular-badge pixel-bounce">⭐ POPULAR</span>' : ''}
            <h3 class="${rank.nameColor} glitch-text-effect">${rank.name}</h3>
            <div class="rank-divider-line"></div>
            <p class="price">IDR <span class="${rank.nameColor}">${rank.price}</span></p>
            <div class="expand-indicator">
                <span class="expand-text">Click to see features</span>
                <span class="expand-arrow">▼</span>
            </div>
            <ul class="features">
                ${featuresHTML}
            </ul>
        `;
        
        // Add click event listener to toggle features with sound
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            // Play select sound on rank card click
            if (typeof playSound === 'function') {
                playSound('select');
            }
        });

        // Add hover sound effect
        card.addEventListener('mouseenter', function() {
            if (typeof playSound === 'function') {
                playSound('beep');
            }
        });
        
        rankGrid.appendChild(card);
    });
}

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize page animations
function initPageAnimations() {
    // Add animation to hero content elements (immediate for hero since it's visible on load)
    const heroElements = document.querySelectorAll('.hero-logo, .hero-title, .hero-subtitle, .server-card, .social-card');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ease-out forwards`;
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Observe rank cards for scroll-triggered animation
    document.querySelectorAll('.rank-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(card);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        animationObserver.observe(title);
    });

    // Observe crate cards
    document.querySelectorAll('.pixel-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(card);
    });

    // Observe iframe container
    const iframeContainer = document.querySelector('.iframe-container');
    if (iframeContainer) {
        iframeContainer.style.opacity = '0';
        animationObserver.observe(iframeContainer);
    }

    // Add click effects to interactive elements (excluding social cards)
    document.querySelectorAll('.retro-button:not(.social-card), .pixel-card, .rank-card').forEach(el => {
        el.addEventListener('click', () => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    });
}

// Fade in up animation for elements
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Apply animation when element enters viewport */
    .rank-card.animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .section-title.animate-in span,
    .section-title.animate-in h2 {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .section-title span {
        opacity: 0;
    }

    .section-title h2 {
        opacity: 0;
    }

    .pixel-card.animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .iframe-container.animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .rank-card:nth-child(1).animate-in { animation-delay: 0s; }
    .rank-card:nth-child(2).animate-in { animation-delay: 0.1s; }
    .rank-card:nth-child(3).animate-in { animation-delay: 0.2s; }
    .rank-card:nth-child(4).animate-in { animation-delay: 0.3s; }
    .rank-card:nth-child(5).animate-in { animation-delay: 0.4s; }
    .rank-card:nth-child(n+6).animate-in { animation-delay: calc((var(--index, 0) - 5) * 0.1s); }

    .pixel-card:nth-child(1).animate-in { animation-delay: 0s; }
    .pixel-card:nth-child(2).animate-in { animation-delay: 0.1s; }
    .pixel-card:nth-child(3).animate-in { animation-delay: 0.2s; }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateRankCards();
    initPageAnimations();
});

