const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const chokidar = require('chokidar'); // 可选：用于监听文件变化

class IndexGenerator {
    constructor(options = {}) {
        this.rootDir = options.rootDir || process.cwd();
        this.directories = options.directories || [];
        this.template = options.template || this.defaultTemplate;
    }

    defaultTemplate(title, entries) {
        return `---
title: ${title}
---

# ${title}

${entries.length === 0 ? '暂无内容' : ''}

${entries
    .map(
        entry =>
            `- [${entry.title}](${entry.link})${
                entry.description ? ` - ${entry.description}` : ''
            }`
    )
    .join('\n')}
`;
    }

    extractInfo(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const { data, excerpt } = matter(content, {
                excerpt: true,
                excerpt_separator: '<!-- more -->',
            });

            return {
                title:
                    data.title ||
                    this.getTitleFromContent(content) ||
                    path.basename(filePath, '.md'),
                description: data.description || excerpt || '',
            };
        } catch (err) {
            return {
                title: path.basename(filePath, '.md'),
                description: '',
            };
        }
    }

    getTitleFromContent(content) {
        const lines = content.split('\n');
        for (const line of lines) {
            const match = line.match(/^#\s+(.+)$/);
            if (match) return match[1].trim();
        }
        return null;
    }

    async generateForDirectory(dirPath) {
        const indexPath = path.join(dirPath, 'index.md');
        const dirName = path.basename(dirPath);

        // 读取目录内容
        let items;
        try {
            items = await fs.readdir(dirPath);
        } catch (err) {
            console.error(`无法读取目录: ${dirPath}`, err);
            return;
        }

        const entries = [];

        for (const item of items) {
            if (item === 'index.md') continue;

            const itemPath = path.join(dirPath, item);
            const stat = await fs.stat(itemPath);
            const nameWithoutExt = path.basename(item, '.md');

            if (stat.isDirectory()) {
                const subIndexPath = path.join(itemPath, 'index.md');
                if (await fs.pathExists(subIndexPath)) {
                    const info = this.extractInfo(subIndexPath);
                    entries.push({
                        ...info,
                        link: `./${item}/`,
                        type: 'directory',
                    });
                } else {
                    // 如果没有 index.md，使用文件夹名
                    entries.push({
                        title: item,
                        description: '',
                        link: `./${item}/`,
                        type: 'directory',
                    });
                }
            } else if (item.endsWith('.md') && nameWithoutExt !== 'index') {
                const info = this.extractInfo(itemPath);
                entries.push({
                    ...info,
                    link: `./${nameWithoutExt}`,
                    type: 'file',
                });
            }
        }

        // 排序
        entries.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'directory' ? -1 : 1;
            }
            return a.title.localeCompare(b.title);
        });

        // 生成内容
        const content = this.template(dirName, entries);

        // 写入文件
        await fs.writeFile(indexPath, content, 'utf-8');
        console.log(`✅ 已生成: ${path.relative(this.rootDir, indexPath)}`);
    }

    async generateAll() {
        for (const dir of this.directories) {
            const dirPath = path.join(this.rootDir, dir);
            if (await fs.pathExists(dirPath)) {
                await this.generateForDirectory(dirPath);
            } else {
                console.warn(`⚠️  目录不存在: ${dirPath}`);
            }
        }
    }

    // 可选：监听文件变化
    watch() {
        const watcher = chokidar.watch(
            this.directories.map(dir =>
                path.join(this.rootDir, dir, '**/*.md')
            ),
            {
                ignored: /(^|[\/\\])\../, // 忽略隐藏文件
                persistent: true,
            }
        );

        watcher.on('change', async filePath => {
            const dir = path.dirname(filePath);
            const relativeDir = path.relative(this.rootDir, dir);

            // 如果修改的是某个目录下的文件，重新生成该目录的 index.md
            for (const targetDir of this.directories) {
                if (relativeDir.startsWith(targetDir)) {
                    await this.generateForDirectory(dir);
                    break;
                }
            }
        });

        console.log('👀 正在监听文件变化...');
    }
}

// 使用示例
const generator = new IndexGenerator({
    directories: ['powerfully'], // 可以添加多个目录，如 ['ZZ', 'YY', 'XX']
    template: (title, entries) => {
        return `# ${title}

自动生成的目录索引，按字母顺序排序。

## 目录列表

${entries.map(entry => `- [${entry.title}](${entry.link})`).join('\n')}

---
*最后更新于: ${new Date().toLocaleString()}*
`;
    },
});

// 生成所有目录
generator.generateAll();

// 如果需要监听文件变化（开发时使用）
// generator.watch();
