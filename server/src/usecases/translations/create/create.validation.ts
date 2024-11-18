import joi from 'joi';

export const CreateTranslationsValidation = joi.object({
    projectId: joi.string().required(),
    entries: joi.array().items({
        key: joi.string().required(),
        value: joi.string().required(),
        country: joi.string().required(),
        language: joi.string().required()
    })
});
