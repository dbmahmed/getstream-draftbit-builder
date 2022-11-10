// import { useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";
// import { setItem, removeItem, getItem } from "./asyncStore";
// import { USERS, USER_TOKENS } from "../ChatUsers";

// export const useChatClient = () => {
//   const [chatClient, setChatClient] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(false);

//   const loginUser = async (config) => {
//     const client = StreamChat.getInstance(config.apiKey, {
//       timeout: 5000,
//     });

//     const user = {
//       id: config.userId,
//       image: config.userImage,
//       name: config.userName,
//     };

//     // const userToken = ""; //await axios('https')

//     // console.log("from login", user);
//     await client.connectUser(user, config.userToken);
//     setChatClient(client);
//     // console.log("successfully set the client");
//     await setItem("@stream-rn-sampleapp-login-config", config);
//   };

//   const switchUser = async (userId) => {
//     setIsConnecting(true);

//     try {
//       if (userId) {
//         // console.log("from switch", USERS[userId]);
//         await loginUser({
//           apiKey: "yjrt5yxw77ev",
//           userId: USERS[userId].id,
//           userImage: USERS[userId].image,
//           userName: USERS[userId].name,
//           userToken: USER_TOKENS[userId],
//         });
//       } else {
//         const config = await getItem("@stream-rn-sampleapp-login-config", null);

//         if (config) {
//           await loginUser(config);
//         }
//       }
//     } catch (e) {
//       console.warn(e);
//     }
//     setIsConnecting(false);
//   };

//   const logout = async () => {
//     // console.log("loggin out");
//     chatClient?.disconnectUser();
//     await removeItem("@stream-rn-sampleapp-login-config");
//     setChatClient(null);
//     // console.log("Logged out");
//   };

//   useEffect(() => {
//     const run = async () => await switchUser();
//     if (!chatClient) run();
//   }, []);

//   return {
//     chatClient,
//     loginUser,
//     isConnecting,
//     switchUser,
//     logout,
//   };
// };
