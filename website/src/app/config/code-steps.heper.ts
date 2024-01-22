export const CODE_STEPS = [
  {
    label:
      'Tworzymy klasę DataGenerator, która będzie nam generować dane testowe z pliku tekstowego',
    value: `class DataGenerator:
    def __init__(self, path):
        self.path = path
            
        with open(path) as f:
            data = f.read().lower()
        `,
  },
  { label: 'Printujemy B', value: `print("b")` },
];
