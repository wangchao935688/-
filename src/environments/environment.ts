// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  get platform() {
    return navigator.userAgent.match(/(iPhone|iPad|iPod|Android|ios)/i) ? PlatformType.MOBILE : PlatformType.PC_WEB;
  },
  get browserType() {
    let userAgent = navigator.userAgent;

    return navigator.userAgent.match(/(iPhone|iPad|iPod|Android|ios)/i) ? PlatformType.MOBILE : PlatformType.PC_WEB;

  }
};

export  enum PlatformType {
  PC_WEB = 1, MOBILE = 2
}

export  enum BrowserType {
  IE = 1, CHROME = 2, FF = 3, SAFARI = 4, _360 = 5
}

