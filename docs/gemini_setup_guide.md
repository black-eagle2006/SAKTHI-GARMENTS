# SAKTHI GARMENTS — Google Gemini AI Integration Guide

## 1. Overview of AI Capabilities

SAKTHI GARMENTS integrates Google's **Gemini 1.5 Flash** model to provide real-time creative and technical assistance directly inside the 3D Customizer Studio:

1. **Typographic Slogan Generator**: Synthesizes high-impact garment slogans tailored to fashion themes (Streetwear, Minimalist, Luxury Heritage, Cyberpunk, Tamil Cultural Typography).
2. **Generative Print Artwork Synthesis**: Transforms natural language prompts into vector-grade graphics with recommended canvas placement coordinates.
3. **Automated Design & Printability Critique**: Computes luminance contrast between selected fabric hex values and artwork colors, predicting fabric ink bleed and recommending printing methods (DTG vs. Screen Printing).

---

## 2. Obtaining a Google Gemini API Key

1. Visit the **Google AI Studio** console at [https://aistudio.google.com/](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** in the left navigation sidebar.
4. Click **"Create API key in new project"** (or select an existing Google Cloud project).
5. Copy the generated API key (format: `AIzaSy...`).

> **Note**: Google AI Studio provides a free tier for Gemini 1.5 Flash with generous RPM (Requests Per Minute) limits, ideal for local development and demonstration.

---

## 3. Configuration

### Option A: Local Development (`.env` or Environment Variable)

In `d:\SG MASTER\backend\.env` (or via terminal environment):

```powershell
# Windows PowerShell
$env:GEMINI_API_KEY="AIzaSyYourActualKeyHere"

# Linux / macOS Bash
export GEMINI_API_KEY="AIzaSyYourActualKeyHere"
```

### Option B: Docker Compose

In `d:\SG MASTER\.env`:

```ini
GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

Docker Compose automatically injects this variable into the `sakthi_backend` container.

---

## 4. Architectural Resilience & Built-In Fallback Engine

SAKTHI GARMENTS is designed with an **unbreakable fallback guarantee**. Even if:
- No `GEMINI_API_KEY` is provided,
- The network connection is offline,
- Google's API returns HTTP 429 (Rate Limit Exceeded), or
- The request exceeds the 10-second timeout threshold,

The backend **never crashes** and **never returns HTTP 500 errors**.

### Fallback Implementation Details in `GeminiAiService.java`:
- **Slogans**: The engine falls back to an internal dictionary of curated high-converting apparel slogans tailored by style category.
- **Artwork**: The engine generates a clean, scalable SVG vector motif with gradient accents that is immediately injected onto the 3D t-shirt canvas.
- **Design Critique**: The engine executes an internal WCAG-standard relative luminance contrast calculation algorithm:

$$L = 0.2126 \times R_{\text{srgb}} + 0.7152 \times G_{\text{srgb}} + 0.0722 \times B_{\text{srgb}}$$

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

If the ratio falls below 3.0:1 on dark fabrics, it warns the user of low legibility and suggests applying an underbase stroke.

---

## 5. Prompt Engineering Reference

### Slogan Generation System Instruction
```
You are an elite apparel creative director for SAKTHI GARMENTS, a premium textile brand based in Tiruppur, India.
Generate exactly 5 distinct, punchy, modern t-shirt slogans for the following theme: {theme}.
Vibe: {vibe}. Target Audience: {targetAudience}.
Return ONLY a JSON array of strings without markdown formatting.
```

### Design Critique System Instruction
```
You are an expert master screen printer and DTG production supervisor at a Tiruppur textile mill.
Analyze a design with garment color {garmentColor} and artwork color {artworkColor} on {fabricGsm} GSM cotton.
Evaluate visual contrast, ink absorption risk, and print technique recommendations.
Return a structured JSON with printabilityScore (0-100), contrastRating, recommendations list, and suggestedPrintingMethod.
```
