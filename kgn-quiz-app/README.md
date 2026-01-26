# KGN Quiz App

An interactive, feature-rich quiz application built as part of the **ALX Frontend ReactJS Journey**. This app leverages the Open Trivia Database to provide users with a customizable and challenging trivia experience.

## Features

- **Customizable Quizzes:** Select categories, difficulty levels (Easy, Medium, Hard), and the number of questions.
- **Dynamic Gameplay:** Includes a 60-second countdown timer per question and tracks total time spent.
- **State-of-the-Art Tech:** Built with **React 19** and managed by **Zustand** for high-performance state handling.
- **PDF Result Reports:** Export your score and a detailed breakdown of correct/incorrect answers into a professional PDF.
- **Quiz History:** Automatically saves your past performances to local storage for progress tracking.
- **Modern UI:** A responsive, dark-mode-ready interface built with **Tailwind CSS 4**.

---

## Tech Stack

### Core

- **Framework:** React 19 (Functional Components & Hooks)
- **Build Tool:** Vite 6
- **State Management:** Zustand (Store-based architecture)
- **Routing:** React Router 7

### Dependencies & Utilities

- **Styling:** Tailwind CSS 4 & React Icons
- **Data Fetching:** Axios
- **HTML Entities:** `he` (Decodes special characters like `&quot;` from API data)
- **Export Tools:** `html2pdf.js` & `html2canvas` (For generating PDF reports)

---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/kaberege/kgn-fe-reactjs.git
cd kgn-fe-reactjs

```

2. **Navigate to the project:**

```bash
cd kgn-quiz-app

```

3. **Install dependencies:**

```bash
npm install

```

4. **Start the development server:**

```bash
npm run dev

```
