import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
const router = Router()
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })
  next()
}
const tokenFor = user => jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
router.post('/register',
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 80 }),
  body('email').isEmail().withMessage('Enter a valid email.'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  validate,
  async (req, res, next) => {
    try {
      const email = req.body.email.toLowerCase().trim()
      if (await User.findOne({ email })) return res.status(409).json({ message: 'An account with this email already exists.' })
      const passwordHash = await bcrypt.hash(req.body.password, 12)
      const user = await User.create({ name: req.body.name.trim(), email, passwordHash })
      res.status(201).json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
    } catch (e) { next(e) }
  }
)
router.post('/login',
  body('email').isEmail().withMessage('Enter a valid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
  validate,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase().trim() })
      if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) return res.status(401).json({ message: 'Email or password is incorrect.' })
      res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
    } catch (e) { next(e) }
  }
)
export default router
