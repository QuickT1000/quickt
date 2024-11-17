import joi from 'joi';

export const ImportTranslationsValidation = joi.object({
    projectName: joi.string().required(),
    data: joi.object().pattern(
        joi.string().required(),
        joi.object().pattern(
            joi.string().required(),
            joi.string().required().allow('')
        ).required()
    ).required()
});