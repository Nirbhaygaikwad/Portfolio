# Nirbhay Gaikwad — Portfolio

A personal portfolio site for a full-stack developer moving into AI/ML and data science.
Dark-first "Terminal Aurora" design, motion throughout, fully responsive.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion (`motion` v12)

---

## Run it locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

---

## Editing your content

**Everything lives in one file: [`lib/site.ts`](lib/site.ts).** Name, bio, skills, jobs,
projects, education, links — change it there and the whole site updates. You should not
need to touch a component to keep the site current.

Things worth updating first, all marked with `TODO(Nirbhay)` in that file:

| What | Where in `lib/site.ts` |
| --- | --- |
| Project repo + live demo URLs | `projects[].repo` / `projects[].live` |
| What you actually do at IIT Bombay | `experience[0].points` |
| What you're currently studying | `learning.items` |
| Live site URL (for SEO + social cards) | `site.url` |

Dropping a `live` or `repo` key hides that button on the card automatically.

### Replacing the résumé

Overwrite `public/Nirbhay_Gaikwad_Resume.pdf`. The download button picks it up with no
code change.

### Changing the colours

All design tokens are CSS variables at the top of [`app/globals.css`](app/globals.css) —
`:root` for light mode, `.dark` for dark. Change `--lime` and `--cyan` and the whole site
re-themes: buttons, glows, gradients, progress bars, the lot.

---

## Contact form setup

The form posts to [Web3Forms](https://web3forms.com) — free, no account, no backend.

1. Go to <https://web3forms.com>, enter `nirbhay2004g@gmail.com`, and they email you an
   access key.
2. Create `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
   ```

3. Add the same variable in **Vercel → Project → Settings → Environment Variables**, then
   redeploy.

Until the key is set the form still works — it falls back to opening the visitor's email
client with the message pre-filled. Nothing breaks either way.

---

## Deploying

### 1. Push to GitHub

```bash
git add -A
git commit -m "Build portfolio site"

# create an empty repo named "portfolio" at https://github.com/new (no README),
# then point this repo at it:
git remote add origin https://github.com/Nirbhaygaikwad/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Sign in at <https://vercel.com> **with your GitHub account**.
2. **Add New → Project → Import** `Nirbhaygaikwad/portfolio`.
3. Leave every build setting on default — Vercel detects Next.js automatically.
4. Add the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable.
5. **Deploy.**

You get a permanent public link (something like `portfolio-nirbhay.vercel.app`) that
anyone can visit. Every `git push` to `main` redeploys it automatically.

After the first deploy, set `site.url` in `lib/site.ts` to your real URL so link previews
on LinkedIn and WhatsApp render correctly.

---

## What's in here

```
app/
  layout.tsx        fonts, SEO metadata, JSON-LD, no-flash theme script
  globals.css       design tokens (both themes), utilities, keyframes
  page.tsx          section composition
components/
  nav.tsx           sticky nav, scroll-spy, mobile sheet
  hero.tsx          parallax hero, typewriter, animated counters
  about.tsx         bio + monogram card + hobbies
  skills.tsx        skill groups, learning progress, infinite marquee
  experience.tsx    timeline with a scroll-drawn spine
  projects.tsx      project cards with cursor spotlight
  education.tsx     education grid
  contact.tsx       validated contact form
  footer.tsx
  motion-primitives.tsx   Reveal / Stagger / Magnetic / Tilt / Counter / TypeCycle
  site-chrome.tsx   scroll progress, cursor glow, aurora backdrop
  theme-toggle.tsx  dark/light switch (no hydration flash)
  brand-icons.tsx   GitHub + LinkedIn marks
lib/
  site.ts           ← all content
  use-media-query.ts
```

## Accessibility notes

- Every colour pair meets WCAG AA in both themes (body text ≥ 5.1:1).
- All animation is disabled under `prefers-reduced-motion`.
- Full keyboard navigation with visible focus rings.
- Semantic landmarks, labelled form fields, `aria-live` on the typewriter and form status.
