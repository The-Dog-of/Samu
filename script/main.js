document.addEventListener('DOMContentLoaded', () => {
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches && cursorDot) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
        });
        const links = document.querySelectorAll('a, button, input, textarea');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger){
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if(navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#FFFBF2';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '3px solid #2C2420';
            }
        });
    }

    const discordForm = document.getElementById('discordForm');
    
    if (discordForm) {
        discordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('submitBtn');
            const status = document.getElementById('formStatus');
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            btn.innerHTML = 'Enviando...';
            btn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, message })
                });

                if (response.ok) {
                    status.textContent = "Mensagem enviada com sucesso! 🤎";
                    status.className = "status-msg success";
                    discordForm.reset();
                } else {
                    throw new Error('Erro no servidor');
                }
            } catch (error) {
                status.textContent = "Erro ao enviar. Tente novamente.";
                status.className = "status-msg error";
                console.error(error);
            } finally {
                btn.innerHTML = 'Enviar Mensagem';
                btn.disabled = false;
                setTimeout(() => { status.textContent = ""; }, 5000);
            }
        });
    }
});