import numpy as np
import matplotlib.pyplot as plt

def tanh(x):
    return np.tanh(x)

def tanh_derivative(x):
    return 1.0 - np.tanh(x)**2

def generate_gold_prices(initial_price, days):
    price_noise = np.random.normal(0, 5, days)
    gold_prices = np.cumsum(price_noise) + initial_price
    return gold_prices

def generate_example_sequence(array, sequence_length):
    examples_X = []
    examples_Y = []

    for i in range(len(array) - sequence_length):
        X = array[i:i + sequence_length]
        Y = array[i + sequence_length]
        examples_X.append(X)
        examples_Y.append(Y)

    return np.array(examples_X), np.array(examples_Y)

class SimpleRNN:
    def __init__(self, input_size, hidden_size, output_size, learning_rate):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = learning_rate

        self.Wxh = np.random.randn(hidden_size, input_size) * 0.01
        self.Whh = np.random.randn(hidden_size, hidden_size) * 0.01
        self.Why = np.random.randn(output_size, hidden_size) * 0.01
        self.bh = np.zeros((hidden_size, 1))
        self.by = np.zeros((output_size, 1))

        self.h_t = np.zeros((hidden_size, 1))

    def forward(self, X):
        X = X.reshape(-1, 1)
        self.h_t = tanh(np.dot(self.Wxh, X) + np.dot(self.Whh, self.h_t) + self.bh)
        self.y_t = np.dot(self.Why, self.h_t) + self.by
        return self.y_t

    def backward(self, X, Y):
        dy = self.y_t - Y
        dWhy = np.dot(dy, self.h_t.T)
        dh = np.dot(self.Why.T, dy) * tanh_derivative(self.h_t)
        dbh = dh
        dWxh = np.dot(dh, X.T)
        dWhh = np.dot(dh, self.h_t.T)

        self.Why -= self.learning_rate * dWhy
        self.bh -= self.learning_rate * dbh
        self.Wxh -= self.learning_rate * dWxh
        self.Whh -= self.learning_rate * dWhh

    def train(self, X_train, Y_train, epochs):
        for epoch in range(epochs):
            total_loss = 0

            for i in range(len(X_train)):
                X = X_train[i].reshape(-1, 1)
                Y = Y_train[i].reshape(-1, 1)

                self.forward(X)

                loss = np.sum((self.y_t - Y)**2)
                total_loss += loss

                self.backward(X, Y)

            if epoch % 100 == 0:
                print(f'Epoka: {epoch}, Strata: {total_loss}')

    def predict(self, X):
        X = X.reshape(-1, 1)
        return self.forward(X).flatten()[0]

# Ustawienia
hidden_size = 10
learning_rate = 0.001
epochs = 1000
sequence_length = 10

# Generowanie danych
gold_prices = generate_gold_prices(1500, 500)
X_train, Y_train = generate_example_sequence(gold_prices, sequence_length)

# Tworzenie i trenowanie modelu
rnn = SimpleRNN(input_size=1, hidden_size=hidden_size, output_size=1, learning_rate=learning_rate)
rnn.train(X_train, Y_train, epochs)

# Interakcja z modelem
print("\nInterakcja z modelem:")
user_input = np.array([1505, 1520, 1510, 1530, 1540, 1550, 1560, 1570, 1580, 1590])  # Wprowadź własną sekwencję
predicted_price = rnn.predict(user_input)
print(f"Przewidziana cena złota na kolejny dzień: {predicted_price}")

# Wykres ceny złota
plt.plot(gold_prices, label='Cena złota')
plt.xlabel('Dzień')
plt.ylabel('Cena')
plt.title('Wykres ceny złota')
plt.legend()
plt.show()
