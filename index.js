const { TelegramClient } =require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");


const API_ID = Number(process.env.API_ID);
const API_HASH = process.env.API_HASH;

SESSION=process.env.ss;

const os = require("os");
const pkg = require("./package.json");
//const { SESSION, API_ID, API_HASH } = require("./../config/telegram-config")

const stringSession = new StringSession('') ;
const client_options = {
    deviceModel: `${pkg.name}@${os.hostname()}`,
    systemVersion: os.version() || "Unknown node",
    appVersion: pkg.version,
    useWSS: false, 
    testServers: false,
    connectionRetries: 5
};
console.info(`[${pkg.name}] Running on ${os.hostname()}`);
async function launch() {
    console.log("Launch")
    const client = new TelegramClient(stringSession, API_ID, API_HASH, client_options)
    await client.start({
        phoneNumber: async () => await input.text("number ?"),
        password: async () => await input.text("password ?"),
        phoneCode: async () => await input.text("code ?"),
        onError: (err) => console.log(err),
    });
  console.log("You should now be connected.");
  console.log(client.session.save());
  await client.sendMessage("me", { message: "Hello!" });
}
launch();
