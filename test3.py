import numpy as np
import matplotlib.pyplot as plt

def generate_gold_prices(initial_price, days):
    price_noise = np.random.normal(0, 5, days)
    gold_prices = np.cumsum(price_noise) + initial_price
    return gold_prices

def generate_example(array):
    random_example_length = np.random.randint(5, 30)
    rand_index = np.random.randint(0, len(array) - random_example_length)
    example = array[rand_index:rand_index + random_example_length]
    
    X = example[:-1]
    Y = example[-1:]
    return X, Y

class RNN:
    def __init__(self, data, hidden_size, learning_rate):
        self.data = data
        self.hidden_size = hidden_size
        self.learning_rate = learning_rate

        self.Wxh = np.random.randn(hidden_size, 1) * 0.01
        self.Whh = np.random.randn(hidden_size, hidden_size) * 0.01
        self.Why = np.random.randn(1, hidden_size) * 0.01
        self.bh = np.zeros((hidden_size, 1))
        self.by = np.zeros((1, 1))

gold_prices = generate_gold_prices(1500, 1500)

plt.plot(gold_prices, label='Cena złota')
plt.xlabel('Dzień')
plt.ylabel('Cena')
plt.title('Wykres ceny złota')
plt.legend()
plt.show()