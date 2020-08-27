# bc_challenge_price

### Test Data

- **Query:**
  query calculatePrice($type:String!, $margin: Float!, $exchangeRate: String!) {
    calculatePrice(type: $type, margin: $margin, exchangeRate: $exchangeRate){
      price,
      currency,
      type
    }
  }

- **Query Variables:**
  {
    "type": "sell",
    "margin": 0.2,
    "exchangeRate": "USD"
  }
