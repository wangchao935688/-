export const environment = {
  production: true,
  get platform() {
    return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? PlatformType.MOBILE : PlatformType.PC_WEB;
  }
};
export  enum PlatformType{
  PC_WEB = 1, MOBILE = 2
}
