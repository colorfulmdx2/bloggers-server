import {body, check} from "express-validator";

export const isString = (field: string) => {
    return body(field).isString().trim().notEmpty()
}

export const isNumberBody = (field: string) => {
    return body(field).toInt().isNumeric()
}

export const isUrl = () => {
    return body('youtubeUrl')
        .isString()
        .trim()
        .notEmpty()
        .matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
}

export const isNumber = (field: string) => {
    return check(field).toInt().isNumeric()
}