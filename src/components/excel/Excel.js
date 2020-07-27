import {$} from '@core/dom';

export class Excel {
    constructor(selector, options) {
        this.components = options.components || []
        this.$el = document.querySelector(selector)
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        this.components.forEach(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            $el.innerHTML = component.toHTML()
            $root.append($el)
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}