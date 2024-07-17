const { sequelize } = require('../../context/index.js');
const { Op, literal, fn, col } = require('sequelize');
const { models } = sequelize
const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')
const jwt = require('jsonwebtoken')
const { config } = require('../../../config/config.js');
const { validarJwt, obtenerUsuarioPorId, verificarPermisosRolId } = require('../utils.js')
const boom = require('@hapi/boom');

const UNA_DIA_EN_MS = 86400000

const usuario = async (_, args, context) => {
  const { id } = args
  const { userId, userRol } = await validarJwt(context)

  if(userRol === 'admin' && !id) {
    throw boom.badRequest('el parametro id es requerido para realizar esta acción como administrador')
  }

  const usuario = await obtenerUsuarioPorId(userRol === 'admin'? id : userId)
  const usuarioInfo = usuario.dataValues

  delete usuarioInfo.password
  delete usuarioInfo.rol
  delete usuarioInfo.googleId
  delete usuarioInfo.terminos

  return usuarioInfo
}

const listaUsuarios = async (_, args, context) => {
  const { userRol } = await validarJwt(context)
  if(userRol !== 'admin') {
    throw boom.forbidden('No tienes permisos para realizar esta acción')
  }
  const usuariosData = await models.Usuario.findAll()
  const usuarios = usuariosData.map(usuario => usuario.dataValues)
  return usuarios
}
const isAuth = async (_, args, context) => {
  const usuario = await validarJwt(context)
  return !!usuario
}
const crearUsuario = async (_, args, context) => {
  const { nombre, apellidos, email, password, terminos } = args

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10)
  try {
    const usuario = await models.Usuario.create({
      id,
      nombre,
      apellidos,
      email,
      password: passwordHash,
      rol: 'user',
      terminos
    })
  
    const payload = {
      userId: usuario.dataValues.id,
      userRol: usuario.dataValues.rol
    }
  
    const SECRET_KEY = config.jwtSecret
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  
    const usuarioInfo = {
      ...usuario.dataValues
    }
    delete usuarioInfo.password
    delete usuarioInfo.rol
    delete usuarioInfo.googleId
    delete usuarioInfo.terminos
  
    const data = {
      usuario: usuarioInfo,
    }
  
    context.res.cookie('auth-token', token, {
      httpOnly: true,
      secure: false,
      maxAge: UNA_DIA_EN_MS,
    })
  
    return data
  } catch (error) {
    const errorType = error.errors?.[0]?.validatorKey
    if(errorType === 'not_unique') {
      throw boom.badRequest('El correo electronico ya está registrado')
    }
  }
  
}
const modificarInfoGeneralUsuario = async (_, args, context) => {
  const { id, ...cambios } = args
  const { userRol, userId } = await validarJwt(context)

  if(userRol === 'admin' && !id) {
    throw boom.badRequest('el parametro id es requerido para realizar esta acción como administrador')
  }

  const userQueryId = userRol === 'admin' ? id : userId
  const usuario = await obtenerUsuarioPorId(userQueryId)

  verificarPermisosRolId(userRol, userId, usuario.dataValues.id)

  const usuarioModificado = await usuario.update(cambios)
  return usuarioModificado.dataValues
}
const login = async (_, args, context) => {
  const { email, password } = args
  const { user } = await context.authenticate('graphql-local', { email, password })
  const payload = {
    userId: user.id,
    userRol: user.rol
  }

  const SECRET_KEY = config.jwtSecret
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  context.res.cookie('auth-token', token, {
    httpOnly: true,
    secure: false,
    maxAge: UNA_DIA_EN_MS,
  })

  return {
    usuario: user
  }
}
const resumenFinanciero = async (_, args, context) => {
  const { userId } = await validarJwt(context)
  const { year, month } = args

  const whereConditions = {
    [Op.and]: [{ usuario: userId }]
  }
  if (year) whereConditions[Op.and].push(literal(`EXTRACT(YEAR FROM "fecha_transaccion") = ${year}`))
  if (month) whereConditions[Op.and].push(literal(`EXTRACT(MONTH FROM "fecha_transaccion") = ${month}`))

  const ingresosData = await models.Transaccion.sum('valor', {
    where: {
      ...whereConditions,
      tipo: 'ingreso'
    }
  })
  const egresosData = await models.Transaccion.sum('valor', {
    where: {
      ...whereConditions,
      tipo: 'egreso'
    }
  })

  const result ={
    ingresos: ingresosData || 0,
    egresos: egresosData || 0,
    balance: (ingresosData || 0) - (egresosData || 0)
  }

  return result
}
const disponibleCuenta = async (_, args, context) => {
  const { userId } = await validarJwt(context)

  const ingresosData = await models.Transaccion.sum('valor', {
    where: {
      tipo: 'ingreso'
    }
  })
  const egresosData = await models.Transaccion.sum('valor', {
    where: {
      tipo: 'egreso'
    }
  })

  const disponible = (ingresosData || 0) - (egresosData || 0)

  return disponible;
}
const activeYears = async (_, args, context) => {
  const { userId } = await validarJwt(context)
  const years = await models.Transaccion.findAll({
    attributes: [
      [literal('DISTINCT EXTRACT(YEAR FROM "fecha_transaccion")'), 'year'],
    ],
    where: {
      usuario: userId
    },
    group: literal('year'),
    order: [[literal('year'), 'DESC']]
  })

  const result = years.map(year => year.dataValues.year)


  return result
}

const resolvers = {
  Query: {
    usuario,
    listaUsuarios,
    isAuth,
    resumenFinanciero,
    disponibleCuenta,
    activeYears,
    prueba: () => "Hola mundo"
  },
  Mutation: {
    crearUsuario,
    modificarInfoGeneralUsuario,
    login
  }
};

module.exports = resolvers;