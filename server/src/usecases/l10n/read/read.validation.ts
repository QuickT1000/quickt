import joi from 'joi';

export const ReadL10nValidation = joi.object({
    projectId: joi.string().required(),
    key: joi.string().allow(''),
    value: joi.string().allow(''),
    country: joi.string().allow(''),
    language: joi.string().allow(''),
    pageIndex: joi.number(),
    pageSize: joi.number()
});