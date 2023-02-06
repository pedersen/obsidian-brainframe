import {
	App,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	TFolder,
	request, TAbstractFile, Editor
} from 'obsidian';

interface BrainframeSettings {
	gitmarks: string;
	products: string;
	archived: string;
}

const DEFAULT_SETTINGS: BrainframeSettings = {
	gitmarks: 'gitmarks.md',
	products: 'products.md',
	archived: '_archived'
}

function validateUrl(url: string): URL {
	const urlref = new URL(url);
	if (!urlref) {
		throw new Error(`invalid URL ${url}`);
	}
	return urlref;
}

export default class Brainframe extends Plugin {
	settings: BrainframeSettings;

	async addMarksFile(fname: string, id: string, cmdname: string) {
		this.addCommand({
				id: id,
				name: cmdname,
				callback: async () => {
					const url = await navigator.clipboard.readText();
					validateUrl(url);

					new Notice(`Attempting to load ${url}`);
					const folderOrFile = this.app.vault.getAbstractFileByPath(fname);
					if (folderOrFile instanceof TFile) {
						request(url)
							.then(body => {
								const parser = new DOMParser();
								const parsedDocument = parser.parseFromString(body, "text/html");
								const pageTitle = parsedDocument.title;
								this.app.vault.append(folderOrFile, `- [${pageTitle}](${url})\n`);
								new Notice(`Added ${pageTitle} to ${fname}`);
							})
							.catch(err => {
								new Notice(`Unable to load ${url}: ${err}`);
							});
					} else if (folderOrFile instanceof TFolder) {
						new Notice(`Unable to add mark, ${fname} is a folder`);
						throw new Error("invalid URL");
					}
				}
			}
		);
	}

	async ensureArchiveExists() {
		const archive_check = this.app.vault.getAbstractFileByPath(this.settings.archived);
		const exists = (archive_check instanceof TFile) || (archive_check instanceof TFolder);
		if ( !exists ) {
			await this.app.vault.createFolder(this.settings.archived);
		}
		const archive = this.app.vault.getAbstractFileByPath(this.settings.archived);
		if (!(archive instanceof TFolder)) {
			new Notice('An error occurred creating your archive folder.')
			throw new Error('Error during archive creation');
		}
	}

	async archiveNote(toArchive: TAbstractFile|null) {
		await this.ensureArchiveExists();
		if (toArchive instanceof TFile) {
			await this.app.vault.rename(toArchive, `${this.settings.archived}/${toArchive?.name}`)
			await this.app.fileManager.processFrontMatter(toArchive, (frontMatter) => {
				if (frontMatter.tags == null) {
					frontMatter.tags = new Array<string>;
				}
				const tag = `#${this.settings.archived}`;
				if (frontMatter.tags.indexOf(tag) == -1) {
					frontMatter.tags.push(tag);
				}
			})
			new Notice(`${toArchive.name} has been archived.`);
		}
	}

	async onload() {
		await this.loadSettings();

		await this.addMarksFile(this.settings.gitmarks, 'add-gitmark', 'Add Git bookmark');
		await this.addMarksFile(this.settings.products, 'add-productmark', 'Add Product bookmark');

		this.addCommand({
				id: 'archive-note',
				name: 'Archive Current Note',
				editorCallback: (editor: Editor) => {
					this.archiveNote(this.app.workspace.getActiveFile());
				}
			}
		)

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				menu.addItem((item) => {
					item
						.setTitle("Archive Note")
						.setIcon("document")
						.onClick(async () => {
							await this.archiveNote(file);
						});
				});
			})
		);

		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu, editor, view) => {
				menu.addItem((item) => {
					item
						.setTitle("Archive current note")
						.setIcon("document")
						.onClick(async () => {
							await this.archiveNote(view.file);
						});
				});
			})
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new BrainframeSettingTab(this.app, this));

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class BrainframeSettingTab extends PluginSettingTab {
	plugin: Brainframe;

	constructor(app: App, plugin: Brainframe) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Brainframe Settings'});

		new Setting(containerEl)
			.setName('Gitmarks file:')
			.setDesc('Note for storing repository related bookmarks.')
			.addText(text => text
				.setPlaceholder('Enter your gitmarks note name')
				.setValue(this.plugin.settings.gitmarks)
				.onChange(async (value) => {
					this.plugin.settings.gitmarks = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Products file:')
			.setDesc('Note for storing product related bookmarks.')
			.addText(text => text
				.setPlaceholder('Enter your products note name')
				.setValue(this.plugin.settings.products)
				.onChange(async (value) => {
					this.plugin.settings.products = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Archived notes folder:')
			.setDesc('Location to store archived notes.')
			.addText(text => text
				.setPlaceholder('Enter the name of the archived notes folder')
				.setValue(this.plugin.settings.archived)
				.onChange(async (value:string) => {
					this.plugin.settings.archived = value;
					await this.plugin.saveSettings();
				}))

	}
}
