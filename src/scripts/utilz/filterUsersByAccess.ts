import User from "@/interfaces/user";

export interface UserWithAccess extends User {
  lastAccessed: string | Date;
}

/**
 * Filters users by time range.
 * @param users - The array of users to filter.
 * @param range - One of 'today', 'week', 'month'.
 * @returns Filtered users within the specified time range.
 */
export default function filterUsersByAccess(
  users: UserWithAccess[],
  range: 'today' | 'week' | 'month'
): UserWithAccess[] {
  const now = new Date();

  // Time ranges in milliseconds
  const timeRanges = {
    today: 24 * 60 * 60 * 1000, // 1 day
    week: 7 * 24 * 60 * 60 * 1000, // 7 days
    month: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  const rangeMs = timeRanges[range];

  return users.filter((user) => {
    if (!user.lastAccessed) return false;

    const userAccessDate = new Date(user.lastAccessed);
    const timeDifference = now.getTime() - userAccessDate.getTime();

    return timeDifference <= rangeMs;
  });
}
