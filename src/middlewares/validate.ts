import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validate =
  (schema: AnySchema, source: "body" | "query" = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });
      req[source] = validated;
      next();
    } catch (err: any) {
      res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    }
  };
