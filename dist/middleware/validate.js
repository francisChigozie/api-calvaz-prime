"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
function isZodSchema(value) {
    return !!value && typeof value.safeParse === 'function';
}
function validateBody(schemas) {
    return (req, res, next) => {
        try {
            if (isZodSchema(schemas)) {
                const result = schemas.safeParse(req.body);
                if (!result.success) {
                    return res.status(400).json({
                        message: 'Validation error',
                        errors: formatZodError(result.error),
                    });
                }
                req.body = result.data;
                return next();
            }
            if (schemas.body) {
                const r = schemas.body.safeParse(req.body);
                if (!r.success) {
                    return res.status(400).json({
                        message: 'Validation error (body)',
                        errors: formatZodError(r.error),
                    });
                }
                req.body = r.data;
            }
            if (schemas.params) {
                const r = schemas.params.safeParse(req.params);
                if (!r.success) {
                    return res.status(400).json({
                        message: 'Validation error (params)',
                        errors: formatZodError(r.error),
                    });
                }
                req.params = r.data;
            }
            if (schemas.query) {
                const r = schemas.query.safeParse(req.query);
                if (!r.success) {
                    return res.status(400).json({
                        message: 'Validation error (query)',
                        errors: formatZodError(r.error),
                    });
                }
                req.query = r.data;
            }
            return next();
        }
        catch (err) {
            return res.status(400).json({
                message: 'Validation error',
                errors: err.message,
            });
        }
    };
}
function formatZodError(error) {
    const flattened = error.flatten();
    return {
        fieldErrors: flattened.fieldErrors,
        formErrors: flattened.formErrors,
    };
}
//# sourceMappingURL=validate.js.map