import joi from 'joi';

export const ReadTranslationsValidation = joi.object({
    projectId: joi.string().required(),
    projectName: joi.string().allow(''),
    key: joi.string().allow(''),
    value: joi.string().allow(''),
    country: joi.string().allow(''),
    language: joi.string().allow(''),
    pageIndex: joi.number(),
    pageSize: joi.number()
});