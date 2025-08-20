interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 900000, maxRequests: number = 5) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.store[identifier];

    // Clean up expired records
    if (record && now > record.resetTime) {
      delete this.store[identifier];
    }

    // If no record exists, create one
    if (!record) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }

    // Check if within rate limit
    if (record.count < this.maxRequests) {
      record.count++;
      return true;
    }

    return false;
  }

  getRemainingTime(identifier: string): number {
    const record = this.store[identifier];
    if (!record) return 0;

    const remaining = record.resetTime - Date.now();
    return Math.max(0, remaining);
  }

  // Clean up old entries (call this periodically)
  cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

// Create a global rate limiter instance
export const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes default
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5") // 5 requests default
);

// Clean up old entries every 5 minutes
if (typeof window === "undefined") {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 5 * 60 * 1000);
}
