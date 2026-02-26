import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "build (no-server)");
const sourceIndex = path.join(root, "index.html");
const sourceAssets = path.join(root, "assets");
const dataDir = path.join(root, "assets", "data");

const dataFiles = [
  "slides.html",
  "preview-1.html",
  "preview-2.html",
  "preview-3.html",
  "preview-4.html",
  "slide-1.html",
  "slide-2.html",
  "slide-3.html",
  "slide-4.html",
];

function copyDirectoryRecursive(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursive(sourcePath, targetPath);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

const htmlMap = {};
for (const fileName of dataFiles) {
  const key = `assets/data/${fileName}`;
  const filePath = path.join(dataDir, fileName);
  htmlMap[key] = fs.readFileSync(filePath, "utf8");
}

const fetchPatchScript = `<script>
(function () {
  var localData = ${JSON.stringify(htmlMap)};
  var originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;

  function normalizeToDataPath(rawUrl) {
    var text = String(rawUrl || "");
    try {
      text = decodeURIComponent(text);
    } catch (error) {
      // ignore decode failures and keep raw URL
    }

    var marker = "assets/data/";
    var lower = text.toLowerCase();
    var index = lower.lastIndexOf(marker);
    if (index >= 0) {
      return text.slice(index).split("\\\\").join("/");
    }

    if (text.slice(0, 2) === "./") {
      text = text.slice(2);
    }

    return text.split("\\\\").join("/");
  }

  window.fetch = function (input, init) {
    var rawUrl = typeof input === "string" ? input : (input && input.url) || "";
    var key = normalizeToDataPath(rawUrl);

    if (Object.prototype.hasOwnProperty.call(localData, key)) {
      return Promise.resolve(
        new Response(localData[key], {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        })
      );
    }

    if (!originalFetch) {
      return Promise.reject(new Error("Fetch is not available in this environment."));
    }

    return originalFetch(input, init);
  };
})();
</script>`;

const indexHtml = fs.readFileSync(sourceIndex, "utf8");
const patchedIndexHtml = indexHtml.replace(
  /<script src="assets\/vendor\/swiper\/swiper-bundle\.min\.js"><\/script>\s*<script src="assets\/js\/main\.js"><\/script>/,
  `<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>\n    ${fetchPatchScript}\n    <script src="assets/js/main.js"></script>`,
);

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "index.html"), patchedIndexHtml, "utf8");
copyDirectoryRecursive(sourceAssets, path.join(outputDir, "assets"));

console.log(`Created no-server build at: ${outputDir}`);
