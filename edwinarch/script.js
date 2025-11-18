const messageElement = document.getElementById('pulsating-message');
        let startTime = Date.now();

        function updatePulsation() {
            const elapsed = (Date.now() - startTime) / 1000;
            const pulsationFactor = 1 + 0.5 * Math.sin(elapsed * 3);
            let fontSize = 50 * pulsationFactor;

            if (fontSize < 30) {
                fontSize = 30;
            } else if (fontSize > 70) {
                fontSize = 70;
            }

            messageElement.style.fontSize = `${fontSize}px`;
            requestAnimationFrame(updatePulsation);
        }

        updatePulsation();

        // Lógica para generar partículas de fondo
        const numParticles = 50; // Número de partículas
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            document.body.appendChild(particle);

            // Posición y tamaño inicial aleatorio
            const size = Math.random() * 5 + 2; // Tamaño entre 2 y 7px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
            particle.style.top = `${Math.random() * 100}vh`; // Posición vertical aleatoria

            // Retraso de animación aleatorio para que no todas empiecen al mismo tiempo
            particle.style.animationDelay = `${Math.random() * -10}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // Duración de animación entre 5 y 15s
        }