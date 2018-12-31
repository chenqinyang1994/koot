/* global
    __KOOT_STORE__:false,
    __KOOT_HISTORY__:false,
    __KOOT_LOCALEID__:false,
*/

/**
 * 手动创建 Redux Store 时需要的相关对象
 * @type {Object}
 */
import * as reduxForCreateStore from './React/redux'
export { reduxForCreateStore }

/**
 * 通用的高阶组件/方法的装饰器
 * @type {Function}
 */
export { default as extend } from "__KOOT_HOC_EXTEND__"

// 其他全局变量
export const getLocaleId = () => {
    if (__CLIENT__)
        return window.__KOOT_LOCALEID__ || ''
    if (__SERVER__) {
        if (__DEV__)
            return global.__KOOT_LOCALEID__
        if (typeof __KOOT_LOCALEID__ === 'undefined')
            return ''
        return __KOOT_LOCALEID__ || ''
    }
}
export const localeId = (() => getLocaleId())()

export const getStore = () => {
    if (__CLIENT__)
        return window.__KOOT_STORE__
    if (__SERVER__) {
        if (__DEV__)
            return global.__KOOT_STORE__
        if (typeof __KOOT_STORE__ === 'undefined')
            return ''
        return __KOOT_STORE__
    }
}
export const store = (() => getStore())()

export const getHistory = () => {
    if (__CLIENT__)
        return window.__KOOT_HISTORY__
    if (__SERVER__) {
        if (__DEV__)
            return global.__KOOT_HISTORY__
        if (typeof __KOOT_HISTORY__ === 'undefined')
            return ''
        return __KOOT_HISTORY__
    }
}
export const history = (() => getHistory())()
