document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const skillSections = document.querySelectorAll('.skill-section'); // Todas las secciones de habilidad
    const mainContent = document.getElementById('main-content'); // Contenedor principal
    const privacyModal = document.getElementById('privacy-modal');
    const privacyModalOverlay = document.getElementById('privacy-modal-overlay');
    const openPrivacyLink = document.getElementById('privacy-policy-link'); // ID del enlace que abrirá el modal
    const closePrivacyModalBtn = document.getElementById('close-privacy-modal');

    // --- Lógica del Sidebar ---

    // Función para abrir/expandir el sidebar
    const openSidebar = () => {
        sidebar.classList.add('active');
        sidebar.classList.remove('collapsed'); // Asegura que no esté colapsado
        // Opcional: Añadir clase al body para evitar scroll del fondo
        document.body.classList.add('sidebar-open');
    };

    // Función para cerrar/colapsar el sidebar
    const closeSidebarFunc = () => {
        sidebar.classList.remove('active');
        sidebar.classList.add('collapsed'); // Vuelve al estado colapsado
        // Opcional: Remover clase del body
        document.body.classList.remove('sidebar-open');
    };

    // Event listener para el botón de hamburguesa
    if (burgerMenu) {
        burgerMenu.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que el clic se propague al documento
            if (sidebar.classList.contains('active')) {
                closeSidebarFunc();
            } else {
                openSidebar();
            }
        });
    }

    // Event listener para el botón de cerrar
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeSidebarFunc);
    }

    // Event listener para cerrar al hacer clic fuera del sidebar (en el main content)
    if (mainContent && sidebar) {
        document.addEventListener('click', (event) => {
            // Si el sidebar está activo Y el clic ocurrió FUERA del sidebar
            if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !burgerMenu.contains(event.target)) {
                closeSidebarFunc();
            }
        });
    }

    // Event listener para cerrar con la tecla Escape
     document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    });


    // --- Lógica para Mostrar Secciones de Habilidades ---

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento de ancla por defecto

            const targetId = link.getAttribute('href'); // Obtener el ID del href (ej: #skill-autoconocimiento)
            const targetSection = document.querySelector(targetId); // Encontrar la sección

            if (targetSection) {
                // 1. Ocultar todas las secciones de habilidad
                skillSections.forEach(section => {
                    section.classList.remove('visible');
                    section.classList.add('hidden-skill'); // Asegurar que esté oculta
                });

                // 2. Mostrar la sección objetivo
                targetSection.classList.remove('hidden-skill');
                targetSection.classList.add('visible');

                // 3. Cerrar el sidebar
                closeSidebarFunc();

                // 4. Opcional: Scroll suave a la sección
                // Esperar un poco para que el sidebar se cierre y el margen cambie (si aplica)
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 400); // Ajustar tiempo si es necesario

            } else {
                console.warn(`Sección objetivo no encontrada para el enlace: ${targetId}`);
                 closeSidebarFunc(); // Cerrar sidebar incluso si no se encuentra la sección
            }
        });
    });


    // --- Lógica para el Header que cambia de color (Sin cambios) ---
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (!header) return; // Verificar si el header existe
        if (window.scrollY > scrollThreshold) {
            header.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--background-light)';
            header.style.boxShadow = 'var(--shadow-light)';
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Llamada inicial para asegurar el estado correcto del header al cargar
    handleScroll();
     // Función para abrir el modal de privacidad
     const openPrivacyModal = () => {
        if (privacyModal && privacyModalOverlay) {
            privacyModal.classList.add('active');
            privacyModalOverlay.classList.add('active');
        }
    };

    // Función para cerrar el modal de privacidad
    const closePrivacyModalFunc = () => {
        if (privacyModal && privacyModalOverlay) {
            privacyModal.classList.remove('active');
            privacyModalOverlay.classList.remove('active');
        }
    };

    // Event listener para el enlace que abre el modal
    if (openPrivacyLink) {
        openPrivacyLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            openPrivacyModal();
        });
    } else {
         // Es normal que este enlace no exista hasta que se modifique el HTML del form
         // console.warn("Elemento #privacy-policy-link no encontrado. Asegúrate de añadir este ID al enlace en el texto del formulario.");
    }


    // Event listener para el botón de cerrar el modal
    if (closePrivacyModalBtn) {
        closePrivacyModalBtn.addEventListener('click', closePrivacyModalFunc);
    }

    // Event listener para cerrar el modal haciendo clic en el overlay
    if (privacyModalOverlay) {
        privacyModalOverlay.addEventListener('click', closePrivacyModalFunc);
    }

    // Opcional: Cerrar con la tecla Escape (añadir al listener de keydown existente o crear uno nuevo)
     document.addEventListener('keydown', (event) => {
        // ... (código existente para cerrar sidebar con Escape) ...
        if (event.key === 'Escape' && privacyModal && privacyModal.classList.contains('active')) {
            closePrivacyModalFunc();
        }
    });


}); // Fin de DOMContentLoaded



// --- Funciones Opcionales para Overlay ---

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1099'; // Debajo del sidebar pero sobre el contenido
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.4s ease';
    document.body.appendChild(overlay);
    // Forzar reflow para que la transición funcione
    void overlay.offsetWidth;
    overlay.style.opacity = '1';

    overlay.addEventListener('click', () => { // Cerrar al hacer clic en el overlay
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
        removeOverlay();
    });
}

function removeOverlay() {
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => { // Esperar a que termine la transición antes de remover
             if (overlay.parentNode) {
                 overlay.parentNode.removeChild(overlay);
             }
        }, 400);
    }
}
