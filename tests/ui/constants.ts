export default {
  SAUCE_DEMO_URL: {
    BASE: "https://www.saucedemo.com/",
    INVENTORY: "/inventory.html",
    CART: "/cart.html",
    CHECKOUT_STEP_ONE: "/checkout-step-one.html",
    CHECKOUT_STEP_TWO: "/checkout-step-two.html",
    CHECKOUT_COMPLETE: "/checkout-complete.html"
  },
  MESSAGES:{
    ERROR: {
      LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
      INVALID: 'Epic sadface: Username and password do not match any user in this service',
      MISSING_USERNAME: 'Epic sadface: Username is required',
      MISSING_PASSWORD: 'Epic sadface: Password is required',
    }
  },
  USER: {
    STANDARD: {
      USERNAME: "standard_user",
      PASSWORD: "secret_sauce",
    },
    LOCKED_OUT: {
      USERNAME: "locked_out_user",
      PASSWORD: "secret_sauce",
    },
    PROBLEM: {
      USERNAME: "problem_user",
      PASSWORD: "secret_sauce",
    },
    PERFORMANCE_GLITCH: {
      USERNAME: "performance_glitch_user",
      PASSWORD: "secret_sauce",
    },
  }
};