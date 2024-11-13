let setToast;

export const initToastHelper = (set) => {
    setToast = set;
}

export const success = (message = '', title= '') => {
    setToast({title, message, isHidden: false, background: 'success'})
}

export const info = (message = '', title= '') => {
    setToast({title, message, isHidden: false, background: 'info'})
}

export const danger = (message = '', title= '') => {
    setToast({title, message, isHidden: false, background: 'danger'})
}

export const warning = (message = '', title= '') => {
    setToast({title, message, isHidden: false, background: 'warning'})
}