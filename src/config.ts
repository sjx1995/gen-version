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
      feat: "Records what features/interfaces have been added",
    },
    {
      change: "Records changes in features/interfaces",
    },
    {
      fix: "Records what issues have been resolved",
    },
    {
      deprecated:
        "Features/interfaces that are not recommended and will be removed in the future",
    },
    {
      remove:
        "Features/interfaces that were previously not recommended and are now truly removed",
    },
    {
      style: "Records changes in style",
    },
    {
      type: "Records changes in type",
    },
    {
      Others: "Records performance optimizations and security enhancements",
    },
  ],
};
