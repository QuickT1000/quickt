import joi from 'joi';

export const DeleteTranslationsValidation = joi.object({
    projectName: joi.string().required(),
    entries: joi.array().items({
        id: joi.number().required(),
        key: joi.string().required(),
        value: joi.string().required().allow(''),
        country: joi.string().required(),
        language: joi.string().required()
    })
});