import joi from 'joi';

export const UpdateTranslationsValidation = joi.object({
    projectName: joi.string().required(),
    entries: joi.array().items({
        id: joi.number().required(),
        key: joi.string().required(),
        value: joi.string().required(),
        country: joi.string().required(),
        language: joi.string().required()
    })
});