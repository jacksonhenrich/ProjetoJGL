import bcrypt from 'bcrypt';
import prisma from '../services/prisma.service.js';

const saltRounds = Number(process.env.SALT);


async function read(id) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
}

async function readAll() {
  const users = await prisma.user.findMany();

  return users;
}

async function readByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

async function create(user) {
  const hash = await bcrypt.hash(user.senha, saltRounds);

  user.senha = hash;

  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
}

async function update(user, id) {
  const hash = await bcrypt.hash(user.senha, saltRounds);

  user.senha = hash;

  const newUser = await prisma.user.update({
    data: user,
    where: {
      id,
    },
  });

  return newUser;
}

async function remove(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  read,
  readByEmail,
  create,
  remove,
  update,
  readAll,
};
