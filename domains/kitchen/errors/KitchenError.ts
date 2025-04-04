export class KitchenError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public solutionHint: string = "Please contact kitchen staff",
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = "KitchenError";

    // Maintains proper stack trace (only needed for V8/Chrome/Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KitchenError);
    }
  }

  // Optional: Add serialization method for API responses
  toJSON() {
    return {
      error: this.name,
      message: this.message,
      statusCode: this.statusCode,
      solution: this.solutionHint,
      isOperational: this.isOperational,
    };
  }
}

// Optional: Specific error types extending KitchenError
export class IngredientUnavailableError extends KitchenError {
  constructor(ingredient: string) {
    super(
      `${ingredient} is currently unavailable`,
      404,
      `Try substituting ${ingredient} or check back later`
    );
    this.name = "IngredientUnavailableError";
  }
}

export class StorageLockedError extends KitchenError {
  constructor(item: string) {
    super(
      `Storage is locked for ${item}`,
      403,
      `Request special access from head chef`
    );
    this.name = "StorageLockedError";
  }
}
