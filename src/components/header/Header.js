import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return createHeader(title)
    }

    onInput(e) {
        const $target = $(e.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }
}
