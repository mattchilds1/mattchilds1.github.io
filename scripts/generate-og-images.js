import satori from "satori";
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const OUT_DIR = join(__dirname, "..", "og-images");

const FONT_PATH = join(
  dirname(require.resolve("@fontsource/eb-garamond/package.json")),
  "files",
  "eb-garamond-latin-400-normal.woff"
);

const PAGES = [
  {
    file: "index.png",
    title: "Matt Childs",
    description: "Product minded software engineering leader",
  },
  {
    file: "about.png",
    title: "About — Matt Childs",
    description: "About Matt Childs",
  },
  {
    file: "writing.png",
    title: "Writing — Matt Childs",
    description: "Writing by Matt Childs",
  },
  {
    file: "lists.png",
    title: "Lists — Matt Childs",
    description: "Things Matt Childs recommends",
  },
  {
    file: "estimation.png",
    title: "My Thoughts on Estimation and Hitting Delivery Dates in Software",
    description:
      "Why software estimation is harder than construction, and when trust grows in its place.",
  },
  {
    file: "enriching-career.png",
    title: "Enriching Your Career Through Your Personal Interests",
    description:
      "What reading about urban planning taught me about working in technology.",
  },
];

function Card({ title, description }) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "#fafaf8",
        padding: 80,
        fontFamily: "EB Garamond, Georgia, serif",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 48,
                    fontWeight: 400,
                    color: "#111111",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: 24,
                    maxWidth: 900,
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 24,
                    color: "#636059",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    maxWidth: 800,
                  },
                  children: description,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: 14,
              color: "#9e9890",
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            },
            children: "mattchilds.xyz",
          },
        },
      ],
    },
  };
}

async function main() {
  const fontData = readFileSync(FONT_PATH).buffer;

  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  for (const page of PAGES) {
    const svg = await satori(Card(page), {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "EB Garamond",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    });

    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    const outPath = join(OUT_DIR, page.file);
    writeFileSync(outPath, png);
    console.log(`Wrote ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
