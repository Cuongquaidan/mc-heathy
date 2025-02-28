import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;
const io = new Server({
    /* options */
    cors: {
        origin:["https://mc-heathy.vercel.app/login","http://localhost:3000"]},
});
let onlineUsers = [];
io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id,
            });

        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });
    socket.on("sendMessage", (res) => {
        const { recipientId, ...message } = res;
        const user = onlineUsers.filter(
            (item) => item.userId === recipientId
        )[0];
        console.log(user, recipientId);
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(PORT);
