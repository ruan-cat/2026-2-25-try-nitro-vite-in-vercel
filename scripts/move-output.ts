import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { consola } from "consola";

// 获取当前脚本执行的根目录（假设你在项目根目录运行 pnpm build）
const rootDir = process.cwd();

// 定义需要移动的目录配置
// src: 源路径（相对于根目录）
// dest: 目标路径（相对于根目录）
const moves = [
  { src: "apps/.output", dest: ".output" },
  { src: "apps/.vercel", dest: ".vercel" },
];

consola.info("🚀 Starting to move build artifacts to root...");

moves.forEach(({ src, dest }) => {
  const sourcePath = path.join(rootDir, src);
  const destPath = path.join(rootDir, dest);

  // 1. 检查源文件是否存在
  if (fs.existsSync(sourcePath)) {
    // 2. 如果目标目录已存在，先清理，防止旧文件残留干扰
    if (fs.existsSync(destPath)) {
      consola.info(`🗑️  Cleaning old destination: ${dest}`);
      fs.rmSync(destPath, { recursive: true, force: true });
    }

    // 3. 执行复制 (cpSync 在 Node 16.7+ 可用，支持递归和强制覆盖)
    consola.info(`ZG  Moving: ${src} -> ${dest}`);
    try {
      fs.cpSync(sourcePath, destPath, { recursive: true, force: true });
      consola.success(`✅ Success: ${dest} is ready.`);
    } catch (error) {
      consola.error(`❌ Error moving ${src}:`, error);
      process.exit(1);
    }
  } else {
    consola.warn(`⚠️  Warning: Source directory not found: ${src} (Skipping)`);
  }
});

consola.success("🎉 Build artifacts moved successfully!");
