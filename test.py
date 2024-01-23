import numpy as np
import matplotlib.pyplot as plt

# Generowanie danych symulacyjnych
np.random.seed(0)
timesteps = 100
prices = np.cumsum(np.random.normal(0, 5, timesteps))

# Normalizacja danych
prices_normalized = (prices - np.mean(prices)) / np.std(prices)

# Przygotowanie danych wejściowych i wyjściowych dla modelu
X = []
y = []

for i in range(timesteps - 1):
    X.append(prices_normalized[i:i+1])
    y.append(prices_normalized[i+1])

X = np.array(X)
y = np.array(y)

# Parametry modelu
input_size = 1
hidden_size = 100
output_size = 1
learning_rate = 0.001

# Inicjalizacja wag
Wxh = np.random.randn(hidden_size, input_size) * 0.01
Whh = np.random.randn(hidden_size, hidden_size) * 0.01
Why = np.random.randn(output_size, hidden_size) * 0.01
bh = np.zeros((hidden_size, 1))
by = np.zeros((output_size, 1))

# Uczenie modelu
for epoch in range(1000):
    loss = 0
    hprev = np.zeros((hidden_size, 1))

    for i in range(X.shape[0]):
        x, target = X[i].reshape(-1, 1), y[i]

        # Forward pass
        h = np.tanh(np.dot(Wxh, x) + np.dot(Whh, hprev) + bh)
        y_pred = np.dot(Why, h) + by

        # Compute loss
        loss += 0.5 * (y_pred - target)**2

        # Backward pass
        dy = y_pred - target
        dWhy = np.dot(dy, h.T)
        dby = dy
        dh = np.dot(Why.T, dy) + hprev
        dhraw = (1 - h**2) * dh
        dWxh = np.dot(dhraw, x.T)
        dWhh = np.dot(dhraw, hprev.T)
        dbh = dhraw

        # Update weights
        Wxh -= learning_rate * dWxh
        Whh -= learning_rate * dWhh
        Why -= learning_rate * dWhy
        bh -= learning_rate * dbh
        by -= learning_rate * dby

        hprev = h

    if epoch % 100 == 0:
        print(f'Epoch {epoch}, Loss: {loss.item()}')

# Predykcja
predictions = []
h = np.zeros((hidden_size, 1))


for i in range(X.shape[0]):
    x = X[i].reshape(-1, 1)

    h = np.tanh(np.dot(Wxh, x) + np.dot(Whh, h) + bh)
    y_pred = np.dot(Why, h) + by
    predictions.append(y_pred.item())

# Denormalizacja danych
predictions = np.array(predictions) * np.std(prices) + np.mean(prices)

# Wykres wyników
plt.plot(prices)
plt.plot(predictions, label='Predicted Prices')
plt.legend()
plt.show()
