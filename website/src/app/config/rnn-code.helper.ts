export const RNN_FULL_CODE = `import numpy as np

def generate_gold_prices(initial_price, days):
    price_noise = np.random.normal(0, 5, days)
    gold_prices = np.cumsum(price_noise) + initial_price
    return gold_prices

def rnn_predict(gold_prices):
  input_size = 1
  hidden_size = 50
  output_size = 1

  learning_rate = 0.001

  # Inicjalizacja wag
  Wxh = np.random.randn(hidden_size, input_size) * 0.01
  Whh = np.random.randn(hidden_size, hidden_size) * 0.01
  Why = np.random.randn(output_size, hidden_size) * 0.01
  bh = np.zeros((hidden_size, 1))
  by = np.zeros((output_size, 1))

  hprev = np.zeros((hidden_size, 1))

  # Trening RNN
  for i in range(len(gold_prices)-1):
    x = np.array([[gold_prices[i]]])
    y = np.array([[gold_prices[i+1]]])

    # Forward pass
    h = np.tanh(np.dot(Wxh, x) + np.dot(Whh, hprev) + bh)
    y_pred = np.dot(Why, h) + by

    # Loss
    loss = 0.5 * np.square(y_pred - y)
    if i % 10 == 0:
        print(f"Iteracja {i}, Strata: {loss[0, 0]}")

    # Backward pass
    dy = y_pred - y
    dWhy = np.dot(dy, h.T)
    dh = np.dot(Why.T, dy) + np.dot(Whh.T, hprev)
    dhraw = (1 - h * h) * dh
    dWxh = np.dot(dhraw, x.T)
    dWhh = np.dot(dhraw, hprev.T)
    dbh = dhraw
    dby = dy

    # Update weights
    Wxh -= learning_rate * dWxh
    Whh -= learning_rate * dWhh
    Why -= learning_rate * dWhy
    bh -= learning_rate * dbh
    by -= learning_rate * dby

    hprev = h

  return Wxh, Whh, Why, bh, by, hprev

# Przykładowe użycie
initial_price = 1500
days = 100
gold_prices = generate_gold_prices(initial_price, days)

Wxh, Whh, Why, bh, by, hprev = rnn_predict(gold_prices)

# Wartości predykcyjne na podstawie ostatniej ceny złota
last_prices = gold_prices[-5:]
last_price = gold_prices[-1]
last_x = np.array([[last_price]])
last_h = np.tanh(np.dot(Wxh, last_x) + np.dot(Whh, hprev) + bh)
predicted_price = np.dot(Why, last_h) + by

print("Ostatnie ceny zlota:", last_prices)
print("Przewidywana nastepna cena zlota:", predicted_price[0, 0])
`;
