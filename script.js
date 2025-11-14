// Obtener el contexto 2D del lienzo
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Configurar el tamaño del canvas para que sea igual al de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Establecer el color y grosor del trazo
ctx.strokeStyle = 'red';
ctx.lineWidth = 0.5;

// **Funciones de la Curva Paramétrica**
function heartX(k) {
    return 15 * Math.pow(Math.sin(k), 3);
}

function heartY(k) {
    // La Y se invierte al dibujar para que el corazón quede con la punta hacia abajo.
    return 12 * Math.cos(k) - 5 * Math.cos(2 * k) - 2 * Math.cos(3 * k) - Math.cos(4 * k);
}

// **Parámetros de Dibujo**
const SCALE = 20; 
const ITERATIONS = 6000; 

// El punto central (origen 0,0) en la pantalla
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Comenzar el dibujo
for (let i = 0; i < ITERATIONS; i++) {
    // Ajuste del parámetro 'k' para una iteración más fina
    const k = i * 0.01; 
    
    const x_coord = heartX(k) * SCALE;
    const y_coord = heartY(k) * SCALE;
    
    // Coordenada Y se resta de centerY para invertir el eje y mantener la orientación.
    const screenX = centerX + x_coord;
    const screenY = centerY - y_coord;

    // **Dibujo de la línea radial**
    // Dibuja una línea desde el punto de la curva hasta el centro.
    
    ctx.beginPath();
    
    // 1. Mover al punto en la periferia del corazón
    ctx.moveTo(screenX, screenY);
    
    // 2. Dibujar una línea hasta el centro
    ctx.lineTo(centerX, centerY);
    
    // Aplicar el trazo
    ctx.stroke();
}