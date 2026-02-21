/**
 * Retro Game Sounds Module
 * Creates arcade/8-bit style sound effects using Web Audio API
 */

class RetroSoundManager {
    constructor() {
        // Create audio context
        this.audioContext = null;
        this.masterVolume = 0.01; // Keep volume moderate
        this.soundEnabled = true;
        
        // Initialize on first user interaction
        this.initAudioContext();
    }

    initAudioContext() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio API not supported');
                this.soundEnabled = false;
            }
        }
    }

    // Create a simple tone
    playTone(frequency, duration, type = 'sine', attack = 0.01) {
        if (!this.soundEnabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.masterVolume, now + attack);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration - 0.1);

        osc.start(now);
        osc.stop(now + duration);
    }

    // Play sequence of tones
    playSequence(frequencies, duration = 0.1) {
        if (!this.soundEnabled || !this.audioContext) return;

        frequencies.forEach((freq, index) => {
            this.audioContext.currentTime && setTimeout(() => {
                this.playTone(freq, duration, 'square');
            }, index * (duration * 1000));
        });
    }

    // Retro "coin" sound
    coin() {
        if (!this.soundEnabled) return;
        const frequencies = [659, 784, 987]; // E5, G5, B5
        this.playSequence(frequencies, 0.05);
    }

    // Retro "select/beep" sound
    select() {
        if (!this.soundEnabled) return;
        this.playTone(523, 0.1, 'square'); // C5
        this.playTone(659, 0.1, 'square'); // E5
    }

    // Success/level up sound
    success() {
        if (!this.soundEnabled) return;
        const frequencies = [523, 659, 784, 987]; // C5, E5, G5, B5
        this.playSequence(frequencies, 0.1);
    }

    // Error/negative sound
    error() {
        if (!this.soundEnabled) return;
        this.playTone(220, 0.15, 'square'); // A3
        this.playTone(165, 0.15, 'square'); // E3
    }

    // Power up sound
    powerup() {
        if (!this.soundEnabled) return;
        const frequencies = [523, 659, 784, 987, 1175]; // Ascending notes
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.1, 'sine');
            }, i * 50);
        });
    }

    // Start/game over sound
    startSound() {
        if (!this.soundEnabled) return;
        this.playTone(440, 0.2, 'square'); // A4
        this.playTone(660, 0.2, 'square'); // E5
    }

    // Beep sound for UI interactions
    beep() {
        if (!this.soundEnabled) return;
        this.playTone(440, 0.08, 'sine'); // A4
    }

    // Retro game music-like background loop (subtle)
    playBackgroundLoop() {
        if (!this.soundEnabled || !this.audioContext) return;

        const frequencies = [329.63, 329.63, 329.63, 349.23, 329.63, 329.63, 349.23]; // Retro melody
        const baseTime = this.audioContext.currentTime;

        frequencies.forEach((freq, index) => {
            const time = baseTime + (index * 0.2);
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, time);
            gain.gain.setValueAtTime(this.masterVolume * 0.1, time);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.1, time + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

            osc.start(time);
            osc.stop(time + 0.2);
        });
    }

    // Glitch/distortion sound
    glitch() {
        if (!this.soundEnabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        
        gain.gain.setValueAtTime(this.masterVolume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    // Toggle sound on/off
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        console.log(`Retro sounds ${this.soundEnabled ? 'enabled' : 'disabled'}`);
        return this.soundEnabled;
    }

    // Set master volume (0-1)
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }
}

// Create global sound manager instance
const soundManager = new RetroSoundManager();

// Global function to play sounds from HTML
function playSound(soundName) {
    if (!soundManager) return;

    switch (soundName) {
        case 'coin':
            soundManager.coin();
            break;
        case 'select':
        case 'beep':
            soundManager.select();
            break;
        case 'success':
            soundManager.success();
            break;
        case 'error':
            soundManager.error();
            break;
        case 'powerup':
            soundManager.powerup();
            break;
        case 'start':
            soundManager.startSound();
            break;
        case 'glitch':
            soundManager.glitch();
            break;
        default:
            soundManager.beep();
    }
}

// Initialize audio context on user interaction
document.addEventListener('click', () => {
    if (soundManager.audioContext && soundManager.audioContext.state === 'suspended') {
        soundManager.audioContext.resume();
    }
}, { once: true });

// Optional: Play intro sound when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        playSound('start');
    }, 500);
});
