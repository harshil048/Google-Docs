import http from "http";
import { Server } from "socket.io";
import jwt, { VerifyErrors } from "jsonwebtoken";
import documentService from "./services/document.service";
import SocketEvent from "./types/enums/socket-events-enum";
import express, { Express, Request, Response } from "express";
import db from "./db/models";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import env from "./config/env.config";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://google-docs-frontend.vercel.app",
    ],
    methods: "*",
  })
);
app.use(router);
app.use(errorHandler);

db.sequelize.sync();

const port = env.PORT || 8080;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

io.on("connection", (socket) => {
  const accessToken = socket.handshake.query.accessToken as string | undefined;
  const documentId = socket.handshake.query.documentId as string | undefined;

  if (!accessToken || !documentId) return socket.disconnect();
  else {
    jwt.verify(
      accessToken,
      "access_token",
      (err: VerifyErrors | null, decoded: unknown) => {
        const { id, email } = decoded as RequestUser;
        (socket as any).username = email;

        documentService
          .findDocumentById(parseInt(documentId), parseInt(id))
          .then(async (document) => {
            if (document === null) return socket.disconnect();

            socket.join(documentId);

            io.in(documentId)
              .fetchSockets()
              .then((clients) => {
                io.sockets.in(documentId).emit(
                  SocketEvent.CURRENT_USERS_UPDATE,
                  clients.map((client) => (client as any).username)
                );
              });

            socket.on(SocketEvent.SEND_CHANGES, (rawDraftContentState) => {
              socket.broadcast
                .to(documentId)
                .emit(SocketEvent.RECEIVE_CHANGES, rawDraftContentState);
            });

            socket.on("disconnect", async () => {
              socket.leave(documentId);
              socket.disconnect();
              io.in(documentId)
                .fetchSockets()
                .then((clients) => {
                  io.sockets.in(documentId).emit(
                    SocketEvent.CURRENT_USERS_UPDATE,
                    clients.map((client) => (client as any).username)
                  );
                });
            });
          })
          .catch((error) => {
            console.log(error);
            return socket.disconnect();
          });
      }
    );
  }
});
