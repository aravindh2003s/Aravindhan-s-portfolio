# Professional Portfolio Website - Aravindhan S

A stunning, **production-ready full-stack portfolio website** built with **Java Spring Boot** backend and modern **HTML/CSS/JavaScript** frontend featuring glassmorphism effects, database integration, and email notifications.

## ✨ Features

### 🎨 **Frontend**
- 🌟 **Premium Glassmorphism Design** - Modern glass effects with blur and transparency
- 🌈 **Gradient Animations** - Beautiful color gradients with smooth transitions
- 📱 **Fully Responsive** - Works perfectly on all devices (mobile, tablet, desktop)
- ⚡ **Interactive UI** - Cursor glow, parallax effects, card tilt, and more
- 🎯 **Smooth Scrolling** - Seamless navigation between sections
- 📊 **Animated Statistics** - Counter animations for achievements
- 💼 **Project Showcase** - Beautiful project cards with hover effects
- 🎭 **Scroll Animations** - Elements fade in as you scroll

### 🔧 **Backend (Full-Stack)**
- ☕ **Java Spring Boot 3.2.1** - Modern enterprise framework
- 🗄️ **Database Integration** - H2 in-memory database with JPA/Hibernate
- 📧 **Email Notifications** - JavaMailSender with auto-reply system
- 🔌 **RESTful API** - Complete CRUD operations for contact messages
- ✅ **Form Validation** - Bean validation with error handling
- 🎛️ **Admin Dashboard** - View and manage contact form submissions
- 🔍 **H2 Console** - Built-in database management interface
- 🧪 **Unit Tests** - JUnit test coverage

### 📬 **Contact Form Features**
- ✅ Message saved to database
- ✅ Email notification sent to you
- ✅ Auto-reply sent to user
- ✅ Real-time validation
- ✅ Success/error feedback

## 🛠️ Tech Stack

### Backend
- Java 17+
- Spring Boot 3.2.1
- Maven

### Frontend
- HTML5
- CSS3 (Variables, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Outfit)
- Font Awesome Icons

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js (for frontend e2e testing)

### Backend Setup

1. Open a terminal and navigate to the backend directory:
```bash
cd backend
```

2. Build the Spring Boot project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```
The backend API will run on `http://localhost:8080`.

### Frontend Setup

1. Open a separate terminal and navigate to the frontend directory:
```bash
cd frontend/public
```

2. You can serve the frontend using any static file server, for example with Python or Node.js:
```bash
# Using Python 3
python -m http.server 3000

# Using Node.js (npx)
npx serve .
```

3. Open your browser and visit the local address (e.g. `http://localhost:3000`).

## 📁 Project Structure

```text
portfolio-website/
├── backend/                  # Spring Boot application
│   ├── src/main/java/        # Java source code
│   ├── src/main/resources/   # Backend configurations
│   └── pom.xml               # Maven dependencies
├── frontend/                 # Frontend application
│   └── public/               # Static assets
│       ├── css/              # Stylesheets
│       ├── js/               # JavaScript logic
│       ├── images/           # Images & media
│       ├── index.html        # Main portfolio page
│       └── admin.html        # Admin dashboard
├── tests/                    # Playwright E2E tests
│   ├── e2e/                  # Test specifications
│   ├── playwright.config.ts  # Playwright configuration
│   └── package.json          # Node.js test dependencies
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

## 🎨 Customization

### Update Personal Information

Edit `frontend/public/index.html`:
- Change name in navigation: `<a href="#home" class="logo">Your Name</a>`
- Update hero title and subtitle
- Modify contact information (email, phone, location)
- Update social media links

### Modify Colors

Edit CSS variables in `frontend/public/css/style.css`:
```css
:root {
    --primary-bg: #0a0e27;
    --accent-color: #6366f1;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add Your Projects

Update the projects section in `index.html` with your actual projects, descriptions, and links.

## 🌟 Interactive Features

- **Cursor Glow Effect** - Follows your mouse with a gradient glow
- **Parallax Shapes** - Background shapes move with mouse movement
- **Card Tilt Effect** - Project cards tilt on hover
- **Scroll Animations** - Elements animate into view
- **Counter Animations** - Statistics count up when scrolled into view
- **Skill Progress Bars** - Animated skill level indicators
- **Button Ripple Effect** - Material design ripple on button clicks
- **Mobile Menu** - Smooth hamburger menu for mobile devices

## 📧 Contact Form

The contact form is fully functional and connected to the Spring Boot backend. Form submissions are logged to the console. To add email functionality:

1. Add email dependencies to `pom.xml`
2. Configure SMTP settings in `application.properties`
3. Update `PortfolioController.java` to send emails

## 🔧 Development

To enable hot reload during development:
- Spring Boot DevTools is already configured
- Changes to templates and static files will auto-reload
- Java changes require application restart

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💡 Tips

1. Replace placeholder project images with your actual project screenshots
2. Update the statistics to reflect your real achievements
3. Add your actual social media links
4. Customize colors to match your personal brand
5. Add more sections as needed (testimonials, blog, etc.)

---

**Built with ❤️ and ☕ using Java Spring Boot**
