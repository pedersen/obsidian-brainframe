import {
	App,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	TFolder,
	request
} from 'obsidian';
import {clipboard} from 'electron';

interface BrainframeSettings {
	gitmarks: string;
	products: string;
}

const DEFAULT_SETTINGS: BrainframeSettings = {
	gitmarks: 'gitmarks.md',
	products: 'products.md'
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

	async addMarksFile(fname: string, id: string, hotkey: string, cmdname: string) {
		this.addCommand({
				id: id,
				name: cmdname,
				hotkeys: [{modifiers: ["Mod", "Shift"], key: hotkey}],
				callback: () => {
					const url = clipboard.readText();
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
								console.log(err);
							});
					} else if (folderOrFile instanceof TFolder) {
						new Notice(`Unable to add mark, ${fname} is a folder`);
						throw new Error("invalid URL");
					}
				}
			}
		);

	}

	async onload() {
		await this.loadSettings();

		await this.addMarksFile(this.settings.gitmarks, 'brainframe-add-gitmark', 'g',
			'Add Git bookmark');
		await this.addMarksFile(this.settings.products, 'brainframe-add-productmark', 'p',
			'Add Product bookmark');

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
					console.log('gitmarks note name: ' + value);
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
					console.log('products note name: ' + value);
					this.plugin.settings.products = value;
					await this.plugin.saveSettings();
				}));


	}
}
