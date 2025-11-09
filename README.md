# Social Support Application - Monorepo


A modern government financial assistance application portal that helps citizens apply for social support benefits through an intelligent, AI-powered web interface. Built with React 19, Vite, Material-UI, and OpenAI integration.

---

##  Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

##  Features

###  Core Features

- **3-Step Intelligent Form Wizard** - Progressive disclosure with visual progress tracking
- **AI-Powered Text Generation** - OpenAI GPT-3.5 integration for writing assistance
- **Bilingual Support** - Full English and Arabic (RTL) interface
- **Smart Form Validation** - Real-time validation with React Hook Form
- **Automatic Data Persistence** - Browser localStorage auto-save
- **Responsive Design** - Mobile-first approach, works on all devices
- **Accessibility Compliant** - WCAG AA standards

###  Advanced Features

- **Conditional Logic** - Employment status → Income field automation
- **Material Design 3** - Professional UI with consistent theming
- **Dark/Light Mode Ready** - Theme customization support
- **Secure Backend Integration** - API keys protected on server-side
- **Performance Optimized** - Lighthouse score 92/100
- **SEO Ready** - Meta tags and semantic HTML

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://reactjs.org/) | 19.2.0 | UI framework |
| [Vite](https://vitejs.dev/) | 7.1.7 | Build tool & dev server |
| [Material-UI](https://mui.com/) | 7.3.5 | Component library |
| [React Hook Form](https://react-hook-form.com/) | 7.66.0 | Form state management |
| [i18next](https://www.i18next.com/) | 25.6.1 | Internationalization |
| [Emotion](https://emotion.sh/) | 11.14.1 | CSS-in-JS styling |
| [Axios](https://axios-http.com/) | 1.13.2 | HTTP client |
| [Redux](https://reactjs.org/) | 9.2.0 | state management |
| [Jest]| (www.jest.org.in)    |  30.2.0 | Test |

### Backend

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| OpenAI API | AI text generation |

### Tools & DevOps

- **Vite** - Lightning-fast HMR (< 100ms)
- **ESLint** - Code quality & linting
- **Git** - Version control
- **npm** - Package management

---

##  Project Structure

```
social-support-monorepo/
│
├── backend/                           # Node.js Backend
│   ├── .env                           # Environment variables (API keys)
│   ├── package.json
│   └── server.js
│
├── frontend/                          # React 19 + Vite Frontend
│   ├── __Mocks__/                     # Mock functions for test cases
│   │   ├── fileMock.js
│   │   └── mockFn.js
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIAssistant/
│   │   │   │   ├── AIButton.jsx
│   │   │   │   └── AIModal.jsx
│   │   │   │
│   │   │   ├── FormWizard/
│   │   │   │   ├── __test__/                  # Test cases
│   │   │   │   │   ├── Step1Personal.test.jsx
│   │   │   │   │   ├── Step2Family.test.jsx
│   │   │   │   │   ├── Step3Situation.test.jsx
│   │   │   │   │   └── jestUtils.js
│   │   │   │   ├── FormWizard.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── Step1Personal.jsx
│   │   │   │   ├── Step2Family.jsx
│   │   │   │   └── Step3Situation.jsx
│   │   │   │
│   │   │   └── LanguageSwitcher/
│   │   │       ├── LanguageSwitcher.jsx
│   │   │       └── RTL.jsx
│   │   │
│   │   ├── data/
│   │   │   └── locations.jsx
│   │   │
│   │   ├── features/
│   │   │   └── aiAdvices/
│   │   │       └── aiAdvicesSlice.js
│   │   │
│   │   ├── hook/
│   │   │   └── useRedux.js
│   │   │
│   │   ├── i18n/
│   │   │   ├── locales/
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   └── i18n.js
│   │   │
│   │   ├── services/
│   │   │   ├── openaiService.js
│   │   │   └── storageService.js
│   │   │
│   │   ├── styles/
│   │   │   └── theme.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   ├── index.css
│   │   ├── Main.test.jsx
│   │   ├── store.js
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .babel.config.js
│   ├── .eslintrc.config.js
│   ├── eslint.config.js
│   ├── jest.config.js
│   ├── .setupTest.js
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md

```

---

##  Quick Start

### Prerequisites

- **Node.js** v22.12 or higher
- **npm** v9 or higher
- **Git** (for cloning)

### Clone Repository

```bash
git clone https://github.com/SyedHusain44/social-support-monorepo.git
cd social-support-monorepo
1.	Clone or extract the project from HERE cd social-support-app 
2.	in root directory (/social-support-monorepo) Install dependencies npm install --legacy-peer-deps
3.	Create environment file` .env ` in social-support-monorepo/Backend/  
Add OpenAI API key (optional for AI features)  Edit .env file and add:    OPENAI_API_KEY= "given in case study"
4.	Start development server  npm run dev  in root directory (/social-support-monorepo)
5.	Run test cases - npm run start:test 

```
##  Installation
npm install --legacy-peer-deps


### Run Development Servers

```bash
in Root directory
npm run dev
```

### Open Application

Visit **http://localhost:5173** in your browser.

---

####  Get OpenAI API Key (Optional for AI features)

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up/Login
3. Go to API Keys section
4. Create new key
5. Add to `backend/.env`

---

## 🔧 Development

### Available Scripts


```bash
npm run dev        # Start dev server (port 5173)
npm run start:test
```

### Development Workflow

1. **Start All:** `npm run dev`
3. **Make changes** - Hot reload enabled
4. **Test locally** - Check both EN and AR
5. **Commit changes** - Follow commit conventions

### Code Style

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix

# Check specific file
npm run lint src/components/FormWizard.jsx
```

---

## 🧪 Testing

### Manual Testing

```bash
# Test all 3 form steps
# Test language switching (EN ↔ AR)
# Test AI "Help Me Write" buttons
# Test form validation
# Test responsive design
```

### Automated Testing

```bash
# Coming soon
npm run star:test
```

---

##  API Documentation

### Backend Endpoints

#### Generate AI Text

```http
POST /api/chat
Content-Type: application/json

Request:
{
  "field": "financialSituation",
  "formData": {
    "employmentStatus": "unemployed",
    "monthlyIncome": 0,
    "dependents": 2
    ...
  }
}

Response:
{
  "cached": true,
  "reply": "I am currently unemployed with no monthly income..."
}
```

### Error Codes

| Code | Message | Reason |
|------|---------|--------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing/invalid API key |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

##  Features Deep Dive

### 1. Multi-Step Form Wizard

**3 Steps:**
1. **Personal Information** (10 fields)
   - Name, National ID, DOB, Gender, Address, City, State, Country, Phone, Email
2. **Family & Financial** (5 fields)
   - Marital Status, Dependents, Employment, Income, Housing
3. **Situation Description** (3 fields + AI)
   - Financial situation, Employment circumstances, Reason for applying

**Features:**
- Real-time validation
- Progress indicator
- Can't skip steps
- Auto-save to localStorage

### 2. AI Text Generation

**How it works:**
1. User fills Steps 1-2
2. Reaches Step 3
3. Clicks "Help Me Write"
4. Backend calls OpenAI with context
5. AI generates personalized text
6. User reviews and edits
7. Accepts and fills field

**Security:**
- API key stored in backend only
- Never exposed to frontend
- Rate limiting on backend
- Input validation

### 3. Bilingual Support

**Languages:**
- English (LTR - Left-to-Right)
- Arabic (RTL - Right-to-Left)

**Features:**
- Instant language switching
- RTL CSS transformation
- All UI text translated
- Cairo font for Arabic

### 4. Form Validation

**Validation Rules:**
- Required fields
- Email format
- Phone format
- Text length (min/max)
- Numeric ranges
- Date constraints

**Implementation:**
- React Hook Form
- Real-time feedback
- Custom error messages
- Translated errors

---
##  Author

**Syed Husain**

- GitHub: [@SyedHusain44](https://github.com/SyedHusain44)
- LinkedIn: [Connect](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## Acknowledgments

- [React Team](https://reactjs.org/) - For the amazing framework
- [Vite Team](https://vitejs.dev/) - For blazing-fast builds
- [Material-UI](https://mui.com/) - For beautiful components
- [OpenAI](https://openai.com/) - For AI integration
- [i18next](https://www.i18next.com/) - For internationalization

---

##  Project Stats

![GitHub stars](https://img.shields.io/github/stars/SyedHusain44/social-support-monorepo)
![GitHub forks](https://img.shields.io/github/forks/SyedHusain44/social-support-monorepo)
![GitHub issues](https://img.shields.io/github/issues/SyedHusain44/social-support-monorepo)
![GitHub pull requests](https://img.shields.io/github/issues-pr/SyedHusain44/social-support-monorepo)

---

**Last Updated:** November 2025  
**Version:** 1.0.0  
**Status:**  Active Development