class WavyCanvas {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.startTime = Date.now();
        
        // Animation parameters based on the CodePen
        this.w = 0;
        this.h = 0;
        this.waves = [];
        this.numberOfWaves = 6;
        
        this.init();
    }

    init() {
        const canvasSection = document.querySelector('.canvas-section');
        if (!canvasSection) {
            console.log('WavyCanvas: No .canvas-section found');
            return;
        }

        console.log('WavyCanvas: Initializing wavy animation...');

        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        
        canvasSection.style.position = 'relative';
        canvasSection.appendChild(this.canvas);

        // Get 2D context
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.warn('Canvas 2D not supported');
            return;
        }

        this.setupCanvas();
        this.initWaves();
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        console.log('WavyCanvas: Animation started');
    }

    setupCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        
        console.log(`Canvas size: ${this.w} x ${this.h}`);
    }

    initWaves() {
        this.waves = [];
        
        // Create multiple wave layers like in the CodePen
        for (let i = 0; i < this.numberOfWaves; i++) {
            this.waves.push({
                amplitude: 30 + i * 15,           // Wave height
                frequency: 0.02 + i * 0.005,     // Wave frequency
                phase: i * Math.PI / 3,          // Phase offset
                speed: 0.5 + i * 0.3,            // Animation speed
                opacity: 0.15 - i * 0.02,        // Transparency
                offsetY: this.h * 0.4 + i * 20   // Vertical position
            });
        }
        
        console.log('Waves initialized:', this.waves.length);
    }

    drawWave(wave, time) {
        const points = [];
        const step = 5; // Resolution
        
        // Generate wave points
        for (let x = 0; x <= this.w; x += step) {
            const y = wave.offsetY + 
                     Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                     Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5 + wave.phase) * (wave.amplitude * 0.3);
            points.push({ x, y });
        }
        
        // Set fill style with our color #B2B274
        this.ctx.fillStyle = `rgba(178, 178, 116, ${wave.opacity})`;
        this.ctx.globalCompositeOperation = 'normal';
        
        // Create filled wave shape
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.h);
        
        // Draw wave curve
        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            
            if (i === 0) {
                this.ctx.lineTo(current.x, current.y);
            } else {
                // Smooth curve using quadratic curves
                const cpX = (current.x + next.x) / 2;
                const cpY = (current.y + next.y) / 2;
                this.ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
            }
        }
        
        // Close the shape
        const lastPoint = points[points.length - 1];
        this.ctx.lineTo(lastPoint.x, lastPoint.y);
        this.ctx.lineTo(this.w, this.h);
        this.ctx.lineTo(0, this.h);
        this.ctx.closePath();
        
        this.ctx.fill();
    }

    animate() {
        const currentTime = (Date.now() - this.startTime) / 1000;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.w, this.h);
        
        // Draw all waves
        this.waves.forEach(wave => {
            this.drawWave(wave, currentTime);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        this.setupCanvas();
        this.initWaves();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }

        window.removeEventListener('resize', this.handleResize);
        
        this.canvas = null;
        this.ctx = null;
        
        console.log('WavyCanvas: Destroyed');
    }
}

let wavyCanvasInstance = null;

export function initWavyCanvas() {
    console.log('initWavyCanvas called!');
    if (wavyCanvasInstance) {
        wavyCanvasInstance.destroy();
    }
    wavyCanvasInstance = new WavyCanvas();
}

export function destroyWavyCanvas() {
    if (wavyCanvasInstance) {
        wavyCanvasInstance.destroy();
        wavyCanvasInstance = null;
    }
}