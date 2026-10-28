import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import Farm from '../models/Farm.js'
import auth from '../middleware/auth.js'
const router = Router()
router.use(auth)
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })
  next()
}
router.get('/', async (req, res, next) => {
  try { res.json(await Farm.find({ owner: req.user._id }).sort({ createdAt: -1 })) } catch (e) { next(e) }
})
router.post('/',
  body('name').trim().notEmpty().withMessage('Farm name is required.'),
  body('areaAcres').optional().isFloat({ min: 0 }).withMessage('Area must be a positive number.'),
  validate,
  async (req, res, next) => {
    try {
      const farm = await Farm.create({ owner: req.user._id, name: req.body.name, location: req.body.location || '', areaAcres: Number(req.body.areaAcres || 0), crops: req.body.crops || [] })
      res.status(201).json(farm)
    } catch (e) { next(e) }
  }
)
router.patch('/:id', async (req, res, next) => {
  try {
    const allowed = ['name', 'location', 'areaAcres', 'crops']
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)))
    const farm = await Farm.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { $set: updates }, { new: true, runValidators: true })
    if (!farm) return res.status(404).json({ message: 'Farm not found.' })
    res.json(farm)
  } catch (e) { next(e) }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const farm = await Farm.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!farm) return res.status(404).json({ message: 'Farm not found.' })
    res.json({ message: 'Farm deleted.' })
  } catch (e) { next(e) }
})
export default router
