import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div 
                class="input" 
                contenteditable 
                spellcheck="false"
                data-type="formula"
            ></div>
        `
    }

    init() {
        super.init()

        this.$formula = this.$root.find('[data-type="formula"]')

        this
            .$on('table:select', $cell => {
                this.$formula.text($cell.dataset.value)
            })
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(e) {
        this.$emit('formula:input', $(e.target).text())
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(e.key)) {
            e.preventDefault()
            this.$emit('formula:done')
        }
    }
}
