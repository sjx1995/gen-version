/*
 * @Description: 默认配置
 * @Author: Sunly
 * @Date: 2023-05-23 09:18:29
 */
export type IConfig = {
  title: string;
  checkVersion: boolean;
  changelogTemplate: Record<string, string>[];
};

export const defaultConfig: IConfig = {
  title: "CHANGELOG",
  checkVersion: true,
  changelogTemplate: [
    {
      Feat: "Records what features/interfaces have been added",
    },
    {
      Change: "Records changes in features/interfaces",
    },
    {
      Fix: "Records what issues have been resolved",
    },
    {
      Deprecated:
        "Features/interfaces that are not recommended and will be removed in the future",
    },
    {
      Remove:
        "Features/interfaces that were previously not recommended and are now truly removed",
    },
    {
      Style: "Records changes in style",
    },
    {
      Type: "Records changes in type",
    },
    {
      Other: "Records performance optimizations and security enhancements",
    },
  ],
};
