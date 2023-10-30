import { app } from "electron";
import serve from "electron-serve";
import Store from "electron-store";
import { createWindow } from "./helpers";

const store = new Store();
const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const backgroundColor = (): string => {
    if (!store.get("theme")) {
      store.set("theme", "dark");
    }
    const dark = "#222";
    const light = "#DDD";

    if (store.get("theme") === "dark") {
      return light;
    }
    return dark;
  };

  const mainWindow = createWindow("main", {
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    title: "Treeline Explorer",
    frame: false,
    backgroundColor: backgroundColor(),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
