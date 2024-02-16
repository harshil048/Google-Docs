import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import RoleEnum from "../types/enums/role-enum";
import { User } from "../db/models/user.model";
import { UserRole } from "../db/models/user-role.model";
import { Role } from "../db/models/role.model";
import { error, log } from "console";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    "access_token",
    (err: VerifyErrors | null, decoded: unknown) => {
      if (err) return res.sendStatus(403);
      try {
        const { id, email, roles } = decoded as RequestUser;
        req.user = { id, email, roles };
        next();
      } catch (error) {
        console.log(error);
        return res.sendStatus(403);
      }
    }
  );
};

const authorize = (permittedRoles: Array<RoleEnum>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.sendStatus(401);
    const userId = req.user?.id;

    UserRole.findAll({
      where: {
        userId: { userId },
      },
      include: Role,
    })
      .then((data) => {
        const roles = data.map((userRole) => userRole.role.name);
        if (
          permittedRoles.some((permittedRoles) =>
            roles.includes(permittedRoles)
          )
        ) {
          next();
        } else {
          return res.sendStatus(403);
        }
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(403);
      });
  }
};
export { authenticate, authorize };
