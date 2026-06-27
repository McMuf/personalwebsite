# Daniel Lei — Personal Website

Dark-themed portfolio built with React + TypeScript + Vite + anime.js.

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
src/
  pages/
    Home.tsx          Landing page (particle canvas, animated name)
    About.tsx         About me + skills
    Resume.tsx        Embedded PDF viewer
    Projects.tsx      Gallery carousel (4 cards)
    Experience.tsx    LinkedIn-style work history
    Contact.tsx       Email form via EmailJS
  components/
    Navbar.tsx        Fixed top nav with page transitions
    LoadingScreen.tsx 2-second spinner between pages
  index.css           Global styles + animations
  App.tsx             Router + loading screen logic

public/
  resume.pdf          Your resume (swap file to update)
  images/
    projects/         Project screenshots go here
```

---

## How to Update Common Things

### Update your resume
1. Replace `public/resume.pdf` with your new file (keep the same filename).
2. Push / redeploy — done. No code changes needed.

### Add your profile photo
1. Drop your photo into `public/images/profile.jpg`.
2. Open `src/pages/About.tsx`, find the comment `INSERT YOUR PHOTO HERE` and follow the 3-step instructions there.

### Add a project
Open `src/pages/Projects.tsx` and add an object to the `PROJECTS` array at the top:

```ts
{
  title: 'My New Project',
  description: 'What it does in one sentence.',
  tags: ['React', 'Python'],
  image: '/images/projects/new-project.png', // add file to public/images/projects/
  link: 'https://github.com/McMuf/...',
  linkLabel: 'View on GitHub',
}
```

### Add a work experience (e.g. a co-op)
Open `src/pages/Experience.tsx` — there's a full comment at the top explaining the data shape. Add a new object to the `EXPERIENCES` array (newest first).

---

## Set Up the Contact Form

The contact form uses [EmailJS](https://www.emailjs.com/) — free, no backend needed.

1. Create a free account at emailjs.com.
2. **Add an Email Service** (connect Gmail) — copy the **Service ID**.
3. **Create a Template** with these variables:
   - `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_name}}`
   - Set the *To Email* to `danielmdlei@gmail.com`
   - Copy the **Template ID**.
4. Go to **Account → API Keys** — copy your **Public Key**.
5. Open `src/pages/Contact.tsx` and replace the three constants at the top:

```ts
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
```

---

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo.
3. Vercel auto-detects Vite. Click **Deploy**.

Every future `git push` to `main` triggers an automatic redeploy (~30 seconds).

To publish a content update (new project, experience, resume swap):

```bash
git add .
git commit -m "update content"
git push
```

---

## Future Ideas

| Feature | Where to add |
|---|---|
| Real project screenshots | Drop PNGs into `public/images/projects/` and update `Projects.tsx` |
| Profile photo | `public/images/profile.jpg` + 3-line change in `About.tsx` |
| Blog / writing | New `src/pages/Blog.tsx` + route in `App.tsx` + nav item in `Navbar.tsx` |
| Dark/light toggle | CSS variables in `index.css` + toggle in `Navbar.tsx` |
| Analytics | Add Vercel Analytics in `main.tsx` (one `npm install` + one import) |
| Custom domain | Set in Vercel project dashboard → Domains |
