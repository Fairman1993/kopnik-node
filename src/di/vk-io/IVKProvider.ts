import IVk from "@/di/vk-io/IVk";

export default interface IVKProvider {
  (): Promise<IVk>
}
