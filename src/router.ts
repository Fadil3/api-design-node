import { Router } from 'express'
import { body, oneOf } from 'express-validator'
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product'

import {
  getUpdates,
  getOneUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from './handlers/update'
import { handleInputError } from './modules/middleware'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)

router.get('/product/:id', getOneProduct)

router.post(
  '/product',
  body('name').exists().isString(),
  handleInputError,
  createProduct
)

router.put(
  '/product/:id',
  body('name').optional().isString(),
  handleInputError,
  updateProduct
)

router.delete('/product/:id', deleteProduct)

/**
 * Update
 */

router.get('/update', getUpdates)

router.get('/update/:id', getOneUpdate)

router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputError,
  createUpdate
)

router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputError,
  updateUpdate
)

router.delete('/update/:id', deleteUpdate)

/**
 * UpdatePoint
 */

router.get('/updatepoint', (req, res) => {})

router.get('/updatepoint/:id', (req, res) => {})

router.post(
  '/updatepoint',
  body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isString(),
  handleInputError,
  (req, res) => {}
)

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputError,
  (req, res) => {}
)

router.delete('/updatepoint/:id', (req, res) => {})

export default router
