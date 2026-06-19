/**
 * Main JavaScript for Auto Care E-commerce
 * Handles navbar interactions, dropdown menus, and admin sidebar
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== Dropdown Toggle (Navbar Categories) =====
  document.querySelectorAll('.dropdown > a').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Close dropdown if clicked outside
  window.addEventListener('click', function(e) {
    if (!e.target.matches('.dropdown > a')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // ===== Hamburger Menu Toggle =====
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ===== Admin Sidebar Active Link Handler =====
  const currentPath = window.location.pathname;
  document.querySelectorAll('.admin-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href !== '/admin' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });
});
