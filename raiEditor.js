const template = document.createElement('template');
template.innerHTML = `
    <link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
		crossorigin="anonymous"
	/>

	<div class="form-floating rai-editor m-4">
		<textarea style="height: 10rem" id='editor-info' class="form-control"></textarea>
		<label id='count-info' for="editor-info"></label>
	</div>
`;

class RaiEditor extends HTMLElement {
	static get isVoid() {
		return true;
	}

	constructor() {
		super();

		this.enteredText = 0;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.shadowRoot.querySelector('label').innerText = `${
			this.enteredText
		} word${this.enteredText > 1 ? 's' : ''}`;
	}

	countWords() {
		let wordCount = this.shadowRoot
			.querySelector('#editor-info')
			.value.replace("'", ' ')
			.match(/\S+/g);
		this.enteredText = wordCount ? wordCount.length : 0;
		this.shadowRoot.querySelector('label').innerText = `${
			this.enteredText
		} word${this.enteredText > 1 ? 's' : ''}`;
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector('#editor-info')
			.addEventListener('keyup', () => this.countWords());
	}

	disconnectedCallback() {
		this.shadowRoot.querySelector('#editor-info').removeEventListener();
	}
}

window.customElements.define('rai-editor', RaiEditor);
