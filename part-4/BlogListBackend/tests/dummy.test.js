import { test } from 'node:test'
import assert from 'node:assert'

import { dummy } from '../utils/list_helper.js'

test('dummy returns 1', () => {
  const blogs = []

  assert.strictEqual(dummy(blogs), 1)
})
