const API_URL = CONFIG.API_BASE_URL;
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const messagesGrid = document.getElementById('messagesGrid');
const logoutBtn = document.getElementById('logoutBtn');

// Check Initial Auth State
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        showDashboard();
        fetchMessages(token);
    }
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    loginMessage.textContent = "Authenticating...";
    loginMessage.className = 'form-message';

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('admin_token', data.token);
            showDashboard();
            fetchMessages(data.token);
            loginForm.reset();
        } else {
            loginMessage.textContent = "Access Denied: Invalid credentials.";
            loginMessage.classList.add('error');
        }
    } catch (err) {
        console.error(err);
        loginMessage.textContent = "Connection failed. Backend may be offline.";
        loginMessage.classList.add('error');
    }
});

// Fetch Messages
async function fetchMessages(token) {
    try {
        const response = await fetch(`${API_URL}/admin/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            renderMessages(data.messages);
        } else if (response.status === 401 || response.status === 403) {
            handleLogout(); // Token expired or invalid
        }
    } catch (err) {
        messagesGrid.innerHTML = `
            <div class="no-messages error">
                <i class="fas fa-exclamation-triangle fa-2x"></i>
                <p style="margin-top: 1rem;">Failed to retrieve messages.</p>
            </div>
        `;
    }
}

// Render Messages
function renderMessages(messages) {
    if (!messages || messages.length === 0) {
        messagesGrid.innerHTML = `
            <div class="no-messages">
                <i class="fas fa-inbox fa-2x"></i>
                <p style="margin-top: 1rem;">Inbox is empty. No transmissions received.</p>
            </div>
        `;
        return;
    }

    messagesGrid.innerHTML = messages.map(msg => `
        <div class="glass-panel message-card" style="animation: fadeInUp 0.5s ease-out forwards; ${msg.read ? 'border-left-color: var(--glass-border); opacity: 0.7;' : ''}">
            <div class="message-header">
                <div>
                    <strong>${escapeHTML(msg.name)}</strong>
                    <span style="margin: 0 0.5rem;">|</span>
                    <a href="mailto:${escapeHTML(msg.email)}" class="text-accent">${escapeHTML(msg.email)}</a>
                </div>
                <div>${new Date(msg.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="message-content">
                ${escapeHTML(msg.message).replace(/\n/g, '<br>')}
            </div>
        </div>
    `).reverse().join('');
}

// View Transitions
function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.classList.add('active');
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('admin_token');
    dashboardSection.classList.remove('active');
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'block';
    loginMessage.textContent = '';

    // Reset login section instantly
    void loginSection.offsetWidth;
}

logoutBtn.addEventListener('click', handleLogout);

// Util: Prevent XSS attacks from message contents
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}
