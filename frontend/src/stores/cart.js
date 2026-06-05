import { defineStore } from 'pinia'

function loadCartState() {
  if (typeof window === 'undefined') {
    return { items: [], discountPercent: 0 }
  }

  try {
    const saved = window.localStorage.getItem('paintCart')
    if (!saved) return { items: [], discountPercent: 0 }

    const parsed = JSON.parse(saved)
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      discountPercent: Number(parsed.discountPercent || 0)
    }
  } catch {
    return { items: [], discountPercent: 0 }
  }
}

const initialState = loadCartState()

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: initialState.items,
    discountPercent: initialState.discountPercent
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + Number(item.quantity || 0), 0),

    subtotal: (state) => state.items.reduce((total, item) => {
      return total + Number(item.product.price || 0) * Number(item.quantity || 0)
    }, 0),

    total: (state) => {
      const subtotal = state.items.reduce((total, item) => {
        return total + Number(item.product.price || 0) * Number(item.quantity || 0)
      }, 0)

      return subtotal * (1 - Number(state.discountPercent || 0) / 100)
    }
  },

  actions: {
    sync() {
      if (typeof window === 'undefined') return

      window.localStorage.setItem('paintCart', JSON.stringify({
        items: this.items,
        discountPercent: this.discountPercent
      }))
    },

    addItem(product) {
      const existingItem = this.items.find(item => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ product, quantity: 1 })
      }

      this.sync()
    },

    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId)
      this.sync()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product.id === productId)

      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (quantity <= 0) {
        this.removeItem(productId)
      }

      this.sync()
    },

    applyDiscount(percent) {
      this.discountPercent = Number(percent || 0)
      this.sync()
    },

    clearCart() {
      this.items = []
      this.discountPercent = 0
      this.sync()
    }
  }
})
