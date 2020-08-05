import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {storageName} from '@core/utils';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return createHeader(title)
    }

    onInput(e) {
        const $target = $(e.target)
        this.$dispatch(changeTitle($target.text()))
    }

    onClick(e) {
        const action = $(e.target).dataset.action
        if (action === 'delete') {
            const decision =
                confirm('Вы действительно хотите удалить это таблицу?')
            if (decision) {
                localStorage.removeItem(storageName(ActiveRoute.param))
                ActiveRoute.navigate('dashboard')
            }
        } else if (action === 'exit') {
            ActiveRoute.navigate('dashboard')
        }
    }
}
