import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';
import turndownPluginGfm from '@joplin/turndown-plugin-gfm';

const OUTPUT_DIR_NAME = 'docs';
const INPUT_DIRECTORY = './func_godot_docs';
const IMAGES_DIRECTORY = path.join(INPUT_DIRECTORY, 'FuncGodot Manual', 'images');

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.log(`Creating output directory: ${dirPath}`);
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function preprocessLinks(htmlContent) {
    const linkRegex = /href="([^"]+\.html)"/gi;
    let processedHtml = htmlContent.replace(linkRegex, (match, fullPath) => {
        const parts = fullPath.split('/');
        const filenameWithHtml = parts[parts.length - 1]; // e.g., 'xyz.html'
        const newPath = filenameWithHtml.replace(/\.html$/i, '.md'); // e.g., 'xyz.md'
        return `href="${newPath}"`;
    });

    const svgImageRemovalRegex = /<img[^>]*?src="[^"]+\.svg"[^>]*?>/gi;
    processedHtml = processedHtml.replace(svgImageRemovalRegex, '');

    const imageRegex = /src="([^"]+\.(?:png|jpe?g|gif|webp|svg|bmp))"/gi;
    processedHtml = processedHtml.replace(imageRegex, (match, fullPath) => {
        const parts = fullPath.split('/');
        const filename = parts[parts.length - 1];
        const newPath = `./images/${filename}`;
        return `src="${newPath}"`;
    });

    return processedHtml;
}

function convertHtmlToMarkdown(htmlContent) {
    htmlContent = htmlContent.replace(/<title>.*?<\/title>/gi, "");

    const preprocessedHtml = preprocessLinks(htmlContent);
    const turndownService = new TurndownService({
        headingStyle: 'atx', // Use # for headings
        codeBlockStyle: 'fenced' // Use ``` for code blocks
    });

    turndownService.use(turndownPluginGfm.gfm);
    return turndownService.turndown(preprocessedHtml);
}

function runConverter() {
    if (!INPUT_DIRECTORY) {
        console.error("Error: Please provide the path to the directory containing HTML files.");
        console.log("Usage: node html-to-markdown-converter.js <input_directory_path>");
        process.exit(1);
    }

    const absoluteINPUT_DIRECTORY = path.resolve(INPUT_DIRECTORY);
    const absoluteOutputDir = path.join(path.dirname(absoluteINPUT_DIRECTORY), OUTPUT_DIR_NAME);
    const absoluteImagesTargetDir = path.join(absoluteOutputDir, 'images');

    console.log(`\nStarting HTML to Markdown Conversion...`);
    console.log(`Input Directory: ${absoluteINPUT_DIRECTORY}`);
    console.log(`Output Directory: ${absoluteOutputDir}\n`);

    try {
        const htmlFiles = glob.sync(path.join(INPUT_DIRECTORY, '/**/*.html'));
        if (htmlFiles.length === 0) {
            console.log(`No .html files found in directory: ${INPUT_DIRECTORY}`);
        } else {
            let convertedCount = 0;

            ensureDirectoryExists(absoluteOutputDir);

            for (const filename of htmlFiles) {
                const htmlContent = fs.readFileSync(filename, 'utf8');
                const markdownContent = convertHtmlToMarkdown(htmlContent);
                const splitPaths = filename.split(path.sep);
                const fileNameWithExtension = splitPaths[splitPaths.length - 1];
                let outputFileName = fileNameWithExtension.replace(/\.html$/i, '.md');
                if (outputFileName.includes('start')) {
                   outputFileName = outputFileName.replace('start', 'index') 
                }

                if (outputFileName.includes('header')) {
                    continue;
                }

                if (outputFileName.includes('sidenav')) {
                    continue
                }

                if (outputFileName.includes('FuncGodot Manual')) {
                    continue;
                }

                const outputFullPath = path.join(absoluteOutputDir, outputFileName);
                fs.writeFileSync(outputFullPath, markdownContent, 'utf8');

                console.log(`   -> Converted: ${filename} -> ${outputFileName}`);
                convertedCount++;
            }

            console.log(`\n✅ HTML Conversion complete! ${convertedCount} HTML file(s) converted.`);
        }

        console.log(`\nStarting image file move...`);
        ensureDirectoryExists(absoluteImagesTargetDir);

        const imageFiles = glob.sync(path.join(IMAGES_DIRECTORY, '*'));
        if (imageFiles.length === 0) {
            console.log(`No files found in source image directory: ${IMAGES_DIRECTORY}. Skipping move.`);
        } else {
            let movedCount = 0;
            for (const sourcePath of imageFiles) {
                const filename = path.basename(sourcePath);
                const destinationPath = path.join(absoluteImagesTargetDir, filename);

                try {
                    // Move the file (fs.renameSync acts as a move operation)
                    fs.copyFileSync(sourcePath, destinationPath);
                    movedCount++;
                    console.log(`   -> Moved: ${filename}`);
                } catch (moveError) {
                    console.error(`   -> Failed to move ${filename}: ${moveError.message}`);
                }
            }
            console.log(`\n✅ Image move complete! ${movedCount} file(s) moved to: ${absoluteImagesTargetDir}`);
        }

        console.log(`The resulting output is located in: ${absoluteOutputDir}`);

    } catch (error) {
        console.log(error);
        console.error(`\n❌ An error occurred during the conversion process:`);
        if (error.code === 'ENOENT') {
            // Check if the error is due to the input directory or image directory not existing
            const missingDir = error.path.includes(INPUT_DIRECTORY) ? INPUT_DIRECTORY : IMAGES_DIRECTORY;
            console.error(`Directory not found: The path '${missingDir}' is invalid or does not exist.`);
        } else {
            console.error(error.message);
        }
        process.exit(1)
    }
}

runConverter();