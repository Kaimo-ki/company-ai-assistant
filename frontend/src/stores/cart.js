import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    discountPercent: 0
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) => state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    total: (state) => {
      const st = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      return st * (1 - state.discountPercent / 100)
    }
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (quantity === 0) {
        this.removeItem(productId)
      }
    },
    applyDiscount(percent) {
      this.discountPercent = percent
    },
    clearCart() {
      this.items = []
      this.discountPercent = 0
    }
  }
})
