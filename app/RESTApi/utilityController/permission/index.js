import db from '../../../database'

const CheckPermission = async (userId) => {
  const userData = await db.users.findByPk(userId)
  if (userData) {
    return userData.permission
  } else {
    return false
  }
}

const IsAdmin = async (userId) => {
  const permission = await CheckPermission(userId)
  return permission === 'admin'
}

const IsPublisher = async (userId) => {
  const permission = await CheckPermission(userId)
  return permission === 'publisher'
}

const IsMember = async (userId) => {
  const permission = await CheckPermission(userId)
  return permission === 'member'
}
export default { IsAdmin, IsPublisher, IsMember }
