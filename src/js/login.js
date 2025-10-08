// Login Page JavaScript - ScriptHadder
class LoginManager {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordInput = document.getElementById('password');
        this.toast = document.getElementById('toast');
        this.loginButton = document.querySelector('.login-button');
        this.buttonText = document.querySelector('.button-text');
        this.buttonLoading = document.querySelector('.button-loading');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupParticles();
        this.loadSavedCredentials();
    }

    setupEventListeners() {
        // Toggle de senha
        this.passwordToggle.addEventListener('click', () => this.togglePassword());
        
        // Validação em tempo real
        this.form.addEventListener('input', (e) => this.validateField(e.target));
        
        // Submit do formulário
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Botões de login social
        document.querySelectorAll('.social-button').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
        });
        
        // Efeitos de hover nos inputs
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => this.animateInput(input, true));
            input.addEventListener('blur', () => this.animateInput(input, false));
        });
        
        // Auto-save do checkbox "Lembrar de mim"
        document.getElementById('remember').addEventListener('change', (e) => {
            this.saveRememberPreference(e.target.checked);
        });
    }

    setupAnimations() {
        // Animação de entrada dos elementos
        const elements = document.querySelectorAll('.form-group, .form-options, .login-button, .divider, .social-login, .signup-link');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

        // Animação do logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.1) rotate(10deg)';
            });
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    setupParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Adicionar movimento aleatório às partículas
            setInterval(() => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                particle.style.left = randomX + '%';
                particle.style.top = randomY + '%';
            }, 5000 + (index * 1000));
        });
    }

    togglePassword() {
        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';
        
        const icon = this.passwordToggle.querySelector('i');
        icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        
        // Animação do ícone
        this.passwordToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.passwordToggle.style.transform = 'scale(1)';
        }, 150);
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldWrapper = field.closest('.input-wrapper');
        const isValid = this.isFieldValid(field, value);
        
        // Remover classes anteriores
        fieldWrapper.classList.remove('valid', 'invalid');
        
        if (value.length > 0) {
            fieldWrapper.classList.add(isValid ? 'valid' : 'invalid');
        }
        
        // Atualizar ícone de validação
        this.updateValidationIcon(fieldWrapper, isValid, value.length > 0);
    }

    isFieldValid(field, value) {
        switch (field.type) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'password':
                return value.length >= 6;
            case 'text':
                return value.length >= 3;
            default:
                return true;
        }
    }

    updateValidationIcon(wrapper, isValid, hasValue) {
        const icon = wrapper.querySelector('.input-icon');
        if (!hasValue) {
            icon.className = icon.className.replace(/fa-check|fa-times/, '');
            return;
        }
        
        icon.className = icon.className.replace(/fa-check|fa-times/, '');
        icon.classList.add(isValid ? 'fa-check' : 'fa-times');
        icon.style.color = isValid ? 'var(--success-color)' : 'var(--error-color)';
    }

    animateInput(input, isFocused) {
        const wrapper = input.closest('.input-wrapper');
        const border = wrapper.querySelector('.input-border');
        
        if (isFocused) {
            wrapper.style.transform = 'translateY(-2px)';
            border.style.width = '100%';
        } else {
            wrapper.style.transform = 'translateY(0)';
            if (!input.value) {
                border.style.width = '0';
            }
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validação geral
        if (!this.validateForm()) {
            this.showToast('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }
        
        // Mostrar loading
        this.setLoading(true);
        
        // Simular requisição de login
        try {
            await this.simulateLogin();
            this.showToast('Login realizado com sucesso!', 'success');
            
            // Salvar credenciais se "Lembrar de mim" estiver marcado
            if (document.getElementById('remember').checked) {
                this.saveCredentials();
            }
            
            // Redirecionar após sucesso
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            this.showToast('Erro ao fazer login. Verifique suas credenciais.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('.form-input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            if (!this.isFieldValid(input, value)) {
                isValid = false;
                this.animateInput(input, true);
                setTimeout(() => this.animateInput(input, false), 2000);
            }
        });
        
        return isValid;
    }

    async simulateLogin() {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular falha ocasional (10% de chance)
        if (Math.random() < 0.1) {
            throw new Error('Login failed');
        }
    }

    setLoading(loading) {
        this.loginButton.classList.toggle('loading', loading);
        this.loginButton.disabled = loading;
        
        if (loading) {
            this.buttonText.style.opacity = '0';
            this.buttonLoading.style.opacity = '1';
        } else {
            this.buttonText.style.opacity = '1';
            this.buttonLoading.style.opacity = '0';
        }
    }

    handleSocialLogin(e) {
        const provider = e.currentTarget.classList.contains('google') ? 'Google' : 'GitHub';
        this.showToast(`Redirecionando para login com ${provider}...`, 'warning');
        
        // Simular redirecionamento
        setTimeout(() => {
            this.showToast(`Login com ${provider} em desenvolvimento`, 'warning');
        }, 1000);
    }

    showToast(message, type = 'info') {
        const toast = this.toast;
        const messageEl = toast.querySelector('.toast-message');
        const iconEl = toast.querySelector('.toast-icon');
        
        // Remover classes anteriores
        toast.className = 'toast';
        
        // Adicionar nova classe de tipo
        toast.classList.add(type);
        
        // Definir mensagem
        messageEl.textContent = message;
        
        // Mostrar toast
        toast.classList.add('show');
        
        // Auto-hide após 4 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    saveCredentials() {
        const formData = {
            usuario: document.getElementById('usuario').value,
            email: document.getElementById('email').value,
            remember: document.getElementById('remember').checked
        };
        
        localStorage.setItem('scriptHadder_credentials', JSON.stringify(formData));
    }

    loadSavedCredentials() {
        const saved = localStorage.getItem('scriptHadder_credentials');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.remember) {
                    document.getElementById('usuario').value = data.usuario || '';
                    document.getElementById('email').value = data.email || '';
                    document.getElementById('remember').checked = true;
                }
            } catch (e) {
                console.warn('Erro ao carregar credenciais salvas:', e);
            }
        }
    }

    saveRememberPreference(remember) {
        if (!remember) {
            localStorage.removeItem('scriptHadder_credentials');
        }
    }
}

// Efeitos adicionais
class VisualEffects {
    constructor() {
        this.setupMouseEffects();
        this.setupKeyboardEffects();
    }

    setupMouseEffects() {
        // Efeito de parallax no mouse
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const xOffset = (x - 0.5) * speed * 20;
                const yOffset = (y - 0.5) * speed * 20;
                
                particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }

    setupKeyboardEffects() {
        // Efeitos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('form-input')) {
                const inputs = Array.from(document.querySelectorAll('.form-input'));
                const currentIndex = inputs.indexOf(e.target);
                const nextInput = inputs[currentIndex + 1];
                
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
                }
            }
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
    new VisualEffects();
    
    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');
});

// Efeito de carregamento da página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevenir zoom em dispositivos móveis
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

