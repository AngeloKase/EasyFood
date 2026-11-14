
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../../database/prisma");

const JWT_SECRET = process.env.JWT_SECRET;

async function register({ name, email, password }) {
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hash }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return null;
  }

  const senhaConfere = await bcrypt.compare(
    password,
    user.password
  );

  if (!senhaConfere) {
    return null;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email
    },
    JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

async function updateProfileImage(userId, imageUrl) {
  const user = await prisma.user.update({
    where: {
      id: Number(userId)
    },
    data: {
      imageUrl
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true
    }
  });

  return user;
}

async function deleteAccount(userId) {
  return prisma.user.delete({
    where: {
      id: Number(userId)
    }
  });
}

module.exports = {
  register,
  login,
  updateProfileImage,
  deleteAccount
};
