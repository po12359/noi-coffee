import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

// 대상 이미지 디렉토리
const IMAGE_DIR = './public/assets/images';

// WebP 변환 품질 (85 = 화질 손실 거의 없음, 파일 크기 대폭 감소)
const QUALITY = 85;

async function optimizeImages() {
    const files = await readdir(IMAGE_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    console.log(`\n🔍 최적화 대상 이미지: ${imageFiles.length}개\n`);

    let totalBefore = 0;
    let totalAfter = 0;

    for (const file of imageFiles) {
        const inputPath = join(IMAGE_DIR, file);
        const ext = extname(file);
        const name = basename(file, ext);
        const outputPath = join(IMAGE_DIR, `${name}.webp`);

        const beforeStat = await stat(inputPath);
        const beforeKB = Math.round(beforeStat.size / 1024);

        await sharp(inputPath)
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const afterStat = await stat(outputPath);
        const afterKB = Math.round(afterStat.size / 1024);
        const savedPct = Math.round((1 - afterStat.size / beforeStat.size) * 100);

        totalBefore += beforeStat.size;
        totalAfter += afterStat.size;

        console.log(`✅ ${file}`);
        console.log(`   ${beforeKB}KB → ${afterKB}KB  (${savedPct}% 감소)\n`);
    }

    const totalSavedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
    const totalPct = Math.round((1 - totalAfter / totalBefore) * 100);
    console.log(`\n🎉 완료! 총 ${totalSavedMB}MB 절약 (${totalPct}% 감소)`);
    console.log(`   원본: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → 최적화: ${(totalAfter / 1024 / 1024).toFixed(1)}MB\n`);
}

optimizeImages().catch(console.error);
