/** @type {import('next').NextConfig} */
export default {
  // Static export: the whole site becomes plain HTML/CSS/JS in ./out.
  output: "export",
  trailingSlash: true,
  // Required for `output: export`. Photos are already sized at source.
  images: { unoptimized: true },
  poweredByHeader: false,
  // Pin the workspace root. Without this Next infers it from the nearest
  // lockfile, which can be a parent folder when the project is unzipped
  // alongside others.
  outputFileTracingRoot: import.meta.dirname,
};
