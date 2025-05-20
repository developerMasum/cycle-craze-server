export const USER_ROLE = {
  admin: "admin",
  user: "user",
} as const;

export interface DashboardData {
  totalShoppingAmount: number;
  totalProductsBought: number;
  totalProductsCancelled: number;
  totalRewardsPoints: number;
}
