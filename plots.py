import matplotlib.pyplot as plt
import numpy as np
from matplotlib import colors
from matplotlib.ticker import PercentFormatter
from collections import Counter
 
plt.style.use('fivethirtyeight')

def generate_histogram(name, data, n_bins, img_path):

    plt.clf()

    # Creating histogram
    fig, axs = plt.subplots(1, 1,
                            figsize =(10, 7),
                            tight_layout = True)
    
    axs.hist(data, bins = n_bins)

    plt.title(f"Distribution of {name} Data")
    plt.xlabel(name)
    plt.ylabel("Number of People")

    plt.savefig(img_path)

def generate_pie_chart(name, data, img_path):

    plt.clf()

    plt.title(f"Percentage of Each {name} in Data")

    num_occurrences = Counter(data)

    plt.pie(num_occurrences.values(), labels = num_occurrences.keys())
    plt.savefig(img_path)

generate_histogram("Test", np.random.randn(10000), 20, "plots/test.png")
generate_pie_chart("Test2", np.random.randint(2, 8, 1000), "plots/test2.png")