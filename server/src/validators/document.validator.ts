import { body } from "express-validator";

class DocumentValidator {
  public update = [
    body("title")
      .optional()
      .isLength({ min: 0, max: 25 })
      .withMessage("Title must between 0-25 characters"),
    // body("content")
    //   .optional()
    //   .custom((value) => {
    //     try {
    //       JSON.parse(value);
    //     } catch (error) {
    //       console.log(error);
    //       throw new Error("Invalid document content");
    //     }
    //   }),
    body("isPublic")
      .optional()
      .isBoolean()
      .withMessage("Must Provide true or false"),
  ];
}

const documentValidator = new DocumentValidator();
export { documentValidator };
