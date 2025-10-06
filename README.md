# IEEE Ruhuna Main Website

This repository contains the source code for the **IEEE Student Branch of University of Ruhuna** website. It is built with **Next.js**, **React**, and **TailwindCSS**, and integrates modern animations, UI components, and Google APIs.

## 🚀 Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
* **UI & Animations:**

  * [Framer Motion](https://www.framer.com/motion/)
  * [GSAP](https://greensock.com/gsap/)
  * [Headless UI](https://headlessui.com/)
  * [Lucide Icons](https://lucide.dev/)
* **Utilities:**

  * [clsx](https://github.com/lukeed/clsx) – conditional classnames
  * [react-icons](https://react-icons.github.io/react-icons/)
  * [react-google-recaptcha](https://www.npmjs.com/package/react-google-recaptcha)
* **Monitoring:** [Vercel Speed Insights](https://vercel.com/docs/analytics/speed-insights)
* **Linting:** ESLint + Next.js config

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/<your-org>/ieee-main.git
cd ieee-main
```

Install dependencies:

```bash
npm install
```

---

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Lint the code:

```bash
npm run lint
```

---

## 🌐 Deployment

The project is optimized for **Vercel deployment**.

* The **`main`** branch is deployed at the primary domain (e.g., `https://ieee.uor.lk`).
* Each subchapter has its own branch, and Vercel automatically deploys them with preview URLs.
* With a custom domain, you can configure **rewrites** so that each branch is accessible under a specific path.

### 🔗 Example Mapping

| Branch   | URL Path  | Example (with domain `ieee.uor.lk`)                      |
| -------- | --------- | -------------------------------------------------------- |
| `main`   | `/`       | [https://ieee.uor.lk/](https://ieee.uor.lk/)             |
| `ras`    | `/ras`    | [https://ieee.uor.lk/ras](https://ieee.uor.lk/ras)       |
| `pes`    | `/pes`    | [https://ieee.uor.lk/pes](https://ieee.uor.lk/pes)       |
| `cs`     | `/cs`     | [https://ieee.uor.lk/cs](https://ieee.uor.lk/cs)         |
| `comsoc` | `/comsoc` | [https://ieee.uor.lk/comsoc](https://ieee.uor.lk/comsoc) |
| `wie`    | `/wie`    | [https://ieee.uor.lk/wie](https://ieee.uor.lk/wie)       |
| `ias`    | `/ias`    | [https://ieee.uor.lk/ias](https://ieee.uor.lk/ias)       |

⚡ This ensures all chapters are hosted under **one unified domain** while being developed and maintained on separate branches.

---

## 📁 Project Structure

```
ieee-main/
├── app/               # Next.js App Router pages
├── components/        # Reusable UI components
├── contexts/          # React contexts (e.g., LoadingContext)
├── public/            # Static assets (images, icons, etc.)
├── styles/            # Global styles (Tailwind setup)
├── next.config.ts     # Next.js configuration (with rewrites & headers)
├── package.json       # Dependencies & scripts
└── README.md          # Documentation
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and configure the following (if required):

```env
GOOGLE_API_KEY=your-api-key
```

---

## ✨ Features

* Responsive design with TailwindCSS
* Animated landing and loader pages
* Floating carousel & interactive circuit animations
* Dynamic content from APIs
* Multi-chapter support (RAS, PES, CS, ComSoc, WIE, IAS)
* Contact form with Google reCAPTCHA

---

## 📜 License

This project is maintained by the **IEEE Student Branch, University of Ruhuna**.
For inquiries, please contact the webmaster or branch executive committee.

---
Created by Manujaya Perera (Webmaster for term 2025/26) - https://github.com/CharithManaujayaMUTEC
