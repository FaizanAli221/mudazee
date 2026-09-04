import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function refreshExpiryDate(): Date {
  const days = 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function issueTokenPair(user: { id: string; email: string; role: "ADMIN" | "CUSTOMER" }) {
  const refreshRecord = await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: "pending", // placeholder, replaced below once we know the jti
      expiresAt: refreshExpiryDate(),
    },
  });

  const refreshToken = signRefreshToken({ sub: user.id, jti: refreshRecord.id });
  await prisma.refreshToken.update({
    where: { id: refreshRecord.id },
    data: { tokenHash: hashToken(refreshToken) },
  });

  const accessToken = signAccessToken({ sub: user.id, role: user.role, email: user.email });
  return { accessToken, refreshToken };
}

export const authService = {
  async register(input: { email: string; password: string; name: string; phone?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw AppError.conflict("An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
        phone: input.phone,
      },
    });

    const tokens = await issueTokenPair(user);
    return { user: sanitizeUser(user), ...tokens };
  },

  async login(input: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw AppError.unauthorized("Invalid email or password");

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) throw AppError.unauthorized("Invalid email or password");

    const tokens = await issueTokenPair(user);
    return { user: sanitizeUser(user), ...tokens };
  },

  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw AppError.unauthorized("Refresh token is invalid or has expired");
    }

    const record = await prisma.refreshToken.findUnique({ where: { id: payload.jti } });
    if (!record || record.revoked || record.tokenHash !== hashToken(refreshToken)) {
      throw AppError.unauthorized("Refresh token has been revoked");
    }
    if (record.expiresAt < new Date()) {
      throw AppError.unauthorized("Refresh token has expired");
    }

    // Rotate: revoke the old token, issue a new pair
    await prisma.refreshToken.update({ where: { id: record.id }, data: { revoked: true } });

    const user = await prisma.user.findUniqueOrThrow({ where: { id: record.userId } });
    const tokens = await issueTokenPair(user);
    return { user: sanitizeUser(user), ...tokens };
  },

  async logout(refreshToken: string) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      await prisma.refreshToken.updateMany({
        where: { id: payload.jti },
        data: { revoked: true },
      });
    } catch {
      // Already invalid/expired — logout is idempotent either way
    }
  },
};

function sanitizeUser(user: {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: "ADMIN" | "CUSTOMER";
}) {
  return { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role };
}
