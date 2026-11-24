# OTHER/FORM — Testing report

Verified on 2026-11-24.

## Release result

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript | Passed during production build |
| Next.js production build | Passed with Webpack |
| Static prerendering | Passed for `/`, icon, Open Graph image, robots, and sitemap |
| Playwright browser tests | 4 passed, 0 failed |
| Desktop runtime errors | 0 |
| Mobile runtime errors | 0 |
| HTTP 404 responses in desktop/mobile runs | 0 |
| Horizontal overflow | None at 375, 768, 1024, or 1440 px |

Environment: Windows, Node.js 24.21.0, Next.js 16.4.6, Playwright 1.65.1, Chromium with software WebGL. Tests run against the optimized production server, not the development server.

## Browser coverage

### Desktop — 1440 × 1000

- Page title, metadata description, robots, and sitemap verified.
- Hero and actual WebGL context verified.
- Desktop screenshot visually inspected.
- Project next/previous buttons and active counter verified.
- Relay Financial case study opened and dismissed with Escape.
- All primary navigation anchors clicked and verified by URL hash.
- Capability accordion expanded and content checked.
- Energy and density sliders operated by keyboard.
- Particle field paused and resumed with `aria-pressed` checked.
- Contact fields completed, selects changed, and brief generated.
- Generated `mailto:` URL and success feedback checked.
- Clipboard success message verified.
- Console errors and 404 responses checked.

### Mobile — 375 × 812

- Hero and full-page layout visually inspected.
- Mobile menu opened and Work destination selected.
- Case-study dialog opened, visually inspected, and closed using its close button.
- Contact section and form controls inspected.
- Full-page horizontal overflow checked before and after interaction.
- Console errors and 404 responses checked.

### Reduced motion

- Loader removed without delaying content.
- Main heading remains visible.
- Static particle mode message verified.
- Ambient pause control is disabled as designed.
- Reduced-motion playground screenshot visually inspected.

### Tablet and small desktop — 768 × 1024 and 1024 × 768

- Playground and controls inspected at both breakpoints.
- Horizontal overflow checks passed.

## Measured loading and animation data

Latest desktop production run:

- Resource requests: **16**
- Transfer size reported by the Resource Timing API: **637,258 bytes** (about **622 KiB**)
- Headless software-WebGL animation rate: **9.52 fps**

The frame-rate number is a Playwright SwiftShader CPU-rendering measurement, not a claim about real GPU performance. It is recorded honestly rather than presented as a hardware benchmark. The scene is lazy-loaded, pixel ratio is capped, geometry and particle counts are bounded, and no remote visual assets are required.

## Defects found and fixed during verification

1. **Windows Turbopack worker failure:** switched development and production builds to Next.js's supported Webpack path with Tailwind PostCSS. Production compilation then passed repeatedly.
2. **Premature WebGL assertion:** changed the test to wait for asynchronous renderer initialization instead of checking the canvas too early.
3. **Clipboard permission failure:** added a local `execCommand` fallback and explicit failure feedback; enabled clipboard permissions in the test browser.
4. **Mobile dialog offset:** removed duplicate centering transforms from the dialog keyframes. The close control now remains inside the viewport and works.
5. **Mobile hero contrast:** reduced and repositioned the compact 3D sculpture and added a directional copy shade.
6. **Lint scope:** excluded generated Playwright reports from source linting.

## Static integrity checks

- No placeholder `href="#"` links found.
- No disabled viewport zoom directives found.
- No unscoped fixed mobile widths above 375 px found in source checks.
- All navigation hashes target existing section IDs.
- Every visible button has a real action, submit behavior, disabled state, or accessible Radix behavior.

## Deployment note

`npx vercel whoami` reported a logged-out CLI. An anonymous temporary deployment was attempted and failed inside the Vercel builder because Windows denied symlink creation (`EPERM`). This is not being represented as a live deployment. The application production build is successful, and authenticated Vercel/GitHub deployment instructions are in `README.md`.

## Research-tool note

The live reference was inspected directly for structure, typography, and computed styling. Context7 was attempted but returned a monthly-quota error; current official Next.js, Lenis, and Motion documentation was used instead. No Figma assets or reference-site assets were copied.
