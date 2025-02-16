import joi from 'joi';

export const DeleteTranslationsValidation = joi.object({
    projectId: joi.string().required(),
    entries: joi.array().items({
        id: joi.number().required(),
        key: joi.string().required(),
        value: joi.string().optional().allow(''),
        country: joi.string().required(),
        language: joi.string().required()
    })
});