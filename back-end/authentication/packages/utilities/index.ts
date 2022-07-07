import { RequestValidationError } from "@eklavguild/common";
import { validationResult } from "express-validator";
import { Request } from 'express';

const checkExpressRequestObjectForErrors = (request: Request) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log("failed validation", errors.array());
      throw new RequestValidationError(errors.array());
    }
  } catch (e) {
    if (e instanceof RequestValidationError) {
      throw e;
    }
    console.log("Error in checkRequestObjectForErrors", e);
    throw e;
  }
};

export { checkExpressRequestObjectForErrors };
