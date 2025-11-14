// Obtener el contexto 2D del lienzo
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Configuración inicial del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuración de dibujo
ctx.strokeStyle = 'red';
ctx.lineWidth = 1.0; // Aumento el grosor para que se vea mejor al dibujar
ctx.lineCap = 'round'; // Borde de línea redondeado
ctx.beginPath(); // Inicia un solo camino de dibujo

// **Funciones de la Curva Paramétrica**
function heartX(k) {
    return 15 * Math.pow(Math.sin(k), 3);
}

function heartY(k) {
    // Usamos el resultado sin invertir el signo para la fórmula de la curva
    return 12 * Math.cos(k) - 5 * Math.cos(2 * k) - 2 * Math.cos(3 * k) - Math.cos(4 * k);
}

// **Parámetros de Animación**
const SCALE = 20; 
const TOTAL_POINTS = 6000; 
const STEPS_PER_FRAME = 5; // Dibuja 30 puntos por cada actualización de la pantalla (más rápido)

// El punto central (origen 0,0)
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let currentPoint = 0; // Contador para saber qué punto de la curva dibujar

// Función principal de animación
function animateHeart() {
    // Dibuja múltiples pasos en cada frame para acelerar el proceso
    for (let s = 0; s < STEPS_PER_FRAME; s++) {
        if (currentPoint < TOTAL_POINTS) {
            // Calcula el parámetro k, más pequeño para una curva más suave
            const k = currentPoint * 0.01; 
            
            const x_coord = heartX(k) * SCALE;
            const y_coord = heartY(k) * SCALE;
            
            const screenX = centerX + x_coord;
            // Invertimos la Y
            const screenY = centerY - y_coord; 

            // **Lógica de Dibujo del Corazón y el efecto de "relleno"**
            
            // 1. Dibuja la línea desde el punto actual al centro (efecto radial)
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(centerX, centerY);
            ctx.stroke();

            // 2. Dibuja el punto en la curva (opcional, para el contorno)
            ctx.beginPath();
            ctx.arc(screenX, screenY, 0.5, 0, Math.PI * 2); // Dibuja un pequeño círculo (punto)
            ctx.fillStyle = 'red';
            ctx.fill();

            currentPoint++;
        }
    }

    // Solicita la siguiente animación si aún no ha terminado de dibujar
    if (currentPoint < TOTAL_POINTS) {
        requestAnimationFrame(animateHeart);
    }
}

// Inicia el proceso de animación
animateHeart();